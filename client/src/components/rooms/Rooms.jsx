import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'

import Chat from '../Chat';

import JoinRoomForm from './JoinRoomForm';
import RoomsList from './RoomsList';

export default function Rooms() {
<<<<<<< HEAD
  console.log("localStorage in Rooms", localStorage)
=======

  const isinRoom = useSelector(store => store.roomsReducer.isInRoom);
  const roomId = useSelector(store => store.roomsReducer.roomId)

>>>>>>> 36ea982a917bf9cf93adf9880a80f2e19d5fac58
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


