const db = require('./../models')
db.sequelize.sync().then(() => console.log('db is ready'))


module.exports = app => {
    app.post('/', async (req, res) => {
        let data = req.body
        console.log('data');
        try {
            let result = await db.sequelize.models.User.create({ ...data })

            req.kafka.emit(data, 'create_user')
            await (1000).delay()
            res.send({ result })
        } catch (error) {
            console.log(error);
        }
    })
}