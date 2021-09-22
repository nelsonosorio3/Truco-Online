import React, { useState, useEffect }  from 'react';
import { Link } from 'react-router-dom';

import Logo2 from '../img/Logo2.png'
import styles from './styles/NavBar.module.css'

export default function NavBar(){
     
    const [isAuth, setIsAuth] = useState(false); 

    useEffect(() => {
        const logged = window.localStorage.getItem("isAuth");
        if(logged) {
          setIsAuth(logged);
        };
    }, []);

    let name =null;

    return(
        <div className={styles.mainDiv}>
            {console.log(isAuth)}
            <nav className={styles.nav}>
                <img src={Logo2} alt="TrucoHenry" className={styles.logo2} />
                <Link to='/rooms' className={styles.a}>Lobbys</Link>
                {isAuth ? <Link to='/ranking'className={styles.a}>Ranking</Link> : <></>}
                {isAuth ? <Link to='/profile' className={styles.a}>My Profile</Link> : <></> }
            </nav>
         </div>
    );
};
