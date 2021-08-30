const express = require('express')
var cors = require('cors')
const app = express()
const port = 3000
const db = require('./DB/queries')

app.use(cors())
app.use(express.json())

// app.get('/', (req, res) => res.json({info: "NodeJS, Express and Postgre API"}))

app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserByID)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))