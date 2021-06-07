const { Kafka, logLevel } = require('kafkajs')

module.exports = class KafkaServices {
    /**  @variation {Kafka} kafka*/
    kafka
    constructor(clientId) {
        this.connect(clientId)
    }
    connect(clientId = 'login') {
        const { Kafka } = require('kafkajs')


        try {
            this.kafka = new Kafka({
                clientId,
                brokers: ['localhost:9092', 'localhost:9092', 'localhost:9092'],
                retry: {
                    initialRetryTime: 300,
                    retries: 10
                },
                logLevel: logLevel.WARN
            })

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
        const producer = this.kafka.producer()

        await producer.connect()
        await producer.send({
            topic: topic,
            messages: [
                { value: JSON.stringify(data) },
            ],
        })

        await producer.disconnect()
    }

    static createKafkaServices() {
        let instance = new KafkaServices()
        return instance
    }
}