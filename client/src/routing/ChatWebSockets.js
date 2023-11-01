import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

function ChatWebSockets() {
    const socket = io('http://localhost:5000');
    console.log(Math.random().toString(36).substring(2, 12))
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const handleSendMessage = () => {
        socket.emit('chat_message', message);
        setMessage('');
    };
    useEffect(() => {
        socket.on('chat_message', (message) => {
            console.log('message ', message)
            setMessages((prevMessages) => [...prevMessages, message]);
        });
    }, []);
    return (
        <div>
            <ul>
                {messages.map((msg, index) => (
                    <li key={index}>{msg}</li>
                ))}
            </ul>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={handleSendMessage}>Send</button>
        </div>
    );
}

export default ChatWebSockets





