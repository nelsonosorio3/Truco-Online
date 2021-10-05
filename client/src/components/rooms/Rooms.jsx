import React from 'react';
import {useSelector} from 'react-redux'
// import { useHistory } from "react-router-dom";
import Game from '../game';
import GameRequest from '../GameRequest';


import styles from './styles/Rooms.module.css'

import NavBar from '../NavBar';

import JoinRoomForm from './JoinRoomForm';
import RoomsList from './RoomsList';
import ChatLobby from './ChatLobby';

// import socket from '../socket';

export default function Rooms() {
  console.log("localStorage in Rooms", localStorage)
  // const history = useHistory()

  let isinRoom = useSelector(store => store.roomsReducer.isInRoom);
  // const roomId = useSelector(store => store.roomsReducer.roomId)

  
  // socket.on("roomFull", ()=>isinRoom= false)
  return (
    <div className={styles.mainDiv}>
      
      {
        isinRoom
        ?
        // <div className={styles.subMainDiv_inGame}>
        //   <div className={styles.game}>
        //     <Chat roomId={roomId} typeofChat={'chatGame'}/>
        //   </div>
        // </div>
        // history.push("/game")
        <Game/>
        :
        <>
        <NavBar />
        <div style={{zIndex:"999"}}>
        <GameRequest/>
        </div>
        <div className={styles.subMainDiv_noGame}>
          <div className={styles.lobby}>
            <h2 className={styles.title}>Bienvenidos a Truco Henry</h2>
            <div className={styles.div_Chat_Rooms}>  
              {/* <Chat typeofChat={'chatLobby'} roomId={'lobby'} name={localStorage.user}/> */}
              <ChatLobby typeofChat={'chatLobby'} roomId={'lobby'} name={localStorage.user} />
              <div className={styles.div_CreateRoom_RoomsList}>
                <JoinRoomForm />
                <RoomsList />
              </div>
            </div>
          </div>
        </div>
        </>
      }
    </div>
  );
}


