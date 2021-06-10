const express = require('express');
const app = require('express')();

const socket = require('socket.io');

app.use(express.static('public'));

app.get('/',(req,res)=>{
  res.render('index.html');
});

const server = app.listen(3000,()=>{
  console.log('Listening on http://localhost:'+3000);
})
const io = socket(server);
io.on('connection',(socket)=>{
  console.log('connection made with ', socket.id);

   socket.on('chat',(data)=>{
     io.emit('chat',data);
   });

   // Handle typing event
   socket.on('typing',(data)=>{
     socket.broadcast.emit('typing', data);
   });

   socket.on('keyup',()=>{
     socket.broadcast.emit('keyup');
   });
})
