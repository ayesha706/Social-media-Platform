import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
const socket = io('http://localhost:9000');

export const WebSocketClient = () => {
  const [ws, setWs] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
// WebSockets
  // useEffect(() => {
  //   const socket = new WebSocket('ws://localhost:8081');

  //   socket.onopen = () => {
  //     console.log('Connected to the server');
  //   };

  //   socket.onmessage = (event) => {
  //     const message = event.data;
  //     setMessages(prevMessages => [...prevMessages, message]);

  //     if (Notification.permission === 'granted') {
  //       new Notification('New message', {
  //         body: message,
  //       });
  //     }
  //   };

  //   socket.onclose = () => {
  //     console.log('Disconnected from the server');
  //   };

  //   setWs(socket);

  //   if (Notification.permission !== 'granted') {
  //     Notification.requestPermission();
  //   }
  //   return () => {
  //     socket.close();
  //   };

  // }, []);
  // const sendMessage = () => {
  //   if (ws && inputValue) {
  //     ws.send(inputValue);
  //     setInputValue('');
  //   }
  // };
  //Socket.io
  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
    return () => {
      socket.off('message');
    };
  }, []);
  const handleSendMessage = () => {
    socket.emit('user-message', inputValue);
    setInputValue('');
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
    {/* <button onClick={sendMessage}>Send</button> */}
    <button onClick={handleSendMessage}>Send</button>
    <div id="messages">
      {messages.map((message, index) => (
        <div key={index}>{message}</div>
      ))}
    </div>
  </div>
  );
};
