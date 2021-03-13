const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages')
const roomName = document.getElementById('room-name');
const usersList = document.getElementById('users');

const {username , room} = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

console.log(username , room);

const socket = io();

// Join Chatroom
socket.emit('joinRoom' , {username , room});

socket.on('message', message => {
  console.log(message);
  outputMessage(message);

  //Scroll Down for every new message
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

//Get room and users
socket.on('roomUsers' , ({ room , users}) => {
  outputRoom(room);
  outputRoomUsers(users);
});

chatForm.addEventListener('submit', e => {
  e.preventDefault();
  const message = e.target.elements.msg.value;
  // Sending a message to server
  socket.emit('chatMessage', message);

  //Clear form after sending message and give focus
  e.target.elements.msg.value = '';
  e.target.elements.msg.focus();
});

function outputMessage(message) {
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = `<div class="message">
  <p class="meta">${message.username} <span>${message.time}</span></p>
  <p class="text">
    ${message.message}
  </p>
</div>`;
document.querySelector('.chat-messages').appendChild(div);
}

function outputRoom(room){
  roomName.innerText = room;
}

function outputRoomUsers(userList){
  usersList.innerHTML = `${userList.map(user => `<li>${user.username}</li>`).join('')}`;
}