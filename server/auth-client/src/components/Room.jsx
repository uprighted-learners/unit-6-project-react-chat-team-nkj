import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Rooms = () => {
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
        setRooms(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRooms();
  }, []);

  const handleRoomClick = (roomId) => {
    navigate(`/rooms/${roomId}`);
  };

  return (
    <div>
      <h2>Available Rooms</h2>
      <ul>
        {rooms.map((room) => (
          <li key={room._id} onClick={() => handleRoomClick(room._id)}>
            {room.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Rooms;