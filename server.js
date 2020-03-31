const express = require('express');
const mongosse = require('mongoose');
const server = express();
const path = require('path');
const projectRoutes = require('./routes/project');
const userRoutes = require('./routes/user')
mongosse.connect("mongoinfo", {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
server.use('/project', (projectRoutes))
server.use('/user', userRoutes)


server.listen(process.env.PORT || 5000)
