import React from 'react';
import { Link } from 'react-router-dom';
// import FacebookLogin from 'react-facebook-login';
import HomeButton from './HomeButton';

import styles from './styles/Welcome.module.css';

export default function Welcome() {


    const responseFacebook = (response) => {
        console.log(response);
      }



    return(
        <>
            <HomeButton />
            <section className={styles.mainDiv}>
                <form action="" className={styles.form}>
                    <div className={styles.divButtons}>
                        <Link to='/log-in'>
                            <button className={styles.btnLogIn}>Log In</button>
                        </Link>
                        {/* <FacebookLogin
                            appId="414547080239642"
                            autoLoad={false}
                            fields="name,email,picture"
                            callback={responseFacebook}
                            icon="fa-facebook" />, */}
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