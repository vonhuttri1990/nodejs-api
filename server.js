const express = require('express')
var cors = require('cors')
const app = express()
const port = 3000

app.use(cors())

app.get('/', (req, res) => res.send('Hello World! Vo Nhut Tri222, hihi'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))