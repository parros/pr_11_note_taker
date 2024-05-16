const {readFile, writeFile} = require('fs/promises')
const path = require('path')
const express = require('express')

// const notesData = require('./db/db.json')


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

app.get('/api/notes', (req, res) => {
    let finalResult = notesData
})


app.post('/api/notes', async (req, res) => {
    const newNote = req.body

    const content = await readFile(path.join(__dirname, 'db', 'db.json'), 'utf-8')
    const notes = JSON.parse(content)
    notes.push(newNote)
    await writeFile(path.join(__dirname, 'db', 'db.json'), JSON.stringify(notes))

    res.end()
})

app.listen(PORT, () => {
    console.log(`Server lsitening at http://localhost:${PORT}`)
})