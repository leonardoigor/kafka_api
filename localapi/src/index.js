try {
    const express = require('express')
    const kafka = require('./Kafka')

    const app = express()
    app.use(express.json())
    let kafaConnect = kafka.createKafkaServices('api_local')
    let main = async data => {
        await kafaConnect.emit(data, 'create_user')
    }
    main({ status: "passou" })
    app.use((req, _, next) => {
        req.kafka = kafaConnect
        next()
    })
    require('./routes')(app)





    app.listen(3000, async () => {
        console.log('runing', 3000)
    })
} catch (error) {
    console.log('geral', error);
}