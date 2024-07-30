const { readFile, writeFile } = require('fs/promises')
const path = require('path')

const dbPath = path.join(__dirname,'..', 'db', 'db.json')

const readNotesDB = async () => {
    const content = await readFile(dbPath, 'utf-8')

    const notes = JSON.parse(content)

    return notes
}

const writeNotesDB = async (notes) => {
    return await writeFile(dbPath, JSON.stringify(notes))
}

module.exports = { readNotesDB, writeNotesDB }