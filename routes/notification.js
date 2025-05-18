const express = require('express');
const router = express.Router();
const sendToQueue = require('../sender/notificationSender');

let notifications = [];
let nextId = 1;

const allowedTypes = ['Email', 'SMS', 'in-app'];

router.post('/notifications', async (req, res) => {
    const { user, message, type } = req.body;

    if (!user || !message || !type) {
        return res.status(400).json({ error: 'user, message, and type are required' });
    }

    if (!allowedTypes.includes(type)) {
        return res.status(400).json({ error: `Invalid notification type. Allowed types: ${allowedTypes.join(', ')}` });
    }

    const notification = {
        id: nextId++,
        user,
        message,
        type,
        timestamp: new Date()
    };

    notifications.push(notification);
    await sendToQueue(notification);

    res.status(202).json({ success: true, id: notification.id });
});


router.get('/users/:id/notifications', (req, res) => {
    const userId = parseInt(req.params.id);
    const userNotifications = notifications.find(n => n.id === userId);

 if (!userNotifications) {
        return res.status(404).json({ error: 'No notifications found for this user' });
    }
    res.json(userNotifications);
});

module.exports = router;
