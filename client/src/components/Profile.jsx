import React from 'react';

import styles from './styles/Profile.module.css';
import profileIcon from '../img/profileIcon.png';

import { userSelector } from 'react-redux';

/* Los dos siguientes imports agregados por guille */
import Friend from './Friend';
import Match from './Match';

export default function Profile() {

    // Corregir desde el backend: El llamado de amigos no debe traer su password!!!
    /* 
    Las solicitudes enviadas no debe traer aquellas que ya están aceptadas, estos ya son amigos!
    Las búsquedas de amigos no deven devolver las amistades con estado "pending" ni "rejected", sólo "accepted".

    */
    /*
     var user2 = useSelector(state => state.profileReducer)*/


    var user = [
        {
            "id": 1,
            "username": "pedro",
            "email": "pedro@mail.com",
            "gamesPlayed": 3,
            "gamesWon": 2,
            "gamesLost": 1,
            "createdAt": "2021-09-20T14:44:32.390Z",
            "updatedAt": "2021-09-20T14:44:32.390Z"
        }
    ]

    var user = user[0];

    var friends = [
        {
            "id": 3,
            "username": "guille",
            "email": "guille@mail.com",
            "password": "1234", // Quitar el password de los amigos!!!
            "gamesPlayed": 0,
            "gamesWon": 0,
            "gamesLost": 0,
            "createdAt": "2021-09-20T14:44:32.394Z",
            "updatedAt": "2021-09-20T14:44:32.394Z",
            "Friends": {
                "status": "pending",
                "createdAt": "2021-09-20T14:44:32.405Z",
                "updatedAt": "2021-09-20T14:44:32.405Z",
                "userSenderId": 1,
                "userRequestedId": 3
            }
        },
        {
            "id": 5,
            "username": "leo",
            "email": "leo@mail.com",
            "password": "1234",
            "gamesPlayed": 0,
            "gamesWon": 0,
            "gamesLost": 0,
            "createdAt": "2021-09-20T14:44:32.397Z",
            "updatedAt": "2021-09-20T14:44:32.397Z",
            "Friends": {
                "status": "accepted",
                "createdAt": "2021-09-20T14:44:32.407Z",
                "updatedAt": "2021-09-20T14:44:32.407Z",
                "userSenderId": 1,
                "userRequestedId": 5
            }
        },
        {
            "id": 7,
            "username": "fede",
            "email": "fede@mail.com",
            "password": "1234",
            "gamesPlayed": 0,
            "gamesWon": 0,
            "gamesLost": 0,
            "createdAt": "2021-09-20T14:44:32.399Z",
            "updatedAt": "2021-09-20T14:44:32.399Z",
            "Friends": {
                "status": "pending",
                "createdAt": "2021-09-20T14:44:32.404Z",
                "updatedAt": "2021-09-20T14:44:32.404Z",
                "userSenderId": 1,
                "userRequestedId": 7
            }
        },
        {
            "id": 8,
            "username": "marcelo",
            "email": "marcelo@mail.com",
            "password": "1234",
            "gamesPlayed": 0,
            "gamesWon": 0,
            "gamesLost": 0,
            "createdAt": "2021-09-20T14:44:32.400Z",
            "updatedAt": "2021-09-20T14:44:32.400Z",
            "Friends": {
                "status": "accepted",
                "createdAt": "2021-09-20T14:44:32.409Z",
                "updatedAt": "2021-09-20T14:44:32.409Z",
                "userSenderId": 1,
                "userRequestedId": 8
            }
        }
    ]

    var friend_rr = []

    var friend_rs = [
        {
            "id": 3,
            "username": "guille",
            "email": "guille@mail.com",
            "password": "1234",
            "gamesPlayed": 0,
            "gamesWon": 0,
            "gamesLost": 0,
            "createdAt": "2021-09-20T14:44:32.394Z",
            "updatedAt": "2021-09-20T14:44:32.394Z",
            "Friends": {
                "status": "pending",
                "createdAt": "2021-09-20T14:44:32.405Z",
                "updatedAt": "2021-09-20T14:44:32.405Z",
                "userSenderId": 1,
                "userRequestedId": 3
            }
        },
        {
            "id": 7,
            "username": "fede",
            "email": "fede@mail.com",
            "password": "1234",
            "gamesPlayed": 0,
            "gamesWon": 0,
            "gamesLost": 0,
            "createdAt": "2021-09-20T14:44:32.399Z",
            "updatedAt": "2021-09-20T14:44:32.399Z",
            "Friends": {
                "status": "pending",
                "createdAt": "2021-09-20T14:44:32.404Z",
                "updatedAt": "2021-09-20T14:44:32.404Z",
                "userSenderId": 1,
                "userRequestedId": 7
            }
        }
    ]

    var history = [
        {
            "id": 3,
            "state": "terminada",
            "winner": "pedro",
            "loser": "leo",
            "results": "30|24",
            "createdAt": "2021-09-20T14:44:32.387Z",
            "updatedAt": "2021-09-20T14:44:32.387Z"
        },
        {
            "id": 4,
            "state": "terminada",
            "winner": "santiago",
            "loser": "pedro",
            "results": "30|11",
            "createdAt": "2021-09-20T14:44:32.389Z",
            "updatedAt": "2021-09-20T14:44:32.389Z"
        }
    ]



    return (
        <div className={styles.mainDiv}>
            <div className={styles.player}>
                <img src={profileIcon} alt="" className={styles.profileIcon} />
                <div className={styles.playerInfo}>
                    <h2>Username: {user.username}</h2>
                    <h3>Games played: {user.gamesPlayed}</h3>
                    <h3>Games won: {user.gamesWon}</h3>
                </div>
            </div>

            <br />
            <h3 classname={styles.title}>Amigos</h3>

            <div className={styles.friends}>
                {
                    friends.map(f => <Friend
                        key={f.id}
                        id={f.id}
                        name={f.username}
                        date={f.createdAt}
                    />)
                }
            </div>

            <h3 classname={styles.title}>Últimos resultados</h3>

            <div className={styles.history}>
                {
                    history.map(m => <Match
                        key={m.id}
                        id={m.id}
                        result={m.winner === user.username ? "Ganaste" : "Perdiste"}
                        j1={m.winner}
                        j2={m.loser}
                        date={m.createdAt}
                    />)
                }
            </div>

        </div>
    )
}