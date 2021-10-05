import React from 'react';
import {useSelector} from 'react-redux'

import styles from './styles/Tournaments.module.css'
import NavBar from '../NavBar';
import TournamentsForm from './TournamentsForm';
import TournamentsList from './TournamentsList';
import TournamentInCourse from './TournamentInCourse';

export default function Tournaments(){
    const isinTournament = useSelector(store => store.tournamentsReducer.isInTournament);
    
    return(
        <div>
            <NavBar />
            <div className={styles.submainDiv}>
                {
                    isinTournament
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