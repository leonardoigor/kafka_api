try {
    const express = require('express')
    const db = require('./models/')

    const app = express()
    app.use(express.json())
    const kafka = require('./Kafka')
    const ka = kafka.createKafkaServices()

    app.post('/', async (req, res) => {
        await db.sequelize.models.User.findAll().then(e => {
            console.log(req.body);
            res.send({ data: e })
        }).catch(e => {
            res.send({ e: e.message })
        })
    })
    app.listen(3000, async () => {
        // await main().then(m => {
        //     console.log(m, 's');
        // })



        console.log('runing', 3000)
    })
} catch (error) {
    console.log('geral', error);
}