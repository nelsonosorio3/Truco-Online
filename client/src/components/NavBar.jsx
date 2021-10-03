import React, { useState, useEffect }  from 'react';
import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

import styles from './styles/NavBar.module.css'

import logo from '../img/logo.png';
import profileIcon from '../img/profileIcon.png';

export default function NavBar() {
    
    const { userProfile } = useSelector(state => state.profileReducer);

    const [toggleMenu, setToggleMenu] = useState(false);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    const [isAuth, setIsAuth] = useState(false); 

    const visible = toggleMenu ? styles.visible : null;

    useEffect(() => {
        const logged = window.localStorage.getItem("isAuth");
        if(logged) {
          setIsAuth(logged);
        };
    }, []);
    
    useEffect(() => {
        const changeWidth = () => {
            setScreenWidth(window.innerWidth);
        };
        window.addEventListener('resize', changeWidth);
        return () => {
            window.removeEventListener('resize', changeWidth);
        };
    }, []);
    
    const toggleNav = () => {
        setToggleMenu(!toggleMenu);
    };

    return (
        <nav className={styles.nav}>
            <div className={styles.logo}>
                <Link to='/'>
                        <img src={logo} alt="TrucoHenry" />             
                </Link>
            </div>
            {
                (toggleMenu || screenWidth > 768) && (
                    <>
                        <div className={styles.groupLinks}> 
                            <Link to='/rooms' className={styles.links}>Salas</Link>
                            {
                                isAuth ? 
                                <>
                                    <Link to='/ranking' className={styles.links}>Ranking</Link>
                                    <Link to='/tournaments' className={styles.links}>Torneos</Link>
                                    <Link to='/tutorial' className={styles.links}>Tutorial</Link>
                                </>
                                :
                                null
                            }
                        </div>
                        <div className={styles.contProfile}>
                            {
                                isAuth && screenWidth > 768 ? 
                                <Link to='/profile' className={styles.links}>
                                    <img src={userProfile.image ? userProfile.image : profileIcon} alt="profile picture" />
                                    {`Hola, ${userProfile.username}!`}
                                </Link>
                                :
                                isAuth ?
                                <Link to='/profile' className={styles.links}>
                                    <img src={userProfile.image ? userProfile.image : profileIcon} alt="profile picture" />
                                </Link>
                                :
                                null
                            }
                        </div>
                    </>
                )
            }
            <p className={styles.menuOn + ' ' + visible} onClick={toggleNav}>
                <span></span>
                <span></span>
                <span></span>
            </p>
        </nav>
    );
};