const express = require('express');
const mongosse = require('mongoose');
const server = express();
const path = require('path');
const projectRoutes = require('./routes/project');
const userRoutes = require('./routes/user')
mongosse.connect("mongodb+srv://amirghedirq:RVaeoXZ1Lrk1U9s2@cluster0-bjmuu.mongodb.net/test?retryWrites=true&w=majority", {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
server.use('/project', (projectRoutes))
server.use('/user', userRoutes)
if (process.env.NODE_ENV === 'production') {

    server.use(express.static('client/build'));
    server.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}


server.listen(process.env.PORT || 9000)
