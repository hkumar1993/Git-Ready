const render = gitState => {
  ['directory','stage','local', 'remote'].forEach(point => {
    $(`.${point} > ul`).remove()
    $(`.${point}`).append('<ul></ul>')
  })

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

  Object.keys(gitState.fileStructure).forEach(file => {
    switch (gitState.fileStructure[file]) {
      case 'remote':
        $('.remote > ul').append(`<li class='committed'>${file}</li>`)
        $('.local > ul').append(`<li class='committed'>${file}</li>`)
        $('.directory > ul').append(`<li class='committed'>${file}</li>`)
        break;

      case 'committed':
        $('.local > ul').append(`<li class='committed'>${file}</li>`)
        $('.directory > ul').append(`<li class='committed'>${file}</li>`)
        break;

      case 'staged':
        $('.stage > ul').append(`<li class='staged'>${file}</li>`)
        $('.directory > ul').append(`<li class='staged'>${file}</li>`)
        break;

      case 'new':
        $('.directory > ul').append(`<li class='new'>${file}</li>`)
        break;

      case 'ignored':
        $('.directory > ul').append(`<li class='committed'>${file}</li>`)
        break;

      case 'edit':
        $('.directory > ul').append(`<li class='edit'>${file}</li>`)
        break;
    }
  })
}

export default render
