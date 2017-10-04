
export const levelSelection = gitState => {
  $('#prev-level').click( e => {
    if(gitState.level > 1){
      gitState.level--
      levelStructure(gitState)
      gitState.render(gitState)
    }
  })

  $('#next-level').click( e => {
    if(gitState.level <= 3){
      gitState.level++
      levelStructure(gitState)
      gitState.render(gitState)
    }
  })
}

export const levelStructure = gitState => {
  switch (gitState.level) {
    case 1:
      gitState.initialized = false
      gitState.remote = false
      gitState.step = 'Step 1: Initialize'
      gitState.instructions =
      "Welcome to <span class='bg'>Ready Git Go!</span>, a game where you learn the basics of git!<p><span class='bg'>Git</span> is a free and open sourced version control system. It is widely used to log changes and collaborate on projects. Let's take a look at the power of git!</p><p>Initialize git right now!</p>\n<p>Type: <span class='bg'>git init</span> into the terminal</p>"
      gitState.fileStructure = {
        'panda': 'new',
        'gorilla': 'new'
      }
      break;
    case 2:
      gitState.initialized = true;
      // gitState.remote = false;
      gitState.step = 'Step 2: Who are you?'
      gitState.instructions =
      "Congratulations! You just set up your first git repository! Now you can  make changes to your project and log them as you go. But wait! The computer does not know who you are, we don't want to log all your changes anonymously.<p>We need to configure git to know who you are.</p> <p>Type: <span class='bg'>git config user.name 'your name here'</span> to tell the computer who you are. Don't forget the quotes!</p>"
      gitState.fileStructure = {
        '.git': 'ignored',
        'panda': 'new',
        'gorilla': 'new'
      }
      break;
    case 3:
      // gitState.initialized = true;
      // gitState.remote = false;
      gitState.step = 'Step 3: Adding files'
      gitState.instructions =
      "When creating a log of your files, git needs to know exactly what files you want to log. You can log files one-by-one, in groups, or all at once. You do this by using the <span class='bg'>git add</span> command. Lets try adding just one file. Tell git to add the <span class='bg'>panda</span><p>Type: <span class='bg'>git add panda</span></p>"
      gitState.fileStructure = {
        '.git': 'ignored',
        'panda': 'new',
        'gorilla': 'new'
      }
      break;
    case 3.1:
      gitState.instructions = "Great! You just added the panda to the staging area! We'll talk more about the staging area later. For now, Try it yourself! <p>Add the <span class='bg'>gorilla</span></p>"
      break;
    case 3.2:
      gitState.instructions = "Great! You added the gorilla to the staging area! We just added a bunch of new animals for you, add them all! <p>If you're thinking it would be inefficient to add each animal one by one, you're right, it would be, but thats we're this magical command comes in</p><p><span class='bg'>git add -A</span> adds ALL files to the staging area. Try it for yourself.</p>"
      gitState.fileStructure = {
        '.git': 'ignored',
        'panda': 'staged',
        'gorilla': 'staged',
        'cat': 'new',
        'dog': 'new',
        'hedgehog': 'new',
        'bat': 'new',
      }
      break;
    case 4:
      // gitState.initialized = true;
      // gitState.remote = false;
      gitState.step = 'Step 4: Commit files'
      gitState.instructions =
      ""
      gitState.fileStructure = {
        '.git': 'ignored',
        'panda': 'staged',
        'gorilla': 'staged',
        'cat': 'staged',
        'dog': 'staged',
        'hedgehog': 'staged',
        'bat': 'staged',
      }
      break;
    default:
      gitState.fileStructure = gitState.fileStructure
  }
}
