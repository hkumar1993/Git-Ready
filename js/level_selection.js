
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
      gitState.initialized = false
      gitState.remote = false
      gitState.step = 'Step 1: Initialize'
      gitState.instructions =
      "Welcome to <span class='bg'>Ready Git Go!</span>, your one stop to get up and running with Git quick!<p>Let's start with the basics, <span class='bg'>Git</span> is a free and open sourced version control system, used to log changes and collaborate on projects.</p><p>Let's initialize git right now!</p>\n<p>Type: <span class='bg'>git init</span> into the terminal</p>"
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
