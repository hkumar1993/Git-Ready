import terminal from './terminal'
import { levelSelection, levelStructure } from './level_selection'
import render from './display'

$(document).ready(() => {
  let gitState = {
    initialized: false,
    remote: false,
    currentCommand: '',
    previousCommands: [],
    fileStructure: {
    },
    level: 0,
    previousLevel: 0,
    render,
    commitHistory: [{
      fileStructure: {
        '.git':'ignored',
        'cat': 'committed',
        'dog':'committed'
      },
      message: 'test'
    }],
    commit: '',
    step: '',
    instructions: ''
  }
  gitState.fileStructure = levelStructure(gitState)
  gitState.render(gitState)
  levelSelection(gitState)
  terminal(gitState);
})
