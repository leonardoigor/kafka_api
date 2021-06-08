const { Kafka, logLevel } = require('kafkajs')

module.exports = class KafkaServices {
    /**  @variation {Kafka} kafka*/
    kafka
    constructor(clientId) {
        this.connect(clientId)
    }
    connect(clientId = 'login') {


        try {
            this.kafka = new Kafka({
                clientId,
                brokers: ['localhost:9092'],
                retry: {
                    initialRetryTime: 50,
                    retries: 10
                },
                logLevel: logLevel.DEBUG,

            })
            console.log('Kafka Connected');
        } catch (error) {
            console.log('error', error);
        }
    }
    async watch(topic, eachMessage) {
        const consumer = this.kafka.consumer({ groupId: 'login-group' })

        await consumer.connect()
        await consumer.subscribe({ topic, fromBeginning: false })

        await consumer.run({
            eachMessage

        })
    }
    async emit(data, topic) {
        console.log(data, topic, 'init');
        const producer = this.kafka.producer()
        console.log('create produces');
        await producer.connect()
        console.log('connect produces');
        await producer.send({
            topic: topic,
            messages: [
                { value: JSON.stringify(data) },
            ],
        })
        console.log('send produces');

        await producer.disconnect()
    }

    static createKafkaServices() {
        let instance = new KafkaServices()
        return instance
    }
}