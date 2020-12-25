const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const config = require('./config/index');
const { dbcon } = require('./helpers');

global.sqConn = dbcon.getSqlConnection(config.sql);
const routes = require('./routes');

const app = express();

app.use(cors());
app.set('views', path.join(__dirname, 'config'));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));
app.use(
  bodyParser.json({
    limit: '5mb'
  })
);
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: '5mb'
  })
);
app.use((req, res, next) => {
  req.header("Access-Control-Allow-Origin", "*");
  req.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  req.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  req.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

routes.initialize(app);

// app.use((req, res, next) => {
//   const err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

app.use((err, req, res, next) => {
  res.locals.error = err;
  const status = 500;
  res.status(status).send({ success: false, message: 'Internal Error Occured' });
});

let listenPort = process.env.PORT ? process.env.PORT : 7000;

const server = require('http').createServer(app);
var io = require('socket.io').listen(server);
let activeSockets = [];
io.on("connection", socket => {
  const existingSocket = activeSockets.find(
    existingSocket => existingSocket === socket.id
  );

  if (!existingSocket) {
    activeSockets.push(socket.id);

    socket.emit("update-user-list", {
      users: activeSockets.filter(
        existingSocket => existingSocket !== socket.id
      )
    });

    socket.broadcast.emit("update-user-list", {
      users: [socket.id]
    });
  }

  socket.on("call-user", (data) => {
    socket.to(data.to).emit("call-made", {
      offer: data.offer,
      socket: socket.id
    });
  });

  socket.on("make-answer", data => {
    socket.to(data.to).emit("answer-made", {
      socket: socket.id,
      answer: data.answer
    });
  });

  socket.on("reject-call", data => {
    socket.to(data.from).emit("call-rejected", {
      socket: socket.id
    });
  });

  socket.on("disconnect", () => {
    this.activeSockets = activeSockets.filter(
      existingSocket => existingSocket !== socket.id
    );
    socket.broadcast.emit("remove-user", {
      socketId: socket.id
    });
  });

  socket.on('join', function (data) {
    //joining
    socket.join(data.room);

    console.log(data.user + 'joined the room : ' + data.room);

    socket.broadcast.to(data.room).emit('new user joined', { user: data.user, message: 'has joined this room.' });
  });


  socket.on('leave', function (data) {

    console.log(data.user + 'left the room : ' + data.room);

    socket.broadcast.to(data.room).emit('left room', { user: data.user, message: 'has left this room.' });

    socket.leave(data.room);
  });

  socket.on('message', function (data) {

    io.in(data.room).emit('new message', { user: data.user, message: data.message });
  })
});

// io.on("connection", socket => {
//   socket.on("screenCaptureOffer", message => {
//     console.log(message);
//     io.emit("screenCaptureOffer", message);
//   });
//   socket.on("screenCaptureAnswer", message => {
//     io.emit("screenCaptureAnswer", message);
//   });
// });

// io.on('connection',(socket)=>{

//     console.log('new connection made.');


//     socket.on('join', function(data){
//       //joining
//       socket.join(data.room);

//       console.log(data.user + 'joined the room : ' + data.room);

//       socket.broadcast.to(data.room).emit('new user joined', {user:data.user, message:'has joined this room.'});
//     });


//     socket.on('leave', function(data){

//       console.log(data.user + 'left the room : ' + data.room);

//       socket.broadcast.to(data.room).emit('left room', {user:data.user, message:'has left this room.'});

//       socket.leave(data.room);
//     });

//     socket.on('message',function(data){

//       io.in(data.room).emit('new message', {user:data.user, message:data.message});
//     })
// });

server.listen(listenPort);


// http://localhost:7000/images/1600313812407.jpg