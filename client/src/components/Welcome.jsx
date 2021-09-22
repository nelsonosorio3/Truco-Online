import React from 'react';
import { Link } from 'react-router-dom';

import HomeButton from './HomeButton';

import styles from './styles/Welcome.module.css';

export default function Welcome() {

    return(
        <>
            <HomeButton />
            <section className={styles.mainDiv}>
                <form action="" className={styles.form}>
                    <div className={styles.divButtons}>
                        <Link to='/log-in'>
                            <button className={styles.btnLogIn}>Log In</button>
                        </Link>
                        <Link to='/sign-up'>
                            <button className={styles.btnSignUp}>Sign Up</button>
                        </Link>
                        <Link to='/rooms'>
                            <button className={styles.btnGuest}>Enter as Guest</button>
                        </Link>
                    </div>
                </form>
            </section>
        </>
    );
};