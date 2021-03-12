const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, 'public')));

//Runs when a new websocket connection is opened
io.on('connection' , socket => {
    console.log('New websocket connected');

    // Welcome current user
    socket.emit('message', 'Welcome to ChatCord');          // This will send message to client

    // Broadcast when a user connects
    socket.broadcast.emit('message' , 'A new user has joined the room'); // This will send message to all connections to websocket except the client
    // Use io.emit(); to send all clients to websocket

    // Runs when client disconnects
    socket.on('disconnect', () => {
        io.emit('message', 'A user has left the chat.');
    });
    socket.on('chatMessage', (msg) => {
        io.emit('message', msg);
    });
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT , () => {
    console.log(`Server running on port ${PORT}`);
});