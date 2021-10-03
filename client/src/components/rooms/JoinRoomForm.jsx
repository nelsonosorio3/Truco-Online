import React, {useState} from 'react';
import {useDispatch} from 'react-redux'

import { setIsInRoom } from '../../Redux/actions-types/roomsActions';
import socket from '../socket';
import styles from './styles/JoinRoomForm.module.css'

export default function JoinRoomForm (){
    const dispatch = useDispatch()
    console.log(typeof localStorage.token)

    const joinRoom = async (event) => {
      event.preventDefault();
      let idGenerator = Math.floor(Math.random()*100000)
      socket.emit('joinRoom', (idGenerator), localStorage.user)
      socket.on("fullRoom", (bool)=>setIsInRoom(bool))
      dispatch(setIsInRoom({isInRoom: true, roomId: idGenerator}))
    }
 
    return(
      <div>
        <form onSubmit={joinRoom}>
          <button type='submit' className={styles.btn}>Crear nueva sala</button>
        </form>
      </div>
    )

}