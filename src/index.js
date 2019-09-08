const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const Filter = require('bad-words');
const { generateMessage } = require('./utils/messages');
const app = express()
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;

const publicDirectoyPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoyPath))



io.on('connection', (socket) => {
console.log('New webSocket connection')

    socket.emit('message', generateMessage('Welcome!'))
    socket.broadcast.emit('message', generateMessage('A new user has joined'))

    socket.on('sendMessage', (message, callback) => {
        const filter = new Filter()

        if(filter.isProfane(message)){
            return callback('profanity is not allowed')
        }
        io.emit('message', generateMessage(message))
        callback()
    })

    socket.on('sendLocation', (cords, callback) => {
        io.emit('locationMessage',`https://google.com/maps?q=${cords.latitude},${cords.longitude}`)
        callback()
    })
    socket.on('disconnect', () => {
        io.emit('message', generateMessage('A user has left!'))
    })
})

server.listen(port, () => {
    console.log(`server is up on port ${port}`)
});