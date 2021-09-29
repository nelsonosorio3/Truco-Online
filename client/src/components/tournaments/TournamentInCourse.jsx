import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux'

import styles from './styles/Tournaments.module.css'
import socket from '../socket';
import TournamentGames from './TournamentGames';
import Game from '../game';


export default function TournamentInCourse(){
    const[tournamentData, setTournamentData] = useState([]);
    const[savedData, setSavedData] = useState([]);  // Clon del objeto tournament eliminado al conseguir 4 jugadores
    const[isFull, setisFull] = useState(false);
    const[matchesList, setMatchesList] = useState([])
    
    const tournamentId = useSelector(store => store.tournamentsReducer.tournamentId)
    
    useEffect(() => {
        socket.on('sendTournamentData', (data) => {
            setTournamentData([data]);
        })
        return () => {socket.off()}
    }, [tournamentData])

    useEffect(() => {
        socket.on("newPlayerInside", () => {
            socket.emit('bringTournamentData', (tournamentId));
        })
        return () => {socket.off()}
    })

    useEffect(() => {
        socket.on("tournamentFull", (dataObject) => {
            socket.emit('matchesList', (dataObject))
            setSavedData([dataObject])            
            setisFull(true)
        })
        return () => {socket.off()}
    })

    useEffect(() => {
        socket.on("matches", (list) => {
            setMatchesList(list)
        })
        return () => {socket.off()}
    })

    return(
        <div>
            <h3>TournamentId: {tournamentId}</h3>
            {
                isFull ?
                    <div>
                        <TournamentGames matchesList={matchesList} savedData={savedData}/>
                    </div>
                :
                <div>
                    Actual players: 
                    {
                    tournamentData.length > 0 ?
                        !tournamentData[0] ? null
                            : tournamentData[0].players.map(p => <h4 key={p}>{p}</h4> )
                    : null
                    }
                </div>
            }
        </div>
    )
}
