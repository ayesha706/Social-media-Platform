const express = require('express');
const app = express();
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8081 });
const users = {}; // store user information (e.g., username, socket)

// user authentication (simplified example)
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  // authenticate user and store in memory
  const user = { id: 1, username, socket: null };
  users[username] = user;
  res.json({ token: 'some-token' });
});

wss.on('connection', (socket) => {
  console.log('Client connected');

  // associate socket with user
  socket.on('login', (username) => {
    users[username].socket = socket;
  });

  socket.on('message', (message) => {
    console.log('Received message:', message);
    // broadcast message to intended recipient
    const recipientUsername = message.recipient;
    if (users[recipientUsername] && users[recipientUsername].socket) {
      users[recipientUsername].socket.send(message);
    }
  });

  socket.on('close', () => {
    console.log('Client disconnected');
  });

  socket.on('error', (error) => {
    console.error('WebSocket error:', error);
  });
});