import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Rooms.css";

const Rooms = ({ setRoomId }) => {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:8080/api/rooms", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        console.log(data)
        setRooms(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRooms();
  }, []);

  const handleRoomClick = (roomId) => {
    setRoomId(roomId);
    navigate(`/rooms/${roomId}`);
  };

  return (
    <div className="rooms-container">
      <h2>Available Rooms</h2>
      <ul className="rooms-list">
        {rooms.map((room) => (
          <li key={room._id}>
            {room.name}
            <button onClick={() => handleRoomClick(room._id)}>Join Room</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Rooms;