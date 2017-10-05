
export const levelSelection = gitState => {
  $('#prev-level').click( e => {
    if(Math.floor(gitState.level) > 1){
      gitState.level = Math.floor(gitState.level)-1
      levelStructure(gitState)
      gitState.render(gitState)
    }
  })

  $('#next-level').click( e => {
    if(Math.floor(gitState.level) < 7){
      gitState.level = Math.floor(gitState.level)+1
      levelStructure(gitState)
      gitState.render(gitState)
    }
  })
}

export const nextStep = gitState => {
  const levels = [1,1.1,2,3,3.1,3.2,4,4.1,5,5.1,6,6.1,7]
  if(gitState.level < levels[levels.length - 1]){
    const i = levels.findIndex(level => level === gitState.level)
    gitState.level = levels[i+1]
  } else {
    $('#terminal-command-list').append(`<div class='invalid'>Already at last step</div>`)
  }
}

export const prevStep = gitState => {
  const levels = [1,1.1,2,3,3.1,3.2,4,4.1,5,5.1,6,6.1,7]
  if(gitState.level > levels[0]){
    const i = levels.findIndex(level => level === gitState.level)
    gitState.level = levels[i-1]
  } else{
    $('#terminal-command-list').append(`<div class='invalid'>Already at first step</div>`)
  }
}

export const levelStructure = gitState => {
  switch (gitState.level) {
    case 1:
      gitState.initialized = false
      gitState.remote = false
      gitState.step = 'Step 1: Initialize'
      gitState.instructions =
      "Welcome to <span class='bg'>Ready Git Go!</span>, a game where you learn the basics of git!<p><span class='bg'>Git</span> is a free and open sourced version control system. It is widely used to log changes and collaborate on projects. Let's take a look at the power of git!</p><p>To begin, type <span class='bg'>next</span> in the terminal.</p><br/><p>Hint: Use <span class='bg'>next</span> or <span class='bg'>prev</span> to jump to different steps. User <span class='bg'>clear</span> to clear the terminal </p>"
      gitState.fileStructure = firstAnimals
      break;
    case 1.1:
      gitState.fileStructure = firstAnimals
      gitState.initialized = false
      gitState.remote = false
      gitState.step = 'Step 1: Initialize'
      gitState.instructions =
      "To use git in your project, run the command: <span class='bg'>git init</span> in the terminal</p><p>This initalizes git, and installs a <span class='bg'>.git</span> folder in your project. This folder holds all the information on your project. Although you will not need to interact with this folder directly, keep in mind, if you delete this folder, you delete git.</p><p>Initialize git now, run the command above and see what happens.</p>"
      break;
    case 2:
      gitState.initialized = true;
      // gitState.remote = false;
      gitState.step = 'Step 2: Who are you?'
      gitState.instructions =
      "Congratulations! You just set up your first git repository! Now you can  make changes to your project and log them as you go. But wait! The computer does not know who you are, we don't want to log all your changes anonymously.<p>We need to configure git to know who you are.</p> <p>Type: <span class='bg'>git config user.name 'your name here'</span> to tell the computer who you are. Don't forget the quotes!</p>"
      gitState.fileStructure = gitFirstAnimals
      break;
    case 3:
      // gitState.initialized = true;
      // gitState.remote = false;
      gitState.step = 'Step 3: Adding files'
      gitState.instructions =
      "When creating a log of your files, git needs to know exactly what files you want to log. You can log files one-by-one, in groups, or all at once. You do this by using the <span class='bg'>git add</span> command. Lets try adding just one file. Tell git to add the <span class='bg'>bear</span><p>Type: <span class='bg'>git add bear</span></p>"
      gitState.fileStructure = gitFirstAnimals
      break;
    case 3.1:
      gitState.instructions = "Great! You just added the bear to the staging area! We'll talk more about the staging area later. For now, Try it yourself! <p>Add the <span class='bg'>gorilla</span></p>"
      break;
    case 3.2:
      gitState.instructions = "Great! You added the gorilla to the staging area! We just added a bunch of new animals for you, add them all! <p>If you're thinking it would be inefficient to add each animal one by one, you're right, it would be, but that's where this magical command comes in</p><p><span class='bg'>git add -A</span> adds ALL files to the staging area. Try it for yourself.</p>"
      gitState.fileStructure = stagedFirstAnimals
      break;
    case 4:
      gitState.commitHistory = []
      gitState.step = 'Step 4: Commit files'
      gitState.instructions =
      "Great! You've staged all the files. Staging files is the equivalent of saying you've prepared the files to be logged, or in git terms, <span class='bg'>committed</span>.<p>You do not always need to stage all the files to commit, in fact, its best to break up your <span class='bg'>commits</span> into groups.</p><p>Type <span class='bg'>next</span> to learn how to commit.</p>"
      gitState.fileStructure = allStagedAnimals
      break;
    case 4.1:
      gitState.instructions =
      "You can commit files in your staging area with the command: <span class='bg'>git commit</span></p><p>As we know, a <span class='bg'>commit</span> is like a log in your git. Well, every log entry needs to have a heading, a context of what the log is about. Simlarly, a <span class='bg'>commit</span> requires a message. You can add a message by adding <span class='bg'>-m 'message here'</span> to the commit command</p><p>Try it yourself, run <span class='bg'>git commit -m 'some message here'</span>, make sure your message describes what you just did.</p>"
      gitState.fileStructure = allStagedAnimals
      gitState.commitHistory = []
      break;
    case 5:
      gitState.step = 'Step 5: The History'
      gitState.instructions =
      "Congratulations! You just committed your first set of files! A record of your files is stored in what is known as a <span class='bg'>repository</span>. The repository displays the most current commit. Your history of all your commits can be seen by using <span class='bg'>git log</span>.<p>Try that now, use <span class='bg'>git log</span> to see your commit history</p>"
      gitState.fileStructure = allCommittedAnimals
      if(!gitState.commitHistory.length){
        gitState.commitHistory = [{
          'fileStructure': committedStructure,
          'username': 'user',
          'message': 'Add all animals',
          'id': Math.floor(Math.random() * 1000000),
          'timeStamp': new Date()
        }]
      }
      break;
    case 5.1:
      gitState.instructions =
      "Woah! What are all these numbers? And what is this <span class='bg'>HEAD</span> and <span class='bg'>master</span> business?<p>The <span class='bg'>HEAD</span> acts as a pointer to your latest commit. The numbers act as an ID for your commit, which can be used to refer to specific commits that are not your current HEAD. <span class='bg'>master</span> refers to the branch that the commit came from. You will see in later steps the importance of each of these in more detail.</p><p>Go to the <span class='bg'>next</span> step</p>"
      break;
    case 6:
      gitState.step = "6. State Differences"
      gitState.instructions =
      "Before we jump into more advanced skills, lets see one more important command, <span class='bg'>git diff</span><p>There will be times when you make changes in your files, and need to check what changes you made before committing them. Use the <span class='bg'>git diff</span> command to check file differences. Try it yourself!</p>"
      const newState = Object.assign({},allCommittedAnimals)
      delete newState['bat']
      newState['bear'].details = 'panda'
      gitState.fileStructure = newState
      break;
    case 6.1:
      gitState.instructions =
      "Great! We can see we changed the bear from being a regular bear to a panda, and removed the bat altogether. Let's commit these changes again. All files in the local repository are  called 'tracked' files. Git knows they exists and will be watching them until they are deleted. Since both the bat and the bear are being tracked, we can use <span class='bg'>git commit -am 'message here'</span> to immediately commit changes in tracked files. Try it out! Make sure to run <span class='bg'>git log</span> to check the history!</p>"
      break;
    case 7:
      gitState.step='7.haha'
      gitState.instructions = ''
      break;
    default:
      gitState.fileStructure = gitState.fileStructure
  }
}

const firstAnimals = {
  'bear': {
    'status':'new',
    'details': 'bear'
    },
  'gorilla':{
    'status':'new',
    'details': 'gorilla'
  }
}

const gitFirstAnimals = Object.assign({}, {
  '.git': {
    'status':'ignored',
    'details':'folder'
  }
}, firstAnimals)

const stagedFirstAnimals = Object.assign({}, gitFirstAnimals, {
  'bear': {
    'status':'staged',
    'details': 'bear'
  },
  'gorilla':{
    'status':'staged',
    'details': 'gorilla'
  },
  'cat': {
    'status':'new',
    'details':'cat'
    },
  'dog': {
    'status':'new',
    'details':'dog'
    },
  'hedgehog': {
    'status':'new',
    'details':'hedgehog'
    },
  'bat': {
    'status':'new',
    'details':'bat'
    }
})

const allStagedAnimals = Object.assign({}, stagedFirstAnimals, {'cat': {
  'status':'staged',
  'details':'cat'
  },
'dog': {
  'status':'staged',
  'details':'dog'
  },
'hedgehog': {
  'status':'staged',
  'details':'hedgehog'
  },
'bat': {
  'status':'staged',
  'details':'bat'
  }})

  const allCommittedAnimals = Object.assign({}, allStagedAnimals, {
    'bear': {
      'status':'committed',
      'details': 'bear'
    },
    'gorilla':{
      'status':'committed',
      'details': 'gorilla'
    },
    'cat': {
      'status':'committed',
      'details':'cat'
      },
    'dog': {
      'status':'committed',
      'details':'dog'
      },
    'hedgehog': {
      'status':'committed',
      'details':'hedgehog'
      },
    'bat': {
      'status':'committed',
      'details':'bat'
      }
  } )

  const committedStructure = {
    'bear': {
      'status':'committed',
      'details': 'bear'
    },
    'gorilla':{
      'status':'committed',
      'details': 'gorilla'
    },
    'cat': {
      'status':'committed',
      'details':'cat'
      },
    'dog': {
      'status':'committed',
      'details':'dog'
      },
    'hedgehog': {
      'status':'committed',
      'details':'hedgehog'
      },
    'bat': {
      'status':'committed',
      'details':'bat'
      }
  }
