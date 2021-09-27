import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux'

import styles from './styles/Tournaments.module.css'
import socket from '../socket';
import NavBar from '../NavBar';
import TournamentsForm from './TournamentsForm';
import TournamentsList from './TournamentsList';

export default function Tournaments(){
    const[playersList, setPlayersList] = useState([]);

    const isinRoom = useSelector(store => store.tournamentsReducer.isInTournament);
    const tournamentId = useSelector(store => store.tournamentsReducer.tournamentId)

    useEffect(() => {
        socket.on('sendTournamentData', (tournamentData) => {
            setPlayersList(tournamentData.t.players)
        })

        return () => {socket.off()}
    }, [playersList])

    const updatePlayers = (event) => {
        event.preventDefault();
        socket.emit('bringTournamentData', (tournamentId));
    }

    return(
        <div>
            <NavBar />
            <div className={styles.submainDiv}>
                {
                    isinRoom
                    ?
                        <div>{console.log(playersList)}
                            <h3>TournamentId: {tournamentId}</h3>
                            <form onSubmit={updatePlayers}>
                                <button type='submit' className={styles.btn}>{'Update players'}</button>
                            </form>
                            <div>
                                Actual players:
                                {playersList.map(p => <h4 key={p}>{p}</h4> )}
                            </div>
                        </div>
                    :
                        <div>
                            <TournamentsForm />
                            <TournamentsList />
                        </div>
                }
            </div>
        </div>
    )
}