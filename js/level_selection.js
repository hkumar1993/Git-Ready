
export const levelSelection = gitState => {
  $('#level-selector').change( e => {
    gitState.level = parseInt(e.target.value)
    gitState.fileStructure = levelStructure(gitState)
    gitState.render(gitState)
  })
}

export const levelStructure = gitState => {
  switch (gitState.level) {
    case 0:
      gitState.initialized = false;
      gitState.remote = false;
      return {
        'panda': 'new',
        'bear': 'new'
      }
    case 1:
      gitState.initialized = true;
      gitState.remote = false;
      return {
        '.git': 'ignored',
        'panda': 'new',
        'bear': 'new'
      }
    default:
      return gitState.fileStructure
  }
}
