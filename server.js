const { readNotesDB, writeNotesDB } = require('./utils/file-system')
const path = require('path')
const express = require('express')

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

app.get('api/animals/:name', async (req, res) => {
    const name = req.params.name.toLowerCase()

    const notes = await readNotesDB()

    let foundNotes = notes.filter(animal => animal.name.toLowerCase() === name)

    res.json(foundNotes)
})

app.post('/api/notes', async (req, res) => {
    const newNote = req.body

    const notes = await readNotesDB()
    notes.push(newNote)
    await writeNotesDB(notes)

    res.status(201).json(newNote)
})

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`)
})