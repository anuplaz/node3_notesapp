const validator = require('validator')
const { demandOption, argv } = require('yargs')
const yargs = require('yargs')
const chalk = require('chalk')
const notes = require('./notes')
const lol=require('lol')

yargs.command({
    command:'add',
    describe: 'Add a new note',
    builder:{
        title:{
            describe:'Note Title',
            demandOption: true,
            type: 'string'
        },
        body:{
            describe:'Note Body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.addNote(argv.title,argv.body)
    }
})

yargs.command({
    command:'remove',
    describe: 'Remove a new note',
    builder:{
        title:{
            describe:'Title of Note',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.removeNote(argv.title)
    }
})

yargs.command({
    command: 'read',
    describe:'Read a note',
    builder:{
        title:{
            describe:'Title of Note',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.readNote(argv.title)
    }
})

yargs.command({
    command: 'list',
    describe:'List all notes',
    handler(){
        notes.listNotes()
    }
})
yargs.parse();
