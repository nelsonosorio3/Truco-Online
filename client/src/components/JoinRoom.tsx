import React, {useEffect, useState} from 'react';
import {io} from 'socket.io-client'
import socketService from '../services/socketService';
import GameContext, { IGameConetxtProps } from '../gameContext';
import JoinRoomForm from './JoinRoomForm';

export default function JoinRoom() {
  const [isInRoom, setInRoom] = useState(false)

  const connectSocket = async () => {
    const socket = await socketService.connect('http://localhost:9000').catch((error) => {
      console.log('Error:', error);
    });
  };

  useEffect(() => {
    connectSocket();
  }, [])

  const gameContextValue: IGameConetxtProps = {
    isInRoom,
    setInRoom
  }

  return (
    <GameContext.Provider value={gameContextValue}>
          <JoinRoomForm />
    </GameContext.Provider>
  );
}


