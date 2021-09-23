import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import { useHistory } from 'react-router';


import profileIcon from '../img/profileIcon.png';
import profileActions from '../Redux/actions-types/profileActions';
import styles from './styles/Profile.module.css';

/* Los dos siguientes imports agregados por guille */
import Friend from './Friend';
import AddFriend from './addFriend';
import Match from './Match';

// nav
import NavBar from './NavBar';

export default function Profile(props) {
    
    const history = useHistory();

    //Estados del profileReducer
    const [friends, setFriends] = useState({
        sender: [],
        requested: []
    })

    //userProfile: es el estado del usuario logeado
    const { userProfile, userFriends, userHistory  } = useSelector(state => state.profileReducer);
    const {getProfile, getFriends, deleteFriends, putFriendRequest, getGames} = profileActions
    const dispatch = useDispatch();

    //Trae primeramente los datos del usuario y sus amigos
    useEffect(() => {
        //informacion del usuario logeado
        dispatch(getProfile({token: localStorage.token}))
        //todos los amigos (pendientes y aceptados) del usuario
        dispatch(getFriends(localStorage.token))
        //todas las partidas del usuario
        dispatch(getGames(localStorage.token))
    },[])

    // Esto es para que se actualice el estado una vez que se elimina
    useEffect(() => {
        setFriends({
            sender: userFriends.sender,
            requested: userFriends.requested
        })
    }, [userFriends])

    //Funcion para eliminar un amigo
    const deleteFriendFunction = (id, email) => {
        console.log(id, email)
        dispatch(deleteFriends(id, email))
    }

    //Funcion para responder a una solicitud
      const respondFriendFunction = (email, response) => {
        console.log(userProfile.id, email, response)
        dispatch(putFriendRequest(userProfile.id, email, response))
        window.location.reload()
    }

    //Funcion para hacer log out
    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem("isAuth")
        history.push("/")
    }

    return (
        <>
         <NavBar />
         <button onClick={logout}>Log out</button>
         <div className={styles.mainDiv}>
         </div>
        <div className={styles.subMainDiv}>
            <div className={styles.player}>
                <img src={profileIcon} alt="" className={styles.profileIcon} />
                <div className={styles.playerInfo}>
                    <h2>{userProfile?.username}</h2>
                    <h3>{userProfile?.email}</h3>
                    <h3>Games played: {userProfile?.gamesPlayed}</h3>
                    <div className={styles.playerInfo_Games}>
                        <h3>Wins: {userProfile?.gamesLost}</h3>
                        <h3>Loses: {userProfile?.gamesWon}</h3>
                    </div>
                </div>
            </div>
            <br />
            <div className={styles.friends}>
                <div className={styles.friendsDiv}>
                    <h3 classname={styles.title}>Amigos</h3>
                    <div className={styles.friendsList}>
                        {
                            !friends.sender.length ? <p>No tienes amigos</p> : friends.sender.map(f => <Friend
                                key={f?.id}
                                email={f?.email}
                                deleteId={deleteFriendFunction}
                                profileId={userProfile?.id}
                                id={f?.id}
                                name={f?.username}
                                date={f.Friends?.createdAt}
                                status = {f.Friends.status}
                            />)
                        }
                    </div>
                </div>
                <div className={styles.friendsDiv}>
                    <h3>Solicitudes pendientes</h3>
                    <div className={styles.friendsList}>
                        {
                            !friends.requested.length ? <p>No solicitudes pendientes</p> : friends.requested.map(f => <AddFriend
                                username={f.username}
                                respond={respondFriendFunction}
                                email={f.email}
                            />)
                        }
                    </div>
                </div>
            </div>
            <div className={styles.lastResults}>
                <h3 classname={styles.title}>Últimos resultados</h3>
                <div className={styles.history}>
                    {
                        !userHistory.length ? null : userHistory.map(m => <Match
                            key={m?.id}
                            id={m?.id}
                            result={m?.winner === userProfile.username ? "Ganaste" : "Perdiste"}
                            j1={m?.winner}
                            j2={m?.loser}
                            date={m?.createdAt}
                        />)
                    }
                </div>
            </div>
            </div>
        </>
    );
};
