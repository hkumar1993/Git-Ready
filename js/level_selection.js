
const levelSelection = gitState => {
  $('#level-selector').change( e => {
    gitState.level = parseInt(e.target.value)
    gitState.fileStructure = levelStructure(gitState)
    gitState.render(gitState)
  })
}

const levelStructure = gitState => {
  switch (gitState.level) {
    case 0:
      gitState.initialized = false;
      gitState.remote = false;
      return {}
    case 1:
      gitState.initialized = true;
      gitState.remote = false;
      return {
        '.git': 'ignored'
      }
    default:
      return gitState.fileStructure
  }
}

export default levelSelection
