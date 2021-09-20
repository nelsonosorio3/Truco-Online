import React, { useContext, useState, useEffect } from 'react';

import Chat from '../Chat';
import socket from '../socket';

export default function JoinRoomForm (){
    const [roomId, setRoomId] = useState();
    const [isJoining, setIsJoining] = useState(false);
    const [isInRoom, setIsInRoom] = useState(false)
    
    // const handleRoomNameChange = (event) => {
    //   const value = event.target.value;
    //   setRoomName(parseInt(value))
    // }
    
    const joinRoom = async (event) => {
      event.preventDefault();
      let idGenerator = Math.floor(Math.random()*100000)
      setRoomId(idGenerator)
      socket.emit('joinRoom', (idGenerator))
      setIsInRoom(true);
      setIsJoining(false);
    }

    return(
      <div>
        {
          isInRoom 
          ? 
            <Chat roomId={roomId}/>
          :
          <div>
            {/* <h2>Create new room</h2> */}
            <form onSubmit={joinRoom}>
                    {/* <h4>Enter room ID to join the game</h4>
                    <input placeholder={'Room ID'} value={roomName} onChange={handleRoomNameChange} /> */}
                    <button type='submit' disabled={isInRoom}>{isJoining ? 'Joining...' : 'Create new room'}</button>
            </form>
          </div>
        }
      </div>
    )

}