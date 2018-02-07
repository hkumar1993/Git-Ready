import terminal from './terminal'
import { levelSelection, levelStructure } from './level_selection'
import render from './display'

document.addEventListener("DOMContentLoaded", function(){
  let gitState = {
    initialized: false,
    remote: false,
    branch: {
      checkout: false,
      name: '',
      fileStructure: {

      },
      commitHistory: [],
      status: false
    },
    currentCommand: '',
    previousCommands: [],
    fileStructure: {
    },
    terminalCount: 0,
    level: 1,
    previousLevel: 1,
    render,
    commitHistory: [],
    commit: '',
    step: '',
    instructions: '',
    username: ''
  }
  if (gitState.level === 1) {
    const termCmdList = document.querySelector('#terminal-command-list');
    termCmdList.innerHTML += `<div class='valid'>Type "next" to begin ...</div>`
    termCmdList.innerHTML += `<div class='valid'>Type "about" to learn more about the developer ...</div>`
    // $('#terminal-command-list').append(`<div class='valid'>Type "about" to learn more about the developer ...</div>`)
  }
  // levelStructure(gitState)
  // gitState.render(gitState)
  // levelSelection(gitState)
  terminal(gitState);
})

