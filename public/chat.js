
var socket = io.connect('http://localhost:3000');


var  message = document.getElementById('message'),
      username = document.getElementById('username'),
      btn = document.getElementById('send'),
      output = document.getElementById('output'),
      error = document.getElementById('error');

// It emit the events
btn.addEventListener('click', ()=>{
  if((username.value && message.value != '')){
  socket.emit('chat',{
    username:username.value,
    message:message.value
  });
  message.value = '';
}else{
 error.style.border = '1px red solid';
  setTimeout(()=>{
    error.style.border = 'none';
  },200);
}
});

message.addEventListener('keypress',()=>{
    socket.emit('typing', username.value);
})

message.addEventListener('keyup',()=>{
    socket.emit('keyup');
})

// It listen when event happens
socket.on('chat',(data)=>{
    output.innerHTML += '<p><strong>' + data.username + ': </strong>' + data.message + '</p>';
});

socket.on('typing',(data)=>{
    feedback.innerHTML = '<p><em>' + data + ' typing...</em></p>';
});

socket.on('keyup',()=>{
  setTimeout(()=>{
    feedback.innerHTML = '';
  },1200);
})
