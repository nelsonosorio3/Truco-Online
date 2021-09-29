import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux'
import Game from '../game';

import socket from '../socket';

export default function TournamentGames ({matchesList, savedData}){
    const [showGame, setShowGame] = useState(false)
    const [actualIdGame, setActualIdGame] = useState('')

    useEffect(() => {
        if(matchesList.length>0){
            if(matchesList[0].participants[0] === localStorage.user || (matchesList[0].participants[1] === localStorage.user)){
                console.log(localStorage.user, matchesList[0].matchId)
                socket.emit('tournamentGame', matchesList[0].matchId);
                matchesList.shift();
            }
            if(matchesList[matchesList.length-1].participants[0] === localStorage.user || (matchesList[matchesList.length-1].participants[1] === localStorage.user)){
                console.log(localStorage.user, matchesList[matchesList.length-1].matchId)
                socket.emit('tournamentGame', matchesList[matchesList.length-1].matchId);
                matchesList.pop();
            }
        }
    }, [matchesList])

    useEffect(() => {
        socket.on('showGame', (matchId) => {
            setShowGame(true);
            setActualIdGame(matchId)
        })
    })
    
    return(
        <div>
            <h4>Tournament Full</h4>
            {console.log('actual data:', savedData)}
            <h5>Matches:</h5>
            {
                matchesList.length > 0 ?
                    matchesList.map(p => <h6 key={p.matchId}>{p.participants[0]} vs {p.participants[1]}. Match ID: {p.matchId}</h6> )
                : null
            }
            {console.log(matchesList)}
            {
                showGame ? <Game tournamentMatchId={actualIdGame}/> : null
            }
        </div>
    )
}