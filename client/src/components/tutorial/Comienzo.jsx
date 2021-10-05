/* eslint-disable jsx-a11y/alt-text */
import React from 'react';

import game from '../../img/game.webp'

import styles from './styles/Comienzo.module.css'

function Comienzo() {
    const intro = 'En el “truco”, hay dos formas de jugarse los puntos: al envido y/o al truco_ Cada uno de estos te dara puntos dependiendo lo apostado en cada mano_ El objetivo del juego es llegar a los 15 o 30 puntos.'    
    
    return (
        <div className={styles.board}>
            <div className={styles.title}>
                <p>{intro}</p>
            </div>  
            <img src={game} className={styles.game}/>
        </div>
    );
};

export default Comienzo;