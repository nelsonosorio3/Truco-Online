import React, {useState, useEffect } from 'react';

import socket from '../socket';
import Chat from '../Chat';

export default function RoomsList(){
    // const allRooms = useSelector(store => store.roomsReducer.rooms);
    const [allRooms, setAllRooms] = useState([])
    const [isInRoom, setIsInRoom] = useState(false)
    const [roomId, setRoomId] = useState('')

    useEffect(() => {
        socket.on('showActiveRooms', (rooms) => {
            setAllRooms([rooms]);
        })

        return () => {socket.off()}
    }, [allRooms])

    const updateRooms = (event) => {
        event.preventDefault();
        socket.emit('bringActiveRooms');
    }

    const joinRoom = async (event) => {
        event.preventDefault();
        setRoomId(parseInt(event.target[0].innerText))
        console.log(roomId)
        socket.emit('joinRoom', (parseInt(event.target[0].innerText)))
        setIsInRoom(true);
      }

    return(
        <div>
            {
            isInRoom
            ? 
              <Chat roomId={roomId}/>
            :
                <div>
                    <form onSubmit={updateRooms}>
                        <button type='submit'>Update Rooms</button>
                    </form>
                    {
                        allRooms.length > 0
                        ?
                            allRooms[0].activeRooms.map(room => 
                                <div key={room}>
                                    <form onSubmit={joinRoom}>
                                        <button type='submit' disabled={isInRoom} value={room}>{room}</button>
                                    </form>
                                </div>)
                        :
                        <></>
            }
                </div>
            }
        </div>
    )
}