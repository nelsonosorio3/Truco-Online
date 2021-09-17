import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './styles/Landing.module.css';

export default function Landing() {
    return(
        <section className={styles.container}>
            <div className={styles.table}> 
                <h1> Welcome to Truco Henry! </h1>
                <button className={styles.btn}>
                    <NavLink to="/login" > Play... </NavLink>
                </button>
            </div>
        </section>
    );
};