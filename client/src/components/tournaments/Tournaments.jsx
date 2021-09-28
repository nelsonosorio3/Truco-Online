import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux'

import styles from './styles/Tournaments.module.css'
import socket from '../socket';
import NavBar from '../NavBar';
import TournamentsForm from './TournamentsForm';
import TournamentsList from './TournamentsList';
import TournamentInCourse from './TournamentInCourse';

export default function Tournaments(){
    const isinRoom = useSelector(store => store.tournamentsReducer.isInTournament);
    
    return(
        <div>
            <NavBar />
            <div className={styles.submainDiv}>
                {
                    isinRoom
                    ?
                        <TournamentInCourse />
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