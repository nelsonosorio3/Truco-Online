import React  from 'react';
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';

import Logo2 from '../img/Logo2.png'
import styles from './styles/NavBar.module.css'

export default function NavBar(){
     
    const { isAuth } = useSelector(state => state.logReducer);

    let name =null;

    return(
        <div className={styles.mainDiv}>
            {console.log(isAuth)}
            <nav className={styles.nav}>
                <img src={Logo2} alt="TrucoHenry" className={styles.logo2} />
                <Link to='/rooms' className={styles.a}>Lobbys</Link>
                <Link to='/ranking' className={isAuth ? styles.a : styles.a_disable}>Ranking</Link>
                <Link to='/profile' className={isAuth ? styles.a : styles.a_disable}>My Profile</Link>
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
