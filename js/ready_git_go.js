import terminal, {writeToTerminal} from './terminal'
import gitState from './store'
import { levelSelection, levelStructure } from './level_selection'

document.addEventListener("DOMContentLoaded", function(){
  if (gitState.level === 1) {
    writeToTerminal('Type "next" to begin ...', 'valid', 'div')
    writeToTerminal('Type "about" to learn more about the developer ...', 'valid', 'div')
  }
  // levelStructure(gitState)
  // gitState.render(gitState)
  // levelSelection(gitState)
  terminal(gitState);
})

