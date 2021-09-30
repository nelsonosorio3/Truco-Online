import React, { useEffect, useState } from 'react';

import axios from 'axios';

import styles from './styles/FriendInfo.module.css';
import profileIcon from '../img/profileIcon.png';

export default function FriendInfo({ isOpen, close, name, date, email, id }) {

    const handleContainerClick = (e) => e.stopPropagation();
    const conditionalOpen = isOpen ? styles.isOpen : null;

    const [games, setGames] = useState([]);

    const wins = (games) => {
        var count = 0;
        games.forEach((game) => {if(game.winner === name) count++});
        return count;
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
    }, [isOpen]);

    return (
        <article className={styles.info + ' ' + conditionalOpen} onClick={close}>
            <div className={styles.container} onClick={handleContainerClick}>
                <button className={styles.close} onClick={close}> X </button>
                <div className={styles.player}>
                    <img src={profileIcon} alt="" className={styles.profileIcon} />
                    <p> Amigos desde: {date.split("T")[0]} </p>
                    <div className={styles.playerInfo}>
                        <h2> {name} </h2>
                        <h3> {email} </h3>
                        <h3> Partidas Jugadas: </h3>
                        <p>{games.length}</p>
                        <div className={styles.playerInfo_Games}>
                            <div className={styles.infoGames}>
                                <h3> Ganadas: </h3>
                                <p>{games? wins(games) : 'No data'}</p>
                            </div>    
                            <div className={styles.infoGames}>
                                <h3> Perdidas: </h3>
                                <p>{games? (games.length - wins(games)) : 'No data'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
};