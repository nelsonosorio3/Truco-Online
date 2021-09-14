import React from 'react';
import { Link } from 'react-router-dom';

import styles from './styles/Welcome.module.css';

export default function Welcome() {

    return(
        <div className={styles.mainDiv}>
            <form action="" className={styles.form}>
                <div className={styles.divButtons}>
                    <button className={styles.btnLogIn}>Log In</button>
                    <Link 
                        to='/singUp'
                        className={styles.btnSignUp}>
                        Sign Up
                    </Link>
                    <button className={styles.btnGuest}>Login as Guest</button>
                </div>
            </form>
        </div>
    );
};