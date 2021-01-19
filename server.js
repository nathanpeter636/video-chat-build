const express = require('express');

const app = express();

const server = require('http').Server(app)

//https://socket.io/ 
const io = require('socket.io')(server);

//https://www.uuidgenerator.net/version4

const { v4: uuidv4 } = require('uuid')
app.set('view engine', 'ejs')
app.use(express.static('public'))







app.get('/', (req, res) => {
    res.redirect(`/${uuidv4()}`)
})

app.get('/:room', (req, res) => {
    res.render('room', { roomId: req.params.room });
})

//https://socket.io/docs/v3/server-api/#Flag-%E2%80%98broadcast%E2%80%99

io.on('connection', socket => {
    socket.on('join-room', (roomId) => {

    socket.join(roomId);
    socket.to(roomId).broadcast.emit('user-connected');
    })
})





server.listen(3030)