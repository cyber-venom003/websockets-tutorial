const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const messageFormatter = require('./utils/messages');
const {userJoin , getCurrentUser, leftUser , getRoomUsers} = require('./utils/users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, 'public')));

//Runs when a new websocket connection is opened
io.on('connection' , socket => {
    console.log('New websocket connected');

    socket.on('joinRoom' , ({username , room}) => {
        const user = userJoin(socket.id , username , room);
        socket.join(user.room);
        // Welcome current user
        socket.emit('message', messageFormatter('Chatcord bot' , 'Welcome to ChatCord'));          // This will send message to client

        // Broadcast when a user connects
        socket.broadcast.to(user.room).emit('message' , messageFormatter('Chatcord bot' , `${user.username} has joined the room`)); // This will send message to all connections to websocket except the client
        // Use io.emit(); to send all clients to websocket

        //Send users and room info
        io.to(user.room).emit('roomUsers' , {
            room: user.room,
            users: getRoomUsers(user.room),
        });
    });

    socket.on('chatMessage', (msg) => {
        const user = getCurrentUser(socket.id);
        io.to(user.room).emit('message', messageFormatter(user.username , msg));
    });

    // Runs when client disconnects
    socket.on('disconnect', () => {
        const disconnectedUser = leftUser(socket.id);
        io.to(disconnectedUser.room).emit('message', messageFormatter('Chatcord bot' , `${disconnectedUser.username} has left the chat.`));
        io.to(disconnectedUser.room).emit('roomUsers' , {
            room: disconnectedUser.room,
            users: getRoomUsers(disconnectedUser.room),
        });
    });

});

const PORT = 3000 || process.env.PORT;

server.listen(PORT , () => {
    console.log(`Server running on port ${PORT}`);
});