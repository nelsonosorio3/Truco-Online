import React from "react";

import styles from './styles/Friend.module.css'
import profileIcon from '../img/profileIcon.png'

export default function AddFriend({username, respond, email}) {
  
  return (
    <div className={styles.mainDiv}>
      <img src={profileIcon} alt="" className={styles.profileIconSmall} />
      <h3 className={styles.name}>From: {username}</h3>
      <button onClick={() => respond(email, "accepted") }>Accept</button>
      <button onClick={() => respond(email, "rejected") }>Reject</button>
      {/* <p>Status:</p> */}
      {/* <p>{status}</p>
      <div className={styles.div2}>
        <p className={styles.text}>Amigos desde:</p>
        <div className={styles.text}>{date.split("T")[0]}</div>
      </div>
      {status === "pending" ? null : <button onClick={() => deleteFriend()}>X</button>} */}
      
    </div>
  )
}