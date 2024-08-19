const express = require( 'express');
require('dotenv').config();
const { connectDB } = require('./configDB/db.js');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes.js');
const postRoutes = require('./routes/postRoutes.js');

const cors = require('cors');
const WebSocket = require('ws');
const app = express();

app.use(cors());
app.use(bodyParser.json());
const path = require('path')
app.use('/api', express.static(path.join(__dirname, 'files')))

app.use('/api', authRoutes);
app.use('/api/posts', postRoutes);

const port = process.env.PORT || 8000
const wsServerPort = 8081;
const wsServer = new WebSocket.Server({ port: wsServerPort });

wsServer.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('message', (message) => {
    console.log('Received:', message);
    socket.send('Message received: ' + message);
  });

  socket.on('close', () => {
    console.log('Client disconnected');
  });

  socket.on('error', (error) => {
    console.error('WebSocket error:', error);
  });
});


connectDB().then((res) => {
    app.listen(port , () => { console.log(`Server started in port ${port}`) })
}).catch((err) => console.log('err', err))

