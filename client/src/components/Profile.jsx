import React from 'react';

import styles from './styles/Profile.module.css'
import profileIcon from '../img/profileIcon.png'

export default function Profile() {

    return(
        <div className={styles.mainDiv}>
            <div className={styles.player}>
                <img src={profileIcon} alt="" className={styles.profileIcon}/>
                <div className={styles.playerInfo}>
                    <h2>Username</h2>
                    <h3>Games played: n</h3>
                    <h3>Games won: n</h3>
                </div>
            </div>
        </div>
    )
}