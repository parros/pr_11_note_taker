const { readNotesDB, writeNotesDB } = require('./utils/file-system')
const path = require('path')
const express = require('express')
const { v4: uuidv4 } = require('uuid')

const app = express()
const PORT = 3001

app.use(express.static('public'))
app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'))
})

app.get('/api/notes', async (req, res) => {

    const notes = await readNotesDB()
    let finalResult = notes

    res.json(finalResult)
})

app.post('/api/notes', async (req, res) => {
    const newNote = {
        id: uuidv4(),
        ...req.body
    }

    const notes = await readNotesDB()
    notes.push(newNote)
    await writeNotesDB(notes)

    res.status(201).json(newNote)
})

app.delete('/api/notes/:id', async (req, res) => {
    const id = req.params.id
    const notes = await readNotesDB()

    const filterNotes = notes.filter(note => note.id !== id)
    await writeNotesDB(filterNotes)

    res.status(200).send()
})

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`)
})