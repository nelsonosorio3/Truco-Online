import React, {useState, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { setIsInTournament } from '../../Redux/actions-types/tournamentsActions';

import socket from '../socket';
import styles from './styles/Tournaments.module.css'

export default function TournamentsForm(){
    const dispatch = useDispatch()

    const createTournament = async (event) => {
        event.preventDefault();
        let idGenerator = Math.floor(Math.random()*1000000)
        socket.emit('createTournament', (idGenerator))
        dispatch(setIsInTournament({isInTournament: true, tournamentId: idGenerator}))
    }
    
    return(
        <div>
            <div>
                <form onSubmit={createTournament}>
                    <button type='submit' className={styles.btn}>{'Create new tournament'}</button>
                </form>
            </div>
        </div>
    )
}