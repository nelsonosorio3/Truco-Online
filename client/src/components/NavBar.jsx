import React from 'react';
import { Link } from 'react-router-dom';

import styles from './styles/NavBar.module.css'

export default function NavBar(){

    return(
        <nav className={styles.mainDiv}>
            <Link to='/rooms' className={styles.a}>Lobbys</Link>
            <Link to='profile' className={styles.a}>My Profile</Link>
        </nav>
    );
};