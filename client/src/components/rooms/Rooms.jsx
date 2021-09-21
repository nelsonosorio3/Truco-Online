import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'

import styles from './styles/Rooms.module.css'

import Chat from './Chat';
import NavBar from '../NavBar';

import JoinRoomForm from './JoinRoomForm';
import RoomsList from './RoomsList';

export default function Rooms() {
  console.log("localStorage in Rooms", localStorage)

  const isinRoom = useSelector(store => store.roomsReducer.isInRoom);
  const roomId = useSelector(store => store.roomsReducer.roomId)

  return (
    <div className={styles.mainDiv}>
      <NavBar />
      {
        isinRoom
        ?
        <Chat roomId={roomId} />
        :
        <div className={styles.subMainDiv}>
          <div className={styles.lobby}>
            <div className={styles.div_Chat_Rooms}>
              <Chat typeofChat={'chatLobby'}/>
              <div className={styles.div_CreateRoom_RoomsList}>
                <JoinRoomForm />
                <RoomsList />
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  );
}


