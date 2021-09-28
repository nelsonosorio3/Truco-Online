import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux'

import styles from './styles/Tournaments.module.css'
import socket from '../socket';

export default function TournamentInCourse(){
    const[tournamentData, setTournamentData] = useState([]);
    
    const tournamentId = useSelector(store => store.tournamentsReducer.tournamentId)
    
    useEffect(() => {
        socket.on('sendTournamentData', (data) => {
            setTournamentData([data]);
        })
        return () => {socket.off()}
    }, [tournamentData])

    useEffect(()=>{
        socket.emit('bringTournamentData', (tournamentId));
        // return() => {socket.off()} 
    }, [tournamentId])


    const updatePlayers = (event) => {
        event.preventDefault();
        socket.emit('bringTournamentData', (tournamentId));
    }

    return(
        <div>
            <h3>TournamentId: {tournamentId}</h3>
            <form onSubmit={updatePlayers}>
                <button type='submit' className={styles.btn}>Update players</button>
            </form>
            <div>
                Actual players: 
                {
                tournamentData.length > 0 ?
                    tournamentData[0] === null ? console.log('Tournament full, the match will start soon.')
                        : tournamentData[0].players.map(p => <h4 key={p}>{p}</h4> )
                    : null
                }
            </div>
        </div>
    )
}
