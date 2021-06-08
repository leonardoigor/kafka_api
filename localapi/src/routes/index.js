const db = require('./../models')

module.exports = app => {
    app.post('/', async (req, res) => {
        let data = req.body
        console.log('data', data);
        try {
            req.kafka.emit(data, 'create_user')
            res.send({ data })
        } catch (error) {
            console.log(error);
        }
    })
}
// await db.sequelize.models.User.findAll().then(async e => {
// }).catch(e => {
//     res.send({ e: e.message })
// })