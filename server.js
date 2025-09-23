
const express = require('express');
const path = require('path');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {
  console.log('Un utilisateur connecté');

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('video control', (data) => {
    socket.broadcast.emit('video control', data);
  });

  socket.on('rating', (data) => {
    io.emit('rating', data);
  });

  socket.on('disconnect', () => {
    console.log('Utilisateur déconnecté');
  });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
