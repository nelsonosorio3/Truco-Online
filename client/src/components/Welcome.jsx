import React from 'react';

import styles from './styles/Welcome.module.css'

export default function Welcome () {

    return(
        <div className={styles.mainDiv}>
            <form action="" className={styles.form}>
                <div className={styles.divButtons}>
                    <button className={styles.btnLogIn}>Log in</button>
                    <button className={styles.btnSignUp}>Sign up</button>
                    <button className={styles.btnGuest}>Login as guest</button>
                </div>
            </form>
        </div>
    )
}