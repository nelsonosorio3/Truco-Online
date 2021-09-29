import React, { useEffect, useState } from 'react';

import axios from 'axios';

import styles from './styles/FriendInfo.module.css';
import profileIcon from '../img/profileIcon.png';

export default function FriendInfo({ isOpen, close, name, date, email, id }) {

    const handleContainerClick = (e) => e.stopPropagation();
    const conditionalOpen = isOpen ? styles.isOpen : null;

    // hardcodeado de momento hasta que funcione la ruta
    const [state, setState] = useState({games: [{winner: 'pedro',loser: 'juan',},{winner: 'pedro',loser: 'pedro',},{winner: 'juan',loser: 'mati',},{winner: 'pedro',loser: 'pepe',},]});

    const { games } = state;

    const wins = (games) => {
        var count = 0;
        games.forEach((game) => {if(game.winner === 'pedro') count++});
        // games.forEach((game) => {if(game.winner === name) count++});
        return count;
    };

    // const gamesInfo = (id) => {
    //     axios(`http://localhost:3001/api/games/games/${id}`)
    //     .then(response => {
    //         console.log('aaa', response);
    //         setState(response);
    //     })
    //     .catch(error => console.log(error));
    // };

    // useEffect(() => {
    //     gamesInfo(id);
    // }, []);

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
                        <p>{state.games?.length || 'No data'}</p>
                        <div className={styles.playerInfo_Games}>
                            <h3> Ganadas: {state.games? wins(games) : 'No data'} </h3>
                            <h3> Perdidas: {state.games? (games.length - wins(games)) : 'No data'} </h3>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
};