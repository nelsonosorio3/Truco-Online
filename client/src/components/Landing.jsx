import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './styles/Landing.module.css';

export default function Landing() {
    return(
        <section className={styles.container}>
            <div className={styles.table}> 
                <button className={styles.btn1}>
                    <NavLink to="/login" > Enter </NavLink>
                </button>
            </div>
        </section>
    );
};