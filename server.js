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

app.listen(PORT, () => {
    
})