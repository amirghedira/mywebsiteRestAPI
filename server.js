const app = require('./app');
const http = require('http').createServer(app);
const io = require('socket.io')(http)

http.listen(process.env.PORT || 5000, () => {

    console.log('server started')
    io.on('connection', (socket) => {
        console.log(socket.id)
        socket.on('sendnotification', (notification) => {
            socket.broadcast.emit('sendnotification', notification)
        })
        socket.on('sendprojects', (projects) => {
            console.log('projects')
            socket.broadcast.emit('sendprojects', projects)
        })
        socket.on('sendtopic', (topic) => {
            socket.broadcast.emit('sendtopic', topic)
        })

        socket.on('sendtopics', topics => {
            socket.broadcast.emit('sendtopics', topics)
        })


    })

})


