import { useEffect, useState } from 'react'

import './App.css'
import { Route, Routes, Navigate } from 'react-router-dom'
import Auth from './components/Auth/Auth';
import Rooms from './components/Rooms';
import Room from './components/Room';


function App() {
  const [token, setToken] = useState("")
  const [roomId, setRoomId] = useState("")


  const updateToken = (passedToken, uid) => {
    localStorage.setItem('token', passedToken)
    localStorage.setItem('uid', uid)
    setToken(passedToken)
  };

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('uid')
    setToken("")
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    const storedUid = localStorage.getItem('uid')
    if (storedToken) {
      setToken(storedToken)
    }
  }
    , []);

  useEffect(() => {
    const storedRoomId = localStorage.getItem('roomId')
    if (storedRoomId) {
      setRoomId(storedRoomId)
    }
  }, []);

  return (
    <>
      {token && (
        <button onClick={handleLogout}>Logout</button>

      )}



      <Routes>

        <Route path="/" element={
          !token ? (
            <Auth updateToken={updateToken} />
          ) : (
            <>
              <Navigate to="/rooms" />


            </>
          )}
        />
        <Route path='/rooms' element={token ? <Rooms setRoomId={setRoomId} /> : <Navigate to="/" />} />

        <Route path="/rooms/:roomId" element={token ? <Room roomId={roomId} /> : <></>} />

      </Routes>
    </>
  );
}






export default App
