const express = require('express');
const mongosse = require('mongoose');
const app = express();
const path = require('path');
const projectRoutes = require('./routes/project');
const userRoutes = require('./routes/user')

app.all("/*", function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
});
mongosse.connect(process.env.MONGO_ATLAS_INFO, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
app.use('/project', (projectRoutes))
app.use('/user', userRoutes)
if (process.env.NODE_ENV === 'production') {

    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}


module.exports = app;