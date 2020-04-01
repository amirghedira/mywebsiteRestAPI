const express = require('express');
const mongosse = require('mongoose');
const server = express();
const projectRoutes = require('./routes/project');
const userRoutes = require('./routes/user')

mongosse.connect(process.env.MONGO_ATLAS_INFO, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
server.use('/project', (projectRoutes))
server.use('/user', userRoutes)

server.listen(process.env.PORT || 5000)
