import React from 'react';
import {useSelector} from 'react-redux'

import NavBar from '../NavBar';
import TournamentsForm from './TournamentsForm';
import TournamentsList from './TournamentsList';

export default function Tournaments(){

    const isinRoom = useSelector(store => store.tournamentsReducer.isInTournament);
    const tournamentId = useSelector(store => store.tournamentsReducer.tournamentId)
  

    return(
        <div>
            <NavBar />
            {
                isinRoom
                ?
                    <h3>TournamentId: {tournamentId}</h3>
                :
                    <div>
                        <TournamentsForm />
                        <TournamentsList />
                    </div>
            }
        </div>
    )
}