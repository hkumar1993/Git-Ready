import terminal from './terminal'

$(document).ready(() => {
  let gitState = {
    initialized: false,
    remote: false,
    currentCommand: '',
    previousCommands: []
  }
  terminal(gitState);
})
