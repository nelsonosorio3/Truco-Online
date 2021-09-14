import React from 'react';
import styles from './styles/NavBar.module.css'

export default function NavBar(){

    return(
        <div className={styles.mainDiv}>
            <a href='#0' className={styles.a}>Lobbys</a>
            <a href='#0' className={styles.a}>My Profile</a>
        </div>
    )
}