import terminal from './terminal'
import { levelSelection, levelStructure } from './level_selection'
import render from './display'

$(document).ready(() => {
  let gitState = {
    initialized: false,
    remote: false,
    branch: {
      name: '',
      branchStructure: {

      },
      branchCommitHistory: [],
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
  levelStructure(gitState)
  gitState.render(gitState)
  levelSelection(gitState)
  terminal(gitState);
})
