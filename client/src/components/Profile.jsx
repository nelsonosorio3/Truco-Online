import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch , useSelector } from 'react-redux';

import profileIcon from '../img/profileIcon.png';
import profileActions from '../Redux/actions-types/profileActions';
import styles from './styles/Profile.module.css';

/* Los dos siguientes imports agregados por guille */
import Friend from './Friend';
// import Match from './Match';

// nav
import NavBar from './NavBar';

export default function Profile(props) {
    
    //Estados del profileReducer
    const [friends, setFriends] = useState([])

    //userProfile: es el estado del usuario logeado
    const { userProfile, userFriends  } = useSelector(state => state.profileReducer);
    const {getProfile, getFriends, deleteFriends} = profileActions
    const dispatch = useDispatch();

    //Trae primeramente los datos del usuario y sus amigos
    useEffect(() => {
        dispatch(getProfile({token: localStorage.token}))
        dispatch(getFriends(localStorage.token))
    },[])

    //Esto es para que se actualice el estado una vez que se elimina
    useEffect(() => {
        setFriends(userFriends)
    }, [userFriends])

    //Funcion para eliminar un amigo
    const deleteFriendFunction = (id, email) => {
        dispatch(deleteFriends(id, email))
    }

    /* 
    Las solicitudes enviadas no debe traer aquellas que ya están aceptadas, estos ya son amigos!
    Las búsquedas de amigos no deven devolver las amistades con estado "pending" ni "rejected", sólo "accepted".
    */

    return (
        <>
            <NavBar />
            <div className={styles.mainDiv}>
                <div className={styles.player}>
                    <img src={profileIcon} alt="" className={styles.profileIcon} />
                    <div className={styles.playerInfo}>
                        <h2>Username: {userProfile?.username}</h2>
                        <h3>Email: {userProfile?.email}</h3>
                        <h3>Games played: {userProfile?.gamesPlayed}</h3>
                        <h3>Username: {userProfile?.gamesLost}</h3>
                        <h3>Games won: {userProfile?.gamesWon}</h3>
                    </div>
                </div>
                <br />
                <h3 classname={styles.title}>Amigos</h3>

                <div className={styles.friends}>
                    {
                        !friends.length ? <p>No tienes amigos</p> : friends.map(f => <Friend
                            key={f?.id}
                            email={f?.email}
                            deleteId={deleteFriendFunction}
                            profileId={userProfile?.id}
                            id={f?.id}
                            name={f?.username}
                            date={f.Friends?.createdAt}
                        />)
                    }
                </div>

                <h3 classname={styles.title}>Últimos resultados</h3>
                <div className={styles.history}>
                    {/* {
                        history.map(m => <Match
                            key={m.id}
                            id={m.id}
                            result={m.winner === user.username ? "Ganaste" : "Perdiste"}
                            j1={m.winner}
                            j2={m.loser}
                            date={m.createdAt}
                        />)
                    } */}
                </div>
            </div>
        </>
    );
};