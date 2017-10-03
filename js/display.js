import { levelStructure } from './level_selection'

const render = gitState => {
  console.log('INSIDE RENDER');
  ['directory','stage','local', 'remote'].forEach(point => {
    $(`.${point} > ul`).remove()
    $(`.${point}`).append('<ul></ul>')
  })

  if(gitState.level !== gitState.previousLevel){
    gitState.previousLevel = gitState.level
    gitState.fileStructure = levelStructure(gitState)
  }

  $('#level-selector').val(gitState.level)

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

  Object.keys(gitState.commitHistory[0].fileStructure).forEach(file => {
    switch (gitState.commitHistory[0].fileStructure[file]) {
      case 'committed':
        $('.local > ul').append(`<li class='committed'>
        <img src='./img/${file}.png'/>
        </li>`)
        break;
    }
  })

  Object.keys(gitState.fileStructure).forEach(file => {
    console.log(file);
    switch (gitState.fileStructure[file]) {
      case 'remote':
        $('.remote > ul').append(`<li class='committed'><img src='./img/${file}.png'/></li>`)
        $('.local > ul').append(`<li class='committed'><img src='./img/${file}.png'/></li>`)
        $('.directory > ul').append(`<li class='committed'><img src='./img/${file}.png'/></li>`)
        break;

      case 'committed':
        $('.directory > ul').append(`<li class='committed'><img src='./img/${file}.png'/></li>`)
        break;

      case 'staged':
        $('.stage > ul').append(`<li class='staged'><img src='./img/${file}.png'/></li>`)
        $('.directory > ul').append(`<li class='staged'><img src='./img/${file}.png'/></li>`)
        break;

      case 'new':
        $('.directory > ul').append(`<li class='new'><img src='./img/${file}.png'/></li>`)
        break;

      case 'ignored':
        if(file.slice(0,1) === '.'){
          $('.directory > ul').append(`<li class='committed'><img src='./img/folder.png'/><p>${file}</p></li>`)

        } else {
          $('.directory > ul').append(`<li class='committed'><img src='./img/${file}.png'/></li>`)
        }
        break;

      case 'editted':
        $('.directory > ul').append(`<li class='edit'><img src='./img/${file}.png'/></li>`)
        break;
    }
  })
}

export default render
