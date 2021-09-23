import React from "react";

import styles from './styles/Friend.module.css'
import profileIcon from '../img/profileIcon.png'

export default function Friend({ name, date, id, profileId, deleteId, email, status }) {

  const deleteFriend = () => {
    console.log("user profile: ", profileId, "user delete: ",email)
    deleteId(profileId, email)
  }


  return (
    <div className={styles.mainDiv}>
      <img src={profileIcon} alt="" className={styles.profileIconSmall} />
      <h3 className={styles.name}>{name}</h3>
      <p>Status:</p>
      <p>{status}</p>
      <div className={styles.div2}>
        <p className={styles.text}>Amigos desde:</p>
        <div className={styles.text}>{date.split("T")[0]}</div>
      </div>
      {status === "pending" ? null : <button onClick={() => deleteFriend()}>X</button>}
      
    </div>
  )
}