const express = require('express')
const db = require('./models/')

const app = express()
const main = async () => {
    return await db.sequelize.sync()
}

app.get('/', async (req, res) => {
    await db.sequelize.models.User.findAll().then(e => {

        res.send({ data: e })
    }).catch(e => {
        res.send({ e })
    })
})
app.listen(3001, async () => {


    console.log('runing', 3001)
})