import React from "react";

import styles from './styles/Match.module.css'

export default function Match({ result, j1, j2, date }) {
  return (
    <div className={styles.mainDiv}>
      <div className={styles.div2}>Fecha: {date?.split("T")[0]}</div>
      <div className={styles.div2}>{j1} vs {j2}</div>
      <div className={styles.div2}>Resultado: {result}</div>
    </div>
  )
}
