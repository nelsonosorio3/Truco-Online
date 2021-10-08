import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux'

import { setLeftTournament } from '../../Redux/actions-types/tournamentsActions';

import NavBar from '../NavBar';
import Cartas from './Cartas';
import Comienzo from './Comienzo';
import Envido from './Envido';
import Truco from './Truco';
import GameRequest from '../GameRequest';

import styles from './styles/Tutorial.module.css';
import log from '../../Redux/actions-types/logActions';

export default function Tutorial() {

    //Para logout

    const isActive = window.localStorage.getItem("status");
    const dispatch = useDispatch()
    const { logOut } = log;

    dispatch(setLeftTournament())

    const logout = () => {
        dispatch(logOut());
        history.push("/");
    };
    //logout termina aquí

    const [state, setState] = useState({
        inicio: true,
        carta: false,
        comienzo: false,
        envido: false,
        truco: false,
    });

    const cartas = () => {
        setState({
            inicio: false,
            carta: true,
            comienzo: false,
            envido: false,
            truco: false
        });
    };

    const comienzo = () => {
        setState({
            inicio: false,
            carta: false,
            comienzo: true,
            envido: false,
            truco: false
        });
    };

    const envido = () => {
        setState({
            inicio: false,
            carta: false,
            comienzo: false,
            envido: true,
            truco: false,
        });
    };

    const truco = () => {
        setState({
            inicio: false,
            carta: false,
            comienzo: false,
            envido: false,
            truco: true,
        });
    };

    let history = useHistory();

    return (
        <>
            <div style={{ display: history.location.pathname === "/rooms" && "none" }}>
                {
                    isActive
                        ?
                        <button className={styles.logoutBtn} onClick={logout}>Cerrar Sesión</button> :
                        <div></div>
                }
                <NavBar />
                <GameRequest />
            </div>
            <div className={styles.container} style={{ backgroundImage: history.location.pathname === "/rooms" && "none" }}>
                <div className={styles.pizarron}>
                    <h3 className={styles.title}>Cómo Jugar:</h3>
                    <div className={styles.botones}>
                        <button className={styles.boton} onClick={cartas} >Cartas</button>
                        <button className={styles.boton} onClick={comienzo}>Comienzo</button>
                        <button className={styles.boton} onClick={envido} >Envido</button>
                        <button className={styles.boton} onClick={truco}>Truco</button>
                    </div>
                    <div className={styles.board}>
                        {state.carta ? <Cartas /> : null}
                        {state.comienzo ? <Comienzo /> : null}
                        {state.envido ? <Envido /> : null}
                        {state.truco ? <Truco /> : null}
                        {state.inicio ? <h3 className={styles.inicio}>Por favor, elija una opción</h3> : null}
                    </div>
                </div>
            </div>
        </>
    );
};