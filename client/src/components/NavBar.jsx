import React  from 'react';
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';

import Logo2 from '../img/logo2.png'
import styles from './styles/NavBar.module.css'

export default function NavBar(){
     
    const { isAuth } = useSelector(state => state.logReducer);

    let name =null;

    return(
        <div className={styles.mainDiv}>
            <nav className={styles.nav}>
                <img src={Logo2} alt="TrucoHenry" className={styles.logo2} />
                <Link to='/rooms' className={styles.a}>Lobbys</Link>
                <Link to='/ranking'className={styles.a}>Ranking</Link>
                <Link to='/profile' className={styles.a}>My Profile</Link>
            </nav>

                {/* No descomentar todavia, esto va a ser para el ingreso como invitado */}
                {/* {
                    isAuth ? 
                        <Link to='/ranking'className={styles.a}>Ranking</Link>
                        <Link to='/profile' className={styles.a}>My Profile</Link>
                    :
                    null
                } */}
         </div>
    );
};
