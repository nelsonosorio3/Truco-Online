/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import styles from './styles/Ranking.module.css';
import getRanking from '../Redux/actions-types/getRanking';
import NavBar from './NavBar';
import { useDispatch, useSelector } from 'react-redux';
import { setLeftTournament } from '../Redux/actions-types/tournamentsActions';
import Cup from './cup';
import GameRequest from './GameRequest';

import log from '../Redux/actions-types/logActions'; // para logoutButton
import { useHistory } from 'react-router'; // para boton logout

export default function Ranking() {

  const state = useSelector(state => state.rankingReducer)
  const dispatch = useDispatch();

  dispatch(setLeftTournament())

  useEffect(() => {
    dispatch(getRanking())
  }, [])

  //Agregado por guille, para boton logout
  const isActive = window.localStorage.getItem("status");

  const { logOut } = log;
  const history = useHistory();

  const logout = () => {
    dispatch(logOut());
    history.push("/");
  };

  //fin boton logout

  let one = state.ranking[0]
  let two = state.ranking[1]
  let three = state.ranking[2]

  return (
    <>
      <NavBar />
      {
        isActive
          ?
          <button className={styles.logoutBtn} onClick={logout}>Cerrar Sesión</button> :
          <div></div>
      }
      <GameRequest />
      <div className={styles.fondo}>
        <h2 className={styles.title}> Mejores Jugadores</h2>
        <div className={styles.cups}>
          <Cup username={one?.username} pos='1' won={one?.gamesWon} />
          <Cup username={two?.username} pos='2' won={two?.gamesWon} />
          <Cup username={three?.username} pos='3' won={three?.gamesWon} />
        </div>
      </div>
    </>
  );
};