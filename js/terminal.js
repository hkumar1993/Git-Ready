const terminal = gitState => {
  window.gitState = gitState
  $('#command-input').focus()
  $('.terminal').click(() => {
    $('#command-input').focus()
  })
  $('#command-input').keyup( e => {
    if(e.which === 13){
      $(e.target).addClass('hidden')
      if(gitState.currentCommand !== ''){
        gitState.previousCommands.push(gitState.currentCommand)
      }
      gitState.currentCommand = e.target.value.trim()
      $('#terminal-command-list').append(`<li>${gitState.currentCommand}</li>`)
      if(gitState.currentCommand !== ''){
        executeCommand(gitState)
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
  if (command.slice(0,3) === 'git'){
    $('#terminal-command-list').append(`<div>${gitCommand(gitState)}</div>`)
  } else if (command === 'clear') {
    $('#terminal-command-list').empty()
  } else if( command.slice(0,2) === 'rm'){
    $('#terminal-command-list').append(`<div>${rmCommand(gitState)}</div>`)
  } else {
    $('#terminal-command-list').
      append(`<div class='invalid'>${command} is not a valid function </div>`)
  }
  gitState.render(gitState)
}

const rmCommand = gitState => {
  const command = gitState.currentCommand
  if(command.slice(3,11) === '-rf .git'){
    if(gitState.initialized){
      gitState.initialized = false
      gitState.level = 0
      delete gitState.fileStructure[".git"]
      return 'Deleted directory: .git'
    }
  } else if (command.slice(3) === '') {
    return 'nothing specified to delete'
  } else {
    delete gitState.fileStructure[command.slice(3)]
    return 'deleted file'
  }
}

const gitCommand = gitState => {
  const command = gitState.currentCommand

  if(!gitState.initialized){
    if ( command.slice(4,8) === 'init'){
      if(gitState.level === 0){
        gitState.level++
      }
      gitState.initialized = true
      gitState.fileStructure[".git"] = 'ignored'
      return 'Initializing local repository'

    } else {
      return "<div class='invalid'>git not initialized yet</div>"
    }
  } else {
    if ( command.slice(4,8) === 'init'){
      return "<div class='invalid'>git already initialized</div>"
    } else if( command.slice(4,7) === 'add') {
      if (command.slice(8) === '-A') {
        return stageFiles(gitState, Object.keys(gitState.fileStructure))
      } else if (command.slice(8) === '') {
        return "<div class='invalid'>did not select any files to add</div>"
      } else {
        return stageFiles(gitState, command.slice(8).split(' '))
      }
    } else if (command.slice(4,10) === 'commit'){
      if( command.slice(11,13) === '-m'){
        return commitFiles(gitState, command.slice(14))
      } else if ( command.slice(11,14) === '-am' || command.slice(11,16) === '-a -m'){
        if(gitState.commitHistory[0]){
          stageFiles(gitState, Object.keys(gitState.commitHistory[0].fileStructure))
          return commitFiles(gitState, command.slice(14))
        } else {
          return "<div class='invalid'>no files to commit</div>"
        }
      } else {
        return 'dont forget the -m, you don\'t want to open a text editor to write a simple commit'
      }
    } else if (command.slice(0,10) === 'git remote') {
      if(gitState.initialized){
        if (command.slice(11, 14) === 'add'){
          gitState.remote = true
          return 'Remote Repository added'
        } else if (command.slice(11, 17) === 'remove') {
          gitState.remote = false
          return 'Removed remote repository'
        } else {
          return "<div class='invalid'>Invalid command</div>"
        }
      } else {
        return "<div class='invalid'>git not initialized</div>"
      }
    } else {
      return `<div class='invalid'>${command} is not valid</div>`
    }
  }
}

const stageFiles = (gitState, keys) => {
  const missing = []
  keys.forEach(key => {
    if(gitState.fileStructure[key]){
      if(gitState.fileStructure[key] === 'new' || gitState.fileStructure[key] === 'editted'){
        gitState.fileStructure[key]='staged'
      }
    } else {
      missing.push(key)
    }
    Object.keys(gitState.commitHistory[0].fileStructure).forEach( key => {
      if(gitState.commitHistory[0].fileStructure[key] === 'deleted'){
        delete gitState.commitHistory[0].fileStructure[key]
      } else {
        if(!gitState.fileStructure[key]){
          gitState.fileStructure[key] = 'deleted'
        }
      }
    })
  })
  if(missing.length){
    return 'Some files were not staged'
  } else {
    return 'All files staged'
  }
}

const commitFiles = (gitState, message) => {
  if(message === ''){
    return "<div class='invalid'>No message was writtenr</div>"
  } else {
    const commit = {
      fileStructure: {},
      message: ''
    }

    Object.keys(gitState.fileStructure).forEach(file => {
      if(gitState.fileStructure[file] === 'staged' || gitState.fileStructure[file] === 'committed'){
        commit.fileStructure[file] = 'committed'
        gitState.fileStructure[file] = 'committed'
      }

      if(gitState.fileStructure[file] === 'deleted'){
        commit.fileStructure[file] = 'deleted'
        delete gitState.fileStructure[file]
      }
    })
    if(Object.keys(commit.fileStructure).length){
      commit.message = message
      gitState.commitHistory.unshift(Object.assign({}, commit))
      return 'files committed'
    } else {
      return "<div class='invalid'>nothing to commit</div>"
    }
  }
}

export default terminal
