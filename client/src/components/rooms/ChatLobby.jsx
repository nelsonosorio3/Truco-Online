/* eslint-disable no-unused-vars */
import React, {useState, useEffect, useRef} from 'react';
import socket from '../socket';
import styles from './styles/Chat.module.css'

export default function ChatLobby ({name, roomId, typeofChat}) {
    const [msg, setMsg] = useState('');
    const [msgs, setMsgs] = useState([]);

    useEffect(() => {
        if(roomId === 'lobby') socket.emit('joinToGlobalChat', roomId);
    }, [roomId])

    useEffect(() => {
        socket.on('lobbyMessages', () => {
            console.log('ENTRAMOS A MENSAJES')
            // console.log(message);
            // setMsgs([...msgs, message]);
        })

        return () => {socket.off("lobyMessages")}
    }, [msgs])

    const divRef = useRef(null);

    useEffect(() => {
        divRef.current.scrollIntoView({behavior: 'smooth'});
    })

    const submit = (event) => {
        event.preventDefault();
        socket.emit('message', ({name, msg, roomId}), localStorage.isAuth);
        setMsg("");
    }

    return(
        <div>
            <div className={typeofChat==='chatLobby' ? styles.chatLobby : styles.chatGame}>
                {msgs.map((element, i) => ( <div key={i}><div>{element.name}</div><div>{element.msg}</div></div> ))}
                <div ref={divRef}></div>
            </div>
            <form onSubmit={submit} className={styles.writeMessage}>
                {
                    typeofChat==='chatLobby'
                    ? 
                    <>
                        <textarea placeholder={'Message...'} name="" id="" cols="95" rows="1" value={msg} onChange={event => setMsg(event.target.value)}></textarea>
                        <button className={styles.btn}>Send</button>
                        {/* <input placeholder='Message...' type="text" id="" cols="95" rows="1" value={msg} onChange={event => setMsg(event.target.value)}></input> */}
                    </>
                    : 
                    <input type="text" id="" cols="31" rows="1" value={msg} onChange={event => setMsg(event.target.value)} className={styles.writeMessageGame}></input>
                }
                
            </form>
        </div>
    )
}