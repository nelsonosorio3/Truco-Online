import React from "react";
import { useModal } from '../hooks/useModal';

import FriendInfo from './FriendInfo';

import styles from './styles/Friend.module.css'
import profileIcon from '../img/profileIcon.png'

export default function Friend({ name, date, id, deleteId, email, status }) {
  
  const [isOpen, open, close] = useModal();

  const deleteFriend = () => {
    deleteId(email);
  };

  return (
    <div className={styles.mainDiv}>
      <img src={profileIcon} alt="" className={styles.profileIconSmall} />
      <h3 className={styles.name} onClick={open}>{name}</h3>
      <p>Status:</p>
      <p>{status}</p>
      <div className={styles.div2}>
        <p className={styles.text}>Amigos desde:</p>
        <div className={styles.text}>{date.split("T")[0]}</div>
      </div>
      {status === "pending" ? null : <button onClick={() => deleteFriend()}>X</button>}
      {/* Desplegar info detallada */}
      <FriendInfo isOpen={isOpen} close={close} name={name} date={date} email={email} id={id} />
    </div>
  );
};