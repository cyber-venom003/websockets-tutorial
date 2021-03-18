require('dotenv').config();

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE , {useNewUrlParser: true , useUnifiedTopology: true});

mongoose.connection.on('error', (err)=>{
    console.log('Mongoose connection Error: '+ err.message);
});

mongoose.connection.once('open' , ()=>{
    console.log("MongoDB Connected!");
});

//Bring in models
require('./models/Chatroom');
require('./models/User');
require('./models/Message');



const app = require('./app');

const server = app.listen(8000 , ()=> {
    console.log('Application running on Port 8000');
});

const io = require("socket.io")(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ["GET", "POST"],
        credentials: true
    }
});
const jwt = require('jwt-then');
const Message = mongoose.model("Message");
const User = mongoose.model("User");

io.use(async (socket , next) => {
    const token = socket.handshake.query.token;
    try {
        const token = socket.handshake.query.token;
        const payload = await jwt.verify(token, process.env.SECRET);
        socket.userId = payload.id;
        next();
    } catch (err){
        console.log(err);
    }
});

io.on('connection' , (socket) => {
    console.log(`WebSocket connected by ${socket.userId}`);
    socket.on('disconnect', () => {
        console.log(`WebSocket disconnected by ${socket.userId}`);
    });
    socket.on('joinRoom', ({chatRoomId}) => {
        socket.join(chatRoomId);
        console.log('A user has joined the room ' + chatRoomId);
    });
    socket.on('leaveRoom', ({chatRoomId}) => {
        socket.leave(chatRoomId);
        console.log('A user has left the room ' + chatRoomId);
    });
    socket.on('chatRoomMessage', async ({chatRoomId, message}) => {
        if (message.trim().length > 0){
            const user = await User.findOne({ _id: socket.userId });
            console.log('chatroom Id' + chatRoomId);
            const newMessage = new Message();
            newMessage.chatroom = chatRoomId;
            newMessage.user = socket.userId;
            newMessage.message = message;
            await newMessage.save();
            io.to(chatRoomId).emit("newMessage", {
                message: message,
                name: user.name,
                userId: socket.userId
            });
        }
    });
});