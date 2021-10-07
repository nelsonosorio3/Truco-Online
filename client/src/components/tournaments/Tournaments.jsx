import React from 'react';
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router';

import styles from './styles/Tournaments.module.css'
import NavBar from '../NavBar';
import TournamentsForm from './TournamentsForm';
import TournamentsList from './TournamentsList';
import TournamentInCourse from './TournamentInCourse';

import log from '../../Redux/actions-types/logActions'; // para logoutButton
import { useDispatch } from 'react-redux'; //para logoutButton

export default function Tournaments() {
    const isinTournament = useSelector(store => store.tournamentsReducer.isInTournament);

    //Para logout

    const dispatch = useDispatch()
    const { logOut } = log;

    const logout = () => {
        dispatch(logOut());
        history.push("/");
    };
    //logout termina aquí

    //Agregado por guille, para verificar si el jugador no está baneado.
    const isActive = window.localStorage.getItem("status");
    const history = useHistory();

    if (isActive === "baneado" || isActive === "suspendido") {
        history.push('/bannedplayer');
    }
    /*
    useEffect(() => {
      if (isActive === "baneado" || isActive === "suspendido") {
        setTimeout(() => {
          history.push('/bannedplayer');
        }, 2000);
      }
    }, [isActive]);
    */
    // Fin de verificación si el jugador está activo.

    return (
        <div>
            <NavBar />
            {
                isActive
                    ?
                    <button className={styles.logoutBtn} onClick={logout}>Cerrar Sesión</button> :
                    <div></div>
            }

            <div className={styles.submainDiv}>
                {
                    isinTournament
                        ?
                        <TournamentInCourse />
                        :
                        <div className={styles.formAndList}>

                            <TournamentsForm />
                            <TournamentsList />
                        </div>
                }
            </div>
        </div>
    )
}