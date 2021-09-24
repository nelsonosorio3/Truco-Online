import React, { useEffect, useState } from 'react';
import { useDispatch , useSelector } from 'react-redux';

import profileActions from '../Redux/actions-types/profileActions';

import DeleteFriendButton from './DeleteFriendButton';

import styles from './styles/FriendInfo.module.css';
import profileIcon from '../img/profileIcon.png';

export default function FriendInfo({ isOpen, close, name, date, email, status }) {

    const handleContainerClick = (e) => e.stopPropagation();
    const conditionalOpen = isOpen ? styles.isOpen : null;

    //Estados del profileReducer
    const [friends, setFriends] = useState({
        sender: [],
        requested: []
    });

    const { userProfile, userFriends } = useSelector(state => state.profileReducer);
    const { getProfile, deleteFriends, getGames } = profileActions;

    const dispatch = useDispatch();

    //Trae los datos del amigo al abrirse
    useEffect(() => {
        //info perfil
        dispatch(getProfile({token: localStorage.token}))
        //info partidas
        dispatch(getGames(localStorage.token))
    }, []);

    //Actualiza el estado al eliminar
    useEffect(() => {
        setFriends({
            sender: userFriends.sender,
            requested: userFriends.requested
        });
    }, [userFriends]);

    //Eliminar amigo
    const deleteFriend = (id, email) => {
        dispatch(deleteFriends(id, email));
    };

    return (
        <article className={styles.info + ' ' + conditionalOpen} onClick={close}>
            <div className={styles.container} onClick={handleContainerClick}>
                <DeleteFriendButton delete={deleteFriend} name={name}/>
                <button className={styles.close} onClick={close}> X </button>
                <div className={styles.player}>
                    <img src={profileIcon} alt="" className={styles.profileIcon} />
                    <p> Amigos desde: {date.split("T")[0]} </p>
                    <div className={styles.playerInfo}>
                        <h2> {name} </h2>
                        <h3> {email} </h3>
                        <h3> Games played: </h3>
                        <div className={styles.playerInfo_Games}>
                            <h3> Wins: </h3>
                            <h3> Loses: </h3>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
};