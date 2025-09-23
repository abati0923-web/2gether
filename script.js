
const socket = io();

function loadVideo() {
  const url = document.getElementById('video-url').value;
  const videoId = new URL(url).searchParams.get("v");
  const iframe = \`<iframe src="https://www.youtube.com/embed/\${videoId}?enablejsapi=1" frameborder="0" allowfullscreen></iframe>\`;
  document.getElementById('video-container').innerHTML = iframe;
  socket.emit('video control', { action: 'load', videoId });
}

function sendMessage() {
  const input = document.getElementById('m');
  socket.emit('chat message', input.value);
  input.value = '';
}

socket.on('chat message', (msg) => {
  const li = document.createElement('li');
  li.textContent = msg;
  document.getElementById('messages').appendChild(li);
});

document.getElementById('stars').addEventListener('click', () => {
  socket.emit('rating', '⭐');
});

socket.on('rating', (data) => {
  alert('Un utilisateur a noté : ' + data);
});
