const fs = require('fs')
const chalk = require('chalk');
const getNotes = () => {
    return "maher is super";
}


const addNote = (title,body)=>{
    const notes = loadNotes();
    const duplicateNote = notes.find((note)=>
    note.title === title)

    debugger

    if(!duplicateNote){
        notes.push({title:title,
            body:body})
        saveData(notes)
        console.log(chalk.green.bold.inverse('New note added!'))
    
    }else{
        console.log(chalk.red.bold.inverse('This note is already taken'))
    }
    
}


const removeNote = (title)=>{
    const notes = loadNotes();
    if(notes.length === 0){
        console.log(chalk.red.bold.inverse('Notes are empty!'))
    }
    else{
        const duplicateNotes = notes.filter(function(note){
            return note.title === title
        })
        if(duplicateNotes.length === 0){
            console.log(chalk.red.bold.inverse('This note already not exist!'))
        }else{
            notes.splice(notes.indexOf(duplicateNotes),1)
            saveData(notes);
            console.log(chalk.green.bold.inverse('Note removed succesfully!'))
        }
       
    }

}


const listNotes = ()=>{
    const notes = loadNotes()
    if(notes.length === 0){
        console.log(chalk.red.bold.inverse('No Notes!!'))
    }else{
        console.log(chalk.green.bold.inverse('YOur Notes : '))
        notes.forEach(note => {
            console.log(note.title)
        });
    }
}


const readNote = (title) => {
    const notes = loadNotes();
    const duplicateNote = notes.find((note)=>
        note.title === title
    )

    if(duplicateNote){
        console.log(chalk.green.bold.inverse(duplicateNote.title))
        console.log(duplicateNote.body)
    }else{
        console.log(chalk.red.bold.inverse('Not found !!'))
    }
}

const saveData = (notes)=>{
    const dataJson = JSON.stringify(notes)
    fs.writeFileSync('notes.json',dataJson);
}

const loadNotes = ()=>{
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJson = dataBuffer.toString()
        return JSON.parse(dataJson);

    }catch(e){
        return []
    }
}

module.exports = {
    getNotes:getNotes,
    addNote:addNote,
    removeNote:removeNote,
    listNotes:listNotes,
    readNote:readNote
}