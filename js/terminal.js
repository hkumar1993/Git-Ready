const terminal = gitState => {
  $('#command-input').focus()
  $('.terminal').click(() => {
    $('#command-input').focus()
  })
  $('#command-input').keyup( e => {
    if(e.which === 13){
      $(e.target).addClass('hidden')
      console.log(gitState);
      if(gitState.currentCommand !== ''){
        gitState.previousCommands.push(gitState.currentCommand)
      }
      gitState.currentCommand = e.target.value.trim()
      console.log(gitState);
      $('#terminal-command-list').append(`<li>${gitState.currentCommand}</li>`)
      if(gitState.currentCommand !== ''){
        executeCommand(gitState)
        console.log(gitState);
      }
      $('#terminal-command-list').
      animate({scrollTop: $('#terminal-command-list').
      prop('scrollHeight')}, 50)
      e.target.value = ''
      $(e.target).removeClass('hidden')
      $('#command-input').focus()
    }

  })
}

const executeCommand = gitState => {
  const command = gitState.currentCommand
  if (command.slice(0,3) === 'git' || command === 'rm -rf .git'){
    $('#terminal-command-list').append(`<div>${gitCommand(gitState)}</div>`)
  } else if (command === 'clear') {
    $('#terminal-command-list').empty()
  } else {
    $('#terminal-command-list').append(`<div class='invalid'>${command} is not a valid function </div>`)
  }
}

const gitCommand = gitState => {
  const command = gitState.currentCommand
  if ( command === 'git init'){
    gitState.initialized = true
    $('.directory').removeClass('full')
    $('.stage, .repo').removeClass('hidden')
    return 'Initializing local repository'
  } else if(command === 'rm -rf .git'){
    gitState.initialized = false
    $('.directory').addClass('full')
    $('.stage, .repo').addClass('hidden')
    return 'Deleting directory: .git'
  } else if (command.slice(0,10) === 'git remote') {
    if(gitState.initialized){
      if (command.slice(11, 14) === 'add'){
        $('.local').removeClass('full')
        $('.remote').removeClass('hidden')
        return 'Remote Repository added'
      } else if (command.slice(11, 17) === 'remove') {
        $('.local').addClass('full')
        $('.remote').addClass('hidden')
        return 'Removed remote repository'
      } else {
        return "<div class='invalid'>Invalid command</div>"
      }
    } else {
      return "<div class='invalid'>git not initialized</div>"
    }
  } else {
    return `${command} is a valid command`
  }
}

export default terminal
