const amqp = require('amqplib');
const QUEUE = 'notification_queue';

const sendToQueue = async (data) => {
    try {
        const conn = await amqp.connect('amqp://localhost')
        const channel = await conn.createChannel();
        await channel.assertQueue(QUEUE);
        channel.sendToQueue(QUEUE, Buffer.from(JSON.stringify(data)));
        console.log('Notification sent to queue:', data);
        setTimeout(() => conn.close(), 500);
    } catch (err) {
        console.error('Error while sending to queue:', err);
    }
};

module.exports = sendToQueue;
