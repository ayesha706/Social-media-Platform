import React, { useState, useEffect } from 'react';

export const WebSocketClient = () => {
  const [ws, setWs] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8081');

    socket.onopen = () => {
      console.log('Connected to the server');
    };

    socket.onmessage = (event) => {
      const message = event.data;
      setMessages(prevMessages => [...prevMessages, message]);

      if (Notification.permission === 'granted') {
        new Notification('New message', {
          body: message,
        });
      }
    };

    socket.onclose = () => {
      console.log('Disconnected from the server');
    };

    setWs(socket);

    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }

  
  }, []);

  const sendMessage = () => {
    if (ws && inputValue) {
      ws.send(inputValue);
      setInputValue(''); 
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={messages}
          onChange={(e) => setMessages(e.target.value)}
        />
        <button onClick={() => sendMessage('user2')}>Send to User 2</button>
      </div>
      <div>       
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
    </div>
  );
};
