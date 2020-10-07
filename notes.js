const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) =>{
    const notes = loadNotes()
    const duplicateNotes= notes.filter((note)=> note.title === title)
    //debugger //use 'node inspect app.js' or 'node --inspect-brk app.js'

    if(duplicateNotes.length===0){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green('New note added : '+title))
    }
    else{
        console.log(chalk.red(`Note: ${title} already exists.`))
    }    
}

const removeNote = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title)

    if(notes.length > notesToKeep.length){
        console.log(chalk.green(`Deleted note: ${title}`))
        saveNotes(notesToKeep)
    }
    else
        console.log(chalk.red(`Note: ${title} not found.`))
}

const listNotes = () => {
    var slno = 0
    const notes = loadNotes()
    console.log(chalk.blue('Your notes:'))
    notes.forEach((note) => {
        slno++
        console.log(chalk.yellow(slno+'. '+note.title))
    })
}

const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title ===title)
    if(note){
        console.log(chalk.bold.blue(note.title))
        console.log(chalk.blue(note.body))
    }
    else
        console.log(chalk.red('Not found Note:'+ title))
}

const saveNotes = (notes) => {
    const dataJson = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJson)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJson = dataBuffer.toString()
        const notes= JSON.parse(dataJson)
        return notes
    } catch (e) {
        console.error(e);
        return []
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}