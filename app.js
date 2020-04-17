const express = require('express');
const mongosse = require('mongoose');
const app = express();
const path = require('path');
const projectRoutes = require('./routes/project');
const userRoutes = require('./routes/user')
const topicRoutes = require('./routes/topic')
const bannedRoutes = require('./routes/banned')
const notificationRoutes = require('./routes/notification')
const webpush = require('web-push')
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, "client")))
app.all("/*", function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
});
mongosse.connect(process.env.MONGO_INFO, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
const publicVadidKey = 'BMUYV7TShfXpU5edFVCfBEO0JwC-kCujoxV6q4pp3WHipuDPF2OE4bMd4LYYsNjKdn9GMtIlxW6vMQinu9qBkUg';
const privateKey = 'vw_UuoniFImREBrhv-eU3UewiDJg9vTfyAHnpPlVUWA'

webpush.setVapidDetails('mailto:test@gmail.com', publicVadidKey, privateKey)
app.post('/subscribe', (req, res) => {
    const subscription = req.body.subscription;
    res.status(201).json({ result: 'done' })
    const payload = JSON.stringify({ title: 'Amir Platform', content: req.body.content })
    webpush.sendNotification(subscription, payload)
        .catch(err => {
            console.log(err)
        })
})
app.use('/project', (projectRoutes))
app.use('/user', userRoutes)
app.use('/topic', topicRoutes)
app.use('/banned', bannedRoutes)
app.use('/notification', notificationRoutes)

if (process.env.NODE_ENV === 'production') {

    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}


module.exports = app