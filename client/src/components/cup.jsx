import React from 'react';
import styles from './styles/cup.module.css'

const Cup = ({username , pos , won }) => {

    return (
        <div className={styles.cupCard}>
            <div className={styles.name}>
                {username} <br />
                Ganados: {won} 
            </div>
            <h3 className={styles.pos}>{pos}</h3>
        </div>
    )
}

export default Cup
