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

app.listen(8000 , ()=> {
    console.log('Application running on Port 8000');
});