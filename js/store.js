import render from './display'

const gitState = {
    initialized: false,
    remote: false,
    branch: {
        checkout: false,
        name: '',
        fileStructure: {

        },
        commitHistory: [],
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

export default gitState