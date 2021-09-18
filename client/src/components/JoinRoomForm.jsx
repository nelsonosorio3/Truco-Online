import React, { useContext, useState, useEffect } from 'react';
import Chat from './Chat';
import socket from './socket';

export default function JoinRoomForm (){
    const [roomName, setRoomName] = useState('');
    const [isJoining, setIsJoining] = useState(false);
    const [isInRoom, setIsInRoom] = useState(false)
    
    const handleRoomNameChange = (event) => {
      const value = event.target.value;
      setRoomName(parseInt(value))
    }
    
    const joinRoom = async (event) => {
      event.preventDefault();
      socket.emit('joinRoom', (roomName))
      setIsInRoom(true);
      setIsJoining(false); 
    }

    return(
      <div>
        {
          isInRoom 
          ? 
            <Chat roomId={roomName}/>
          :
            <form onSubmit={joinRoom}>
                    <h4>Enter room ID to join the game</h4>
                    <input placeholder={'Room ID'} value={roomName} onChange={handleRoomNameChange} />
                    <button type='submit' disabled={isInRoom}>{isJoining ? 'Joining...' : 'Join'}</button>
            </form>
        }
      </div>
    )

}