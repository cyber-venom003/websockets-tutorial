const chatForm = document.getElementById('chat-form');

const socket = io();

socket.on('message', message => {
  console.log(message);
  outputMessage(message);
});

chatForm.addEventListener('submit', e => {
  e.preventDefault();
  const message = e.target.elements.msg.value;
  // Sending a message to server
  socket.emit('chatMessage', message);
});

function outputMessage(message) {
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = `<div class="message">
  <p class="meta">Brad <span>9:12pm</span></p>
  <p class="text">
    ${message}
  </p>
</div>`;
document.querySelector('.chat-messages').appendChild(div);
}