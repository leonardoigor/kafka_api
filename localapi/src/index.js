const express = require('express')
const db = require('./db/')

const app = express()


db()



app.listen(3000, () => console.log('runing', 3000))