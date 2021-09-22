import React, {useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'

import { setIsInRoom } from '../../Redux/actions-types/roomsActions';
import socket from '../socket';
import styles from './styles/RoomsList.module.css'

export default function RoomsList(){
    const [allRooms, setAllRooms] = useState([])
    const [roomId, setRoomId] = useState('')
    const dispatch = useDispatch()

    useEffect(() => {
        socket.on('showActiveRooms', (rooms) => {
            setAllRooms([rooms]);
        })
        // socket.emit('bringActiveRooms') //automaticamente hacer update de rooms cuando hay cambios en allRooms?

        return () => {socket.off()}
    }, [allRooms])

    const updateRooms = (event) => {
        event.preventDefault();
        socket.emit('bringActiveRooms'); 
    }

    const joinRoom = async (event) => {
        event.preventDefault();
        socket.emit('joinRoom', (parseInt(event.target[0].innerText)))
        dispatch(setIsInRoom({isInRoom: true, roomId: parseInt(event.target[0].innerText)}))
      }

    return(
        <div>
            <form onSubmit={updateRooms}>
                <button type='submit' className={styles.btn} >Update Rooms</button>
            </form>
            <div className={styles.roomsList}>
                {
                allRooms.length > 0
                ?
                    allRooms[0].activeRooms.map(room => 
                    <div key={room}>
                        <form onSubmit={joinRoom}>
                            <button type='submit' value={room} className={styles.roomBtn} >{room}</button>
                        </form>
                    </div>)
                :
                    <></>
                }
            </div>
        </div>
    )
}