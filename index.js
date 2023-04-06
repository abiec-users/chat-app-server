const express = require('express');
const app = express();
const http = require('http');
const {Server} = require('socket.io');
const cors = require('cors');
const { Socket } = require('dgram');

//apply cors to app
app.use(cors)

//create server
const server = http.createServer(app);

//create instance for socket.io 
const io = new Server(server,{
    cors:{
        origin: '*',
        methods: ['GET', 'POST']
    },
});

//listen events
io.on('connection', (socket)=>{
    console.log(`User connected: ${socket.id}`)

    socket.on('send_message', (data)=>{
        socket.broadcast.emit('receive_message', data)
    })
})

//listen server method
server.listen(3001, ()=>{
    console.log('server is listening!')
})
