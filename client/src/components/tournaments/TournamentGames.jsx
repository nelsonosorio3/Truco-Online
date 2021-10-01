import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux'
import Game from '../game';

import socket from '../socket';

export default function TournamentGames ({matchesList, savedData}){
    const [showGame, setShowGame] = useState(false)
    const [actualIdGame, setActualIdGame] = useState('')
    const [finishedGames, setFinishedGames] = useState([])
    const [matches, setMatches] = useState([])
    ////////////// Activadores para iniciar las partidas //////////////
    const [firstMatch, setFirstMatch] = useState(false)
    const [secondMatch, setSecondMatch] = useState(false)
    const [thirdMatch, setThirdMatch] = useState(false)

    const [showFirstMatch, setShowFirstMatch] = useState(false)
    const [showSecondMatch, setShowSecondMatch] = useState(false)
    const [showThirdMatch, setShowThirdMatch] = useState(false)

    const [finishedFirstMatch, setFinishedFirstMatch] = useState(false)
    const [finishedSecondMatch, setFinishedSecondMatch] = useState(false)
    const [finishedThirdMatch, setFinishedThirdMatch] = useState(false)
    //////////////////////////////////////////////////////////////////
    const [next, setNext] = useState(0)


    useEffect(() => {
        if(matchesList) socket.emit('addMatchesList', ({matchesList, savedData}));
    }, [matchesList, savedData])

    useEffect(() => {
        socket.on('setMatchesList', (list) => {
            setMatches(list)
            setFirstMatch(true);
        })
        // return () => {socket.off()}
    })

    useEffect(() => {
            if(matches.length>0){
                if(matches[0].participants[0] === localStorage.user || (matches[0].participants[1] === localStorage.user)){
                    socket.emit('tournamentGame', ({tournamentId: savedData[0].tournamentId, matchId: matches[0].matchId}));
                    // matches.shift();
                }
                else if(matches[matches.length-1].participants[0] === localStorage.user || (matches[matches.length-1].participants[1] === localStorage.user)){
                    socket.emit('tournamentGame', ({tournamentId: savedData[0].tournamentId, matchId: matches[matches.length-1].matchId}));
                    // matches.pop();
                }
            }
        // return () => {socket.off()}
    }, [firstMatch])
    
    useEffect(() => {
        if(finishedFirstMatch===true && secondMatch===true){
            // console.log(secondMatch, 'ENTRAMOSSSSSSS USEEFFECT SECONDMATCH')
            if(matches.length>0){
                if(matches[1].participants[0] === localStorage.user || (matches[1].participants[1] === localStorage.user)){
                    console.log(localStorage.user, 'HA ENTRADO A SEGUNDA PARTIDA ARRIBA')
                    socket.emit('tournamentGame', ({tournamentId: savedData[0].tournamentId, matchId: matches[1].matchId, matchNumber: 2}));
                    matches.shift();
                }
                else if(matches[matches.length-2].participants[0] === localStorage.user || (matches[matches.length-2].participants[1] === localStorage.user)){
                    console.log(localStorage.user, 'HA ENTRADO A SEGUNDA PARTIDA ABAJO')
                    socket.emit('tournamentGame', ({tournamentId: savedData[0].tournamentId, matchId: matches[matches.length-2].matchId, matchNumber: 2}));
                    matches.pop();
                }
            }
        }
    }, [secondMatch])

    // useEffect(() => {
    //     if(matchesList.length>0){
    //         if(matchesList[0].participants[0] === localStorage.user || (matchesList[0].participants[1] === localStorage.user)){
    //             socket.emit('tournamentGame', matchesList[0].matchId);
    //             matchesList.shift();
    //         }
    //         else if(matchesList[matchesList.length-1].participants[0] === localStorage.user || (matchesList[matchesList.length-1].participants[1] === localStorage.user)){
    //             socket.emit('tournamentGame', matchesList[matchesList.length-1].matchId);
    //             matchesList.pop();
    //         }
    //     }
    //     // return () => {socket.off()}
    // }, [matchesList, next])

    // useEffect(() => {
    //     console.log('TERMINADOS:',finishedGames)
    //     setNext(next + 10)
    // }, [finishedGames])

    useEffect(() => {
        socket.on('showGame', (matchId) => {
            setShowFirstMatch(true);
            setActualIdGame(matchId)
        })
        socket.on('showGameTwo', (matchId) => {
            console.log('EL ID DE LA SEGUNDA PARTIDA ES: ', matchId)
            setShowSecondMatch(true);
            setActualIdGame(matchId)
        })
    })

    useEffect(() => {
        if(finishedFirstMatch===true){
            console.log('PRIMERA PARTIDA TERMINADA')
            setSecondMatch(true)
        }
    }, [finishedFirstMatch])

    return(
        <div>
            {matches.length > 0 ? console.log(matches) : null}
            <h5>Matches:</h5>
            {
                matches.length > 0 ?
                    matches.map(m => <h6 key={m.matchId}>{m.participants[0]} vs {m.participants[1]}. Match ID: {m.matchId}</h6> )
                : null
            }
            {/*///////////// PRIMERA PARTIDA /////////////*/}
            {
                showFirstMatch ?
                <Game 
                    tournamentMatchId={actualIdGame} 
                    setShowSecondMatch={setShowSecondMatch} 
                    setShowFirstMatch={setShowFirstMatch}
                    setFinishedFirstMatch={setFinishedFirstMatch}
                    // setFinishedGames={setFinishedGames} 
                /> 
                : null
            }
            
             {/*///////////// SEGUNDA PARTIDA /////////////*/}
             {
                showSecondMatch ?
                <h1>SEGUNDA PARTIDA: {actualIdGame}</h1> 
                // <Game 
                //     tournamentMatchId={actualIdGame} 
                //     setShowGame={setShowGame} 
                //     finishedGames={finishedGames} 
                //     setFinishedGames={setFinishedGames} 
                // /> 
                : null
            }

             {/*///////////// TERCERA PARTIDA /////////////*/}
             {
                showThirdMatch ? 
                <h1>TERCERA PARTIDA</h1> 
                // <Game 
                //     tournamentMatchId={actualIdGame} 
                //     setShowGame={setShowGame} 
                //     finishedGames={finishedGames} 
                //     setFinishedGames={setFinishedGames} 
                // /> 
                : null
            }
            {console.log(showGame, actualIdGame)}
        </div>
    )
}