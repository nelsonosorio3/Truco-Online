import React, { useEffect, useState } from 'react';

import axios from 'axios';

import styles from './styles/FriendInfo.module.css';
import profileIcon from '../img/profileIcon.png';

import { useHistory } from "react-router-dom";
import socket from './socket';
import {useDispatch} from 'react-redux'
import { setIsInRoom } from '../Redux/actions-types/roomsActions';

export default function FriendInfo({ isOpen, close, name, date, email, id, image }) {
    const history = useHistory();

    const handleContainerClick = (e) => e.stopPropagation();
    
    const conditionalOpen = isOpen ? styles.isOpen : null;
    
    const dispatch = useDispatch();

    const [games, setGames] = useState([]);

    const wins = (games) => {
        var count = 0;
        games.forEach((game) => {if(game.winner === name) count++});
        return count;
    };

    const inviteToGame = () => {
        let idGenerator = Math.floor(Math.random()*100000);
        socket.emit("invite to game", idGenerator, id, localStorage.user);
        socket.emit('joinRoom', idGenerator, localStorage.user, null, null, true);
        dispatch(setIsInRoom({isInRoom: true, roomId: idGenerator}));
        history.push("/rooms");
    };

    const gamesInfo = (id, token) => {
        axios(`http://localhost:3001/api/games/games/${id}`, {
            headers: {
                "x-access-token": token,
            },
        })
        .then(response => {
            setGames(response.data.games);
        })
        .catch(error => console.log(error));
    };

    useEffect(() => {
        gamesInfo(id, localStorage.token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen]);

    return (
        <article className={styles.info + ' ' + conditionalOpen} onClick={close}>
            <div className={styles.container} onClick={handleContainerClick}>
                <button className={styles.close} onClick={close}> X </button>

                <div className={styles.cardImage} style={{backgroundImage: `url(${image})`}}></div>

                <div className={styles.cardText}>
                    <span className={styles.date}>
                        {date.split("T")[0]}
                    </span>
                    <h2> {name} </h2>
                    <p>{email}</p>
                    <h3 className={styles.partidasStats}>Partidas</h3>
                </div>
                <div className={styles.cardStats}>
                    <div className={styles.stat}>
                        <div className={styles.value}>{games.length}</div>
                        <div className={styles.type}>Jugadas</div>
                    </div>

                    <div className={styles.stat} style={{borderLeft: "2px solid #795548", borderRight: "2px solid #795548"}}>
                        <div className={styles.value}>{games? wins(games) : 'No data'}</div>
                        <div className={styles.type}>Ganadas</div>
                    </div>

                    <div className={styles.stat}>
                        <div className={styles.value}>{games? (games.length - wins(games)) : 'No data'}</div>
                        <div className={styles.type}>Perdidas</div>
                    </div>
                </div>

            </div>
        </article>
    );
};

