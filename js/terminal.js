import _ from 'lodash'
import union from 'lodash/union'

const terminal = gitState => {
  window.gitState = gitState
  $('#command-input').focus()
  $('.terminal').click(() => {
    $('#command-input').focus()
  })
  $('#command-input').keyup( e => {
    if(e.which === 13){
      gitState.terminalCount = 0
      $(e.target).addClass('hidden')
      gitState.currentCommand = e.target.value.trim()
      if(gitState.currentCommand !== ''){
        gitState.previousCommands.unshift(gitState.currentCommand)
      }
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
    } else if (e.which === 38){
      if(gitState.previousCommands.length){
        e.target.value = gitState.previousCommands[gitState.terminalCount]
        if(gitState.terminalCount < gitState.previousCommands.length - 1){
          gitState.terminalCount++
        }
      }
    } else if (e.which === 40){
      if(gitState.previousCommands.length){
        e.target.value = gitState.previousCommands[gitState.terminalCount]
        if(gitState.terminalCount > 0){
          gitState.terminalCount--
        }
      }
    }
  })
}

import { nextStep, prevStep } from './level_selection'


const executeCommand = gitState => {

  const command = gitState.currentCommand
  if (command.slice(0,3) === 'git'){
    $('#terminal-command-list').append(`<div>${gitCommand(gitState)}</div>`)
  } else if (command === 'clear') {
    $('#terminal-command-list').empty()
  } else if( command.slice(0,2) === 'rm'){
    $('#terminal-command-list').append(`<div>${rmCommand(gitState)}</div>`)
  } else if ( command === 'next') {
    nextStep(gitState)
  } else if ( command === 'prev') {
    prevStep(gitState)
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
      if(gitState.level === 1.1){
        gitState.level = 2
      }
      gitState.initialized = true
      gitState.fileStructure[".git"] = {
        'status': 'ignored',
        'details': 'folder'
      }


      return 'Initializing local repository'

    } else {
      return "<div class='invalid'>git not initialized yet</div>"
    }
  } else {
    if ( command.slice(4,8) === 'init'){
      return "<div class='invalid'>git already initialized</div>"
    } else if( command.slice(4,7) === 'add') {
      if (command.slice(8) === '-A') {
        if(gitState.level === 3 || gitState.level === 3.1){
          return "<div class='invalid'>Getting a little ahead of ourselves are we? Add just one file for now</div>"
        }
        if (gitState.level === 3.2){
          gitState.level = 4
        }
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
        if(gitState.level === 6.1){
          gitState.level = 7
        }
        if(gitState.commitHistory[0]){
          stageFiles(gitState, Object.keys(gitState.commitHistory[0].fileStructure))
          return commitFiles(gitState, command.slice(14))
        } else {
          return "<div class='invalid'>no files to commit</div>"
        }
      } else {
        return 'dont forget the -m, you don\'t want to open a text editor to write a simple commit'
      }
    } else if (command.slice(4,10) === 'remote') {
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
    } else if (command.slice(4,10) === 'config') {
      if(command.slice(11,29) === '--global user.name' || command.slice(11,20) === 'user.name'){
        gitState.username = command.split(' ')[2] === '--global' ?
          command.split(' ').slice(4).join(' ') : command.split(' ').slice(3).join(' ').slice(1,-1)
        if(gitState.level === 2){
          gitState.level++
        }

        return `<div>Username changed to ${gitState.username}</div>`
      } else {
        return `<div class='invalid'>${command} is not valid</div>`
      }
    } else if (command === 'git log') {
      if(gitState.level === 5){
        gitState.level = 5.1
      }
      return `${logHistory(gitState)}`
    } else if (command.slice(4,8) === 'diff') {
      if(gitState.level === 6){
        gitState.level = 6.1
      }
      return gitDiff(gitState, command.slice(9))
    } else if (command.slice(4,12) === 'checkout') {
      return gitCheckout(gitState, command.slice(13))
    } else {
      return `<div class='invalid'>${command} is not valid</div>`
    }
  }
}

const logHistory = gitState => {
  if(gitState.commitHistory.length){
    let commits = ''
    gitState.commitHistory.forEach((commit, index) => {
      commits+=`<div class='commit-head'>commit: ${commit.id} ${index === 0 ? "<span class='commit-head'>HEAD -> master</span>":""}</div>`
      commits+=`<div>Author: ${commit.username}</div>`
      commits+=`<div>Date: ${commit.timeStamp}</div>`
      commits+=`<div class='commit-message'>${commit.message}</div>`
      commits+=`<br />`
    })
    return commits
  } else {
    return "<div class='invalid'>No git history</div>"
  }
}

const gitCheckout = (gitState, command) => {
  if(Object.keys(gitState.fileStructure).includes(command.split(' ')[0])){
    let result = ''
    command.split(' ').forEach(file => {
      if(gitState.commitHistory[0].fileStructure[file]){
        if(file === 'cat' && gitState.level === 7){
          gitState.level = 7.1
        }
        gitState.fileStructure[file] = Object.assign({}, gitState.commitHistory[0].fileStructure[file])

      } else {
        result += `<div class='invalid'>${file} is not being tracked</div>`
      }
    })
    return result
  }
}

const gitDiff = (gitState, command) => {
  let result = ''
  let files = []
  if(command === ''){
    files = _.union(Object.keys(gitState.commitHistory[0].fileStructure), Object.keys(gitState.fileStructure))
  } else {
    files = command.split(' ')
  }
  files.forEach( file => {
    if(gitState.fileStructure[file] && !gitState.commitHistory[0].fileStructure[file]){
      if(gitState.fileStructure[file].status !=='ignored'){
        result +=  `<div class='valid'>+++ ${file}: details: ${gitState.fileStructure[file].details}</div><div class='invalid'></div>`
      }
    } else if (!gitState.fileStructure[file] && gitState.commitHistory[0].fileStructure[file]){
      result +=  `<div class='valid'></div><div class='invalid'>--- ${file}: details: ${gitState.commitHistory[0].fileStructure[file].details}</div>`
    } else if (gitState.fileStructure[file] && gitState.commitHistory[0].fileStructure[file]) {
      if(gitState.fileStructure[file].details !== gitState.commitHistory[0].fileStructure[file].details){
        result +=  `<div class='valid'>+++ ${file}: details: ${gitState.fileStructure[file].details}</div><div class='invalid'>--- ${file}: details: ${gitState.commitHistory[0].fileStructure[file].details}</div>`
      }
    } else {
      result += `<div class='invalid'>${file} does not exist</div>`
    }
  })
  return result
}

const stageFiles = (gitState, files) => {
  const missing = []
  files.forEach(file => {
    if(gitState.fileStructure[file]){
      if(gitState.fileStructure[file].status === 'new' || gitState.fileStructure[file].status === 'editted'){
        gitState.fileStructure[file].status='staged'
      }
    } else {
      missing.push(file)
    }
    if(gitState.commitHistory.length){
      Object.keys(gitState.commitHistory[0].fileStructure).forEach( file => {
        if(gitState.commitHistory[0].fileStructure[file].status === 'deleted'){
          delete gitState.commitHistory[0].fileStructure[file].status
        } else {
          if(!gitState.fileStructure[file]){
            gitState.fileStructure[file] = {
              status: 'deleted'
            }
          }
        }
      })
    }
  })
  const staged = Object.keys(gitState.fileStructure).filter(file => gitState.fileStructure[file].status === 'staged' )
  if(files[0] === 'bear' && files.length === 1 && gitState.level === 3 ){
    gitState.level = 3.1
  }
  if(files[0] === 'gorilla' && files.length === 1 && gitState.level === 3.1 ){
    gitState.level = 3.2
  }
  if(staged.length){
    if(missing.length){
      return 'Some files were not staged'
    } else {
      return 'All files staged'
    }
  } else {
    return 'No files to stage'
  }
}

const commitFiles = (gitState, message) => {
  if(message.slice(1,-1) === ''){
    return "<div class='invalid'>No message was written</div>"
  } else {
    const commit = {
      fileStructure: {},
      message: ''
    }

    Object.keys(gitState.fileStructure).forEach(file => {
      if(gitState.fileStructure[file].status === 'staged' || gitState.fileStructure[file].status === 'committed'){
        commit.fileStructure[file]= gitState.fileStructure[file]
        gitState.fileStructure[file].status = 'committed'
      }

      if(gitState.fileStructure[file] === 'deleted'){
        commit.fileStructure[file].status = 'deleted'
        delete gitState.fileStructure[file]
      }
    })
    if(Object.keys(commit.fileStructure).length){
      commit.message = message
      commit.timeStamp = new Date()
      commit.id = Math.floor(Math.random() * 1000000)
      commit.username = gitState.username
      gitState.commitHistory.unshift(Object.assign({}, commit))
      console.log(gitState.level);
      if(gitState.level === 4.1){
        gitState.level = 5
      }
      return 'files committed'
    } else {
      return "<div class='invalid'>nothing to commit</div>"
    }
  }
}

export default terminal
