import React, { useState, useEffect } from 'react';
import WebSocket from 'ws';

const WebSocketClient = () => {
  const [ws, setWs] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [username, setUsername] = useState('');
//   const [token, setToken] = useState('');

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8081');

    socket.onopen = () => {
      console.log('Connected to the server');
      // send login credentials to associate socket with user
      socket.send(`login ${username}`);
    };

    socket.onmessage = (event) => {
      const message = event.data;
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    socket.onclose = () => {
      console.log('Disconnected from the server');
    };

    setWs(socket);
  }, [username]);

  const sendMessage = () => {
    if (ws && inputValue) {
      const messageData = { sender: username, recipient: 'recipient-username', message: inputValue };
      ws.send(JSON.stringify(messageData));
      setInputValue('');
    }
  };

  return (
    <div>
      <input
        type="text"
        id="messageInput"
        placeholder="Type a message..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>

      <div id="messages">
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
    </div>
  );
};