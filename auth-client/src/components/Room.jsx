import React, { useState, useEffect } from "react";
import "./Room.css";

const Room = ({ roomId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:8080/api/messages/${localStorage.getItem("roomId")}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log(data);
      ; setMessages(data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {

    fetchMessages();
  }, [roomId]);

  const handleSendMessage = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:8080/api/messages/${roomId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ body: newMessage }),
      });
      const data = await response.json();
      await fetchMessages();
      setNewMessage("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent default form submission
      handleSendMessage();
    }
  };

  return (
    <div className="room-container">
      <h2>Chat Room</h2>
      <div className="messages-container">
        {messages.map((message) => (
          <p key={message._id}>
            <strong>{message.user.firstName + " " + message.user.lastName}:</strong> {message.body}
          </p>
        ))}
      </div>
      <div className="message-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Room;