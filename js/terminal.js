import _ from 'lodash'
import union from 'lodash/union'


export default function terminal(gitState) {
  const terminal = document.querySelector('.terminal')
  const commandInput = document.querySelector('#command-input')
  focusOnInput(terminal, commandInput)
  listenToCommands(commandInput, gitState)
}

// Adds event listeners to terminal element to focus on terminal input
function focusOnInput(terminal, commandInput) {
  commandInput.focus()
  terminal.addEventListener('click', function () {
    commandInput.focus();
  });
}

// Responds to entries in terminal input
function listenToCommands(commandInput, gitState) {
  commandInput.addEventListener('keyup', function (e) {
    const keyPress = e.which
    const targetElement = e.target
    if (keyPress === 13) {
      executeCommand(targetElement, gitState)
    } else if (keyPress === 38) {

    } else if (keyPress === 40) {

    }
  })
}

// Executes command from terminal input
function executeCommand(targetElement, gitState){
  const command = targetElement.value.trim()
  gitState.currentCommand = command
  targetElement.value = ''
  writeToTerminal(command)
  const terminalFunction = findCommand(terminalResult, command, gitState)
  terminalFunction()
  window.terminalFunction = terminalFunction
  console.log(terminalFunction)
}

// Writes string to terminal
export function writeToTerminal(command, classNames, elementType = 'li') {
  const termCmdList = document.querySelector('#terminal-command-list');
  const listElement = document.createElement(elementType)
  if(!!classNames){
    listElement.classList.add(classNames.split(' '))
  }
  listElement.innerText = command
  termCmdList.appendChild(listElement)
  termCmdList.scrollTop += listElement.scrollHeight
}

// Finds command in commandslist object
function findCommand(term, command, gitState) {
  command = command.split(' ')
  let currentCommand = {}
  while (typeof currentCommand !== 'function') {
    currentCommand = term[command.shift()]
    if (!currentCommand) {
      currentCommand = terminalResult['invalid'];
      break;
    }
    if (typeof currentCommand !== 'function') {
      term = currentCommand
    }
  }
  return prepareFunction(currentCommand, gitState, command)
}

// Returns function that will automatically execute the function
function prepareFunction(terminalFunction, gitState, remainingArguments){
  return function(){
    terminalFunction(gitState, ...remainingArguments)
  }
}

function invalidCommand(gitState){
  const currentCommand = gitState.currentCommand
  writeToTerminal(`-bash: ${currentCommand}: command not found`, 'invalid', 'div')
}
  // $('#command-input').keyup( e => {
  //   if(e.which === 13){
  //     gitState.terminalCount = 0
  //     $(e.target).addClass('hidden')
  //     gitState.currentCommand = e.target.value.trim()
  //     if(gitState.currentCommand !== ''){
  //       gitState.previousCommands.unshift(gitState.currentCommand)
  //     }
  //     $('#terminal-command-list').append(`<li>${gitState.currentCommand}</li>`)
  //     if(gitState.currentCommand !== ''){
  //       executeCommand(gitState)
  //     }
  //     $('#terminal-command-list').
  //     animate({scrollTop: $('#terminal-command-list').
  //     prop('scrollHeight')}, 50)
  //     e.target.value = ''
  //     $(e.target).removeClass('hidden')
  //     $('#command-input').focus()
  //   } else 
  //   if (e.which === 38){
  //     if(gitState.previousCommands.length){
  //       e.target.value = gitState.previousCommands[gitState.terminalCount]
  //       if(gitState.terminalCount < gitState.previousCommands.length - 1){
  //         gitState.terminalCount++
  //       }
  //     }
  //   } else if (e.which === 40){
  //     if(gitState.previousCommands.length){
  //       e.target.value = gitState.previousCommands[gitState.terminalCount]
  //       if(gitState.terminalCount > 0){
  //         gitState.terminalCount--
  //       }
  //     }
  //   }
  // })



import { nextStep, prevStep } from './level_selection'


const executeCommand2 = gitState => {

  const command = gitState.currentCommand

  if (command.slice(0,3) === 'git'){
    $('#terminal-command-list').append(`<div>${gitCommand(gitState)}</div>`)
  } else if (command === 'clear') {
    $('#terminal-command-list').empty()
  } else if( command.slice(0,2) === 'rm'){
    if(command === 'rm -rf .git'){
      gitState.level = 0
    }
    $('#terminal-command-list').append(`<div>${rmCommand(gitState, command)}</div>`)
  } else if ( command === 'next') {
    nextStep(gitState)
  } else if ( command === 'prev') {
    prevStep(gitState)
  } else if ( command === 'about'){
    $('#terminal-command-list').empty().
      append(`<div class='valid'>Harsh Kumar - Software Engineer - San Francisco</div>`).
      append(`<div class='valid'>Portfolio - <a target="_blank'" href='http://www.hkumar.me'>hkumar.me</a></div>`).
      append(`<div class='valid'>LinkedIn - <a target="_blank'" href='https://linkedin.com/in/hkumar1993'>@hkumar1993</a></div>`).
      append(`<div class='valid'>Github - <a target="_blank'" href='https://github.com/hkumar1993'>@hkumar1993</a></div>`)

  } else {
    $('#terminal-command-list').
      append(`<div class='invalid'>${command} is not a valid function </div>`)
  }
  gitState.render(gitState)
}

const rmCommand = (gitState, command) => {

  if(command.slice(3,11) === '-rf .git'){
    if(gitState.initialized){
      gitState.initialized = false

      delete gitState.fileStructure[".git"]
      return 'Deleted directory: .git'
    }
  } else if (command.slice(3) === '') {
    return 'nothing specified to delete'
  } else {
    const structure = gitState.branch.status && gitState.branch.checkout ? gitState.branch : gitState
    delete structure.fileStructure[command.slice(3)]
    return 'deleted file'
  }
}

const gitCommand = gitState => {
  const command = gitState.currentCommand
  const structure = gitState.branch.status && gitState.branch.checkout ? gitState.branch : gitState
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
        return stageFiles(structure, Object.keys(structure.fileStructure))
      } else if (command.slice(8) === '') {
        return "<div class='invalid'>did not select any files to add</div>"
      } else {
        if(command.slice(8,12) === 'bear' && gitState.level === 3 ){
          gitState.level = 3.1
        }
        if(command.slice(8,15) === 'gorilla' && gitState.level === 3.1 ){
          gitState.level = 3.2
        }
        return stageFiles(structure, command.slice(8).split(' '))
      }
    } else if (command.slice(4,10) === 'commit'){
      if( command.slice(11,13) === '-m'){
        if(gitState.level === 4.1){
          gitState.level = 5
        }
        return commitFiles(structure, command.slice(14))
      } else if ( command.slice(11,14) === '-am' || command.slice(11,16) === '-a -m'){
        if(gitState.commitHistory[0]){
          stageFiles(structure, Object.keys(structure.commitHistory[0].fileStructure))
          if (gitState.level === 6.1){
            gitState.level = 7
          }
          return commitFiles(structure, command.slice(14))
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
      if(gitState.level === 8.4){
        gitState.level = 8.5
      }
      return `${logHistory(structure)}`
    } else if (command.slice(4,8) === 'diff') {
      if(gitState.level === 6){
        gitState.level = 6.1
      }
      return gitDiff(structure, command.slice(9))
    } else if (command.slice(4,12) === 'checkout') {
      if(command.slice(13,16) === 'cat' && gitState.level === 7){
        gitState.level = 8
      }
      if(command.slice(13,17) === 'wild' && gitState.level === 8.2){
        gitState.level = 8.3
      }
      return gitCheckout(structure, command.slice(13))
    } else if (command.slice(4,10) === 'branch') {
      if(command.slice(11) === 'wild' && gitState.level === 8){
        gitState.level = 8.1
      }
      if(command.slice(11) === '' && gitState.level === 8.1){
        gitState.level = 8.2
      }
      if(command.slice(11) === '-d wild' && gitState.level === 8.6){
        gitState.level = 9
      }
      return gitBranch(structure, command.slice(11))
    } else if (command.slice(4,9) === 'merge') {
      if(gitState.level === 8.5){
        gitState.level = 8.6
      }
      return gitMerge(gitState, command.slice(10))
    } else {
      return `<div class='invalid'>${command} is not valid</div>`
    }
  }
}

const gitMerge = ( gitState, command ) => {
  if(command === ''){
    return "<div class='invalid'>Did not specify merge branch</div>"
  }
  if ( gitState.branch ){
    if(command === gitState.branch.name) {
      gitState.fileStructure = $.extend(true, {}, gitState.branch.fileStructure)
      gitState.commitHistory = []
      Object.values(gitState.branch.commitHistory).forEach(commit => {
        gitState.commitHistory.push($.extend(true, {}, commit))
      })
      return `<div>merged ${gitState.branch.name} to master</div>`
    }
  } else {
    if( command === 'master'){
      gitState.fileStructuregitState.branch.fileStructure = $.extend(true, {}, gitState.fileStructure)
      gitState.branch.commitHistory = []
      Object.values(gitState.commitHistory).forEach(commit => {
        gitState.branch.commitHistory.push($.extend(true, {}, commit))
      })
      return `<div>merged master to ${gitState.name}</div>`
    } else {
      return `<div>Branch does not exist</div>`
    }
  }
}

const logHistory = gitState => {
  if(gitState.commitHistory.length){
    let commits = ''
    gitState.commitHistory.forEach((commit, index) => {
      commits+=`<div class='commit-head'>commit: ${commit.id} ${index === 0 ? `<span class='commit-head'>HEAD -> ${gitState.branch ? 'master' : gitState.name}</span>`:""}</div>`
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

const gitBranch = (gitState, command) => {
  if(command.slice(0,2) === '-d' || command.slice(0,2) === '-D'){
    if(gitState.branch){
      gitState.branch.status = false
      gitState.branch.checkout = false
      gitState.branch.name = ''
      gitState.branch.fileStructure = {}
      gitState.branch.commitHistory = []
      return 'deleted branch'
    } else {
      return "<div class='invalid'>You cannot destroy branch unless you are in master branch</div>"
    }
  } else {
    if(command === ''){
      if(gitState.branch){
        if(gitState.branch.status){
          if( gitState.branch.checkout){
            return `<div>master</div><div class='valid'>*${gitState.branch.name}</div>`
          } else {
            return `<div class='valid'>*master</div><div>${gitState.branch.name}</div>`
          }
        } else {
          return `<div class='valid'>*master</div><div></div>`
        }
      } else {
        if(gitState.checkout){
          return `<div>master</div><div class='valid'>*${gitState.name}</div>`
        } else {
          return `<div class='valid'>*master</div><div>${gitState.name}</div>`
        }
      }
    } else {
      gitState.branch.status = true
      gitState.branch.name = command
      gitState.branch.username = gitState.username
      gitState.branch.fileStructure = $.extend(true, {}, gitState.fileStructure)
      Object.values(gitState.commitHistory).forEach(commit => {
        gitState.branch.commitHistory.push($.extend(true, {}, commit))
      })
      return `created branch ${command}`
    }
  }
}


const gitCheckout = (gitState, command) => {
  if(Object.keys(gitState.fileStructure).includes(command.split(' ')[0])){
    let result = ''
    command.split(' ').forEach(file => {
      if(gitState.commitHistory[0].fileStructure[file]){
        gitState.fileStructure[file] = Object.assign({}, gitState.commitHistory[0].fileStructure[file])
      } else {
        result += `<div class='invalid'>${file} is not being tracked</div>`
      }
    })
    return result
  } else if (command === 'master'){
    gitState.checkout = false
    return `<div>Current Branch: master</div>`
  } else if (gitState.branch && command === gitState.branch.name){
    gitState.branch.checkout = true
    return `<div>Current Branch: ${gitState.branch.name}</div>`
  } else {
    return `<div class='invalid'>Branch does not exist</div>`
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
      if(gitState.branch){
        commit.branch = 'master'
      } else {
        commit.branch = gitState.name
      }
      commit.message = message
      commit.timeStamp = new Date()
      commit.id = Math.floor(Math.random() * 1000000)
      commit.username = gitState.username
      gitState.commitHistory.unshift(Object.assign({}, commit))

      return 'files committed'
    } else {
      return "<div class='invalid'>nothing to commit</div>"
    }
  }
}

const terminalResult = {
  'git': {
    'init': test,
    'add': test,
    'commit': test,
    'config': test,
    'log': test,
    'diff': test,
    'checkout': test,
    'branch': test,
  },
  'rm': rmCommand,
  'next': nextStep,
  'prev': prevStep,
  'about': test,
  'invalid': invalidCommand
}

function test(first, ...args){
  console.log('test', first, args)
}