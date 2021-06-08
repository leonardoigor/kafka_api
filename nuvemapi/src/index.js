const kafka = require('./Kafka')

const app = kafka.createKafkaServices('api_nuvem')

console.log('consumer');
const onMessage = ({ message }) => {
    console.log('On message');
    let data = String(message.value)
    console.log(data, 'data');
}
app.watch('create_user', onMessage)