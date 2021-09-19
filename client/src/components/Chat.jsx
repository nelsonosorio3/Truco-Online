import React, {useState, useEffect, useRef} from 'react';
import socket from './socket';
import styles from './styles/Chat.module.css'


export default function Chat ({name, roomId}) {
    const [msg, setMsg] = useState('');
    const [msgs, setMsgs] = useState([]);

    useEffect(() => {
        socket.emit('connected', name);
    }, [name])

    useEffect(() => {
        socket.on('messages', (message) => {
            console.log(message)
            setMsgs([...msgs, message]);
        })

        return () => {socket.off()}
    }, [msgs])

    const divRef = useRef(null);

    useEffect(() => {
        divRef.current.scrollIntoView({behavior: 'smooth'})
    })

    const submit = (event) => {
        event.preventDefault();
        socket.emit('message', ({name, msg, roomId}));
    }

    return(
        <div>
            <div className={styles.chat}>
                {msgs.map((element, i) => ( <div key={i}><div>{element.name}</div><div>{element.msg}</div></div> ))}
                <div ref={divRef}></div>
            </div>
            <form onSubmit={submit}>
                <label htmlFor="">Write your message</label>
                <textarea name="" id="" cols="30" rows="10" value={msg} onChange={event => setMsg(event.target.value)}></textarea>
                <button>Send</button>
            </form>
        </div>
    )
}