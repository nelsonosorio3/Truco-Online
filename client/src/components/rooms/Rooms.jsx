import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'

import Chat from '../Chat';

import JoinRoomForm from './JoinRoomForm';
import RoomsList from './RoomsList';

export default function Rooms() {
  console.log("localStorage in Rooms", localStorage)

  const isinRoom = useSelector(store => store.roomsReducer.isInRoom);
  const roomId = useSelector(store => store.roomsReducer.roomId)

  return (
    <div>{console.log(isinRoom, roomId)}
      {
        isinRoom
        ?
        <Chat roomId={roomId} />
        :
        <div>
          <JoinRoomForm />
          <RoomsList />
        </div>
      }
    </div>
  );
}


