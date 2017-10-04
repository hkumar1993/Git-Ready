import { levelStructure } from './level_selection'

const render = gitState => {
  ['directory','stage','local', 'remote'].forEach(point => {
    $(`.${point} > ul`).remove()
    $(`.${point}`).append('<ul></ul>')
  })

  if(gitState.level !== gitState.previousLevel){
    gitState.previousLevel = gitState.level
    levelStructure(gitState)
  }
  $('#instructions').empty()
  $('#step').empty()
  $('#step').append(`${gitState.step}`)
  $('#instructions').append(`${gitState.instructions}`)

  if(gitState.username!==''){
    $('.directory > h6').empty()
    $('.directory > h6').append(`${gitState.username}'s Local Directory`)
  }

  if(gitState.initialized){
    $('.directory').removeClass('full')
    $('.stage, .repo').removeClass('hidden')
  } else {
    $('.directory').addClass('full')
    $('.stage, .repo').addClass('hidden')
  }

  if(gitState.remote){
    $('.local').removeClass('full')
    $('.remote').removeClass('hidden')
  } else {
    $('.local').addClass('full')
    $('.remote').addClass('hidden')
  }
  if(gitState.commitHistory.length){
    Object.keys(gitState.commitHistory[0].fileStructure).forEach(file => {
      switch (gitState.commitHistory[0].fileStructure[file].status) {
        case 'committed':
        $('.local > ul').append(`<li class='committed'>
        <img src='./img/${gitState.fileStructure[file].details}.png'/>
        </li>`)
        break;
      }
    })
  }

  Object.keys(gitState.fileStructure).forEach(file => {
    switch (gitState.fileStructure[file].status) {
      case 'remote':
        $('.remote > ul').append(`<li class='committed'><img src='./img/${gitState.fileStructure[file].details}.png'/></li>`)
        $('.local > ul').append(`<li class='committed'><img src='./img/${gitState.fileStructure[file].details}.png'/></li>`)
        $('.directory > ul').append(`<li class='committed'><img src='./img/${gitState.fileStructure[file].details}.png'/></li>`)
        break;

      case 'committed':
        $('.directory > ul').append(`<li class='committed'><img src='./img/${gitState.fileStructure[file].details}.png'/></li>`)
        break;

      case 'staged':
        $('.stage > ul').append(`<li class='staged'><img src='./img/${gitState.fileStructure[file].details}.png'/></li>`)
        $('.directory > ul').append(`<li class='staged'><img src='./img/${gitState.fileStructure[file].details}.png'/></li>`)
        break;

      case 'new':
        $('.directory > ul').append(`<li class='new'><img src='./img/${gitState.fileStructure[file].details}.png'/></li>`)
        break;

      case 'ignored':
        if(gitState.fileStructure[file].details === 'folder'){
          $('.directory > ul').append(`<li class='committed'><img src='./img/folder.png'/><p>${file}</p></li>`)

        } else {
          $('.directory > ul').append(`<li class='committed'><img src='./img/${gitState.fileStructure[file].details}.png'/></li>`)
        }
        break;

      case 'editted':
        $('.directory > ul').append(`<li class='editted'><img src='./img/${gitState.fileStructure[file].details}.png'/></li>`)
        break;
    }
  })
}

export default render
