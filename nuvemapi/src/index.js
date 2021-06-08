const kafka = require('./Kafka')
const db = require('./models')
db.sequelize.sync().then(() => console.log('db is ready'))
const app = kafka.createKafkaServices('api_nuvem')

console.log('consumer');


const onMessage = async ({ message }) => {
    console.log('On message');
    let data = JSON.parse(String(message.value))
    let result = await db.sequelize.models.User.create({ ...data })

    console.log(`register created `, result.dataValues);
    let all = await db.sequelize.models.User.findAll()
    console.log('s');

}


app.watch('create_user', onMessage)





// PRAGMA INDEX_LIST(`Users`);
// select * from Users