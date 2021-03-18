const mongoose = require('mongoose');
const Chatroom = require('../models/Chatroom');

exports.createChatroom = async (req , res) => {
    const {name} = req.body;

    const nameRegex = /^[A-Za-z\s]+$/;

    if (!nameRegex.test(name)) throw "Chatroom name can only contains alphabets.";

    const chatroomExists = await Chatroom.findOne({name});

    if(chatroomExists) throw "Chatroom with same name already exists";

    const chatroom = new Chatroom({
        name,
    });

    await chatroom.save();

    res.json({
        message: "Chatroom created",
    })

}

exports.getAllChatrooms = async (req , res) => {
    const chatrooms = await Chatroom.find({});
    res.json(chatrooms);
}