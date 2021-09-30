import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import styles from './styles/Landing.module.css';

export default function Landing() {

    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        const logged = window.localStorage.getItem("isAuth");
        if (logged) {
            setIsAuth(logged);
        };
    }, []);

    return (
        <section className={styles.container}>
            <div className={styles.table}>
                {
                    isAuth ?
                        <NavLink to="/rooms" >
                            <button className={styles.btn1}>Ingresar</button>
                        </NavLink>
                        :
                        <NavLink to="/welcome" >
                            <button className={styles.btn1}>Ingresar</button>
                        </NavLink>
                }
            </div>
            <div className={styles.containerBottom}>O <NavLink to="/adminpanel">Entrar como administrador</NavLink></div>
        </section>
    );
};