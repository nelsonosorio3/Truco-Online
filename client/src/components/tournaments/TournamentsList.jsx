import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux'
import { setIsInTournament } from '../../Redux/actions-types/tournamentsActions';

import socket from '../socket';
import styles from './styles/TournamentsList.module.css'

export default function TournamentsList(){
    const [allTournaments, setAllTournaments] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        socket.on('showActiveTournaments', (tournaments) => {
            setAllTournaments([tournaments]);
        })
        return () => {socket.off()}
    }, [allTournaments])

    useEffect(()=>{
        socket.emit('bringActiveTournaments');  
    }, [])

    useEffect(() => {
        socket.on("newTournamentCreated",()=> {socket.emit('bringActiveTournaments');})
        return () => {socket.off("newTournamentCreated")}
    })
    
    const updateTournaments = (event) => {
        event.preventDefault();
        socket.emit('bringActiveTournaments');
    }

    const joinTournament = async (event) => {
        event.preventDefault();
        socket.emit('joinTournament', ({tournamentId: parseInt(event.target[0].innerText), user: localStorage.user}))
        dispatch(setIsInTournament({isInTournament: true, tournamentId: parseInt(event.target[0].innerText)}))
    }

    return(
        <div>
            <form onSubmit={updateTournaments}>
                <button type='submit' className={styles.btn} >Update Rooms</button>
            </form>
            <div className={styles.TournamentsList}>
                {
                    allTournaments[0]
                ?
                allTournaments[0].map(tournament => 
                    <div key={tournament}>
                        <form onSubmit={joinTournament}>
                            <button type='submit' value={tournament} className={styles.roomBtn} >{tournament}</button>
                        </form>
                    </div>)
                :
                    <></>
                }
            </div>
        </div>
    )
}