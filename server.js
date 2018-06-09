const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const socketIO = require('socket.io');

// our localhost port
const port = 4001;
const  conString="mongodb://admin:admin@ds038319.mlab.com:38319/mylearning";
let Chats = mongoose.model("Chats", {

    user_id: String,
    id: String,
    chat: String

});
const app = express();

// our server instance
const server = http.createServer(app);

// This creates our socket using the instance of the server
const io = socketIO(server);

mongoose.connect(conString, { useMongoClient: true }, (err) => {

    console.log("Database connection", err)

});


server.post("/chats", async (req, res) => {

    try {

        let chat = new Chats(req.body);

        await chat.save();

        res.sendStatus(200);
        //Emit the event

        io.emit("recive_message", req.body);

    } catch (error) {

        res.sendStatus(500);

        console.error(error);

    }

});
server.get("/chats", (req, res) => {

    Chats.find({}, (error, chats) => {

        res.send(chats);

    })

});
// This is what the socket.io syntax is like, we will work this later
io.on('connection', socket => {
    console.log('User connected');

socket.on('disconnect', () => {
    console.log('user disconnected');
});

    // just like on the client side, we have a socket.on method that takes a callback function
  /*  let index=0;*/
socket.on('send_message', (message) => {
    // once we get a 'change color' event from one of our clients, we will send it to the rest of the clients
    // we make use of the socket.emit method again with the argument given to use from the callback function above

    let msg={
        text:message.text,
        id:0,
        user_id:message.user_id
    }

    io.emit('recive_message', msg)
});
});
server.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});
server.listen(port, () => console.log(`Listening on port ${port}`))