import React, { useContext, useState } from 'react';
import gameContext from '../gameContext';
import gameService from '../services/gameService';
import socketService from '../services/socketService';

interface IJoinRoomProps {}

export default function JoinRoomForm (props: IJoinRoomProps){
    const [roomName, setRoomName] = useState('');
    const [isJoining, setIsJoining] = useState(false);

    const {setInRoom, isInRoom} = useContext(gameContext)

    const handleRoomNameChange = (event: React.ChangeEvent<any>) => {
        const value = event.target.value;
        setRoomName(value)
    }

    const joinRoom = async (event: React.FormEvent) => {
      event.preventDefault();

      const socket = socketService.socket;
      if(!roomName || roomName.trim() === '' || !socket) return console.log(socket);
      
      setIsJoining(true);

      const joined = await gameService.joinGameRoom(socket, roomName).catch((error) => {
        alert(error);
      });

      if(joined) setInRoom(true);

      setIsJoining(false); 
    }

    return(
        <form onSubmit={joinRoom}>
                <h4>Enter room ID to join the game</h4>
                <input placeholder={'Room ID'} value={roomName} onChange={handleRoomNameChange} />
                <button type='submit' disabled={isJoining}>{isJoining ? 'Joining...' : 'Join'}</button>
        </form>
    )

}