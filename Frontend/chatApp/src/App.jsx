import React, { useEffect, useState } from 'react';
import "./App.css";
import io from "socket.io-client";

const socket = io("https://8786-2401-4900-855c-f7e2-cc9d-dfa3-c5e4-fd14.ngrok-free.app");

export default function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendChat = (e) => {
    e.preventDefault();
    socket.emit("chat", { message, user: "Yash" });
    setMessage('');
  }

  useEffect(() => {
    socket.on("chat", (data) => {
      setChat(prevChat => [...prevChat, data]);
    });
    return () => socket.off("chat");
  }, []);

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>Chat App</h1>
        <div className="chat-container">
          {chat.map((data, index) => (
            <div key={index} className={`message ${data.user === "Yash" ? "self" : ""}`}>
              <div className="message-bubble">
                <span className="user-name">{data.user}</span>
                <p className="message-content">{data.message}</p>
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={sendChat}>
          <input 
            type="text" 
            name='chat' 
            placeholder='Send Chat' 
            value={message} 
            onChange={(e) => setMessage(e.target.value)} 
          />
          <button type='submit'>Send</button>
        </form>
      </header>
    </div>
  );
}
