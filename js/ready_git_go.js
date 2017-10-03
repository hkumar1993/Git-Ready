import terminal from './terminal'
import levelSelection from './level_selection'
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
    render
  }
  levelSelection(gitState)
  terminal(gitState);
})
