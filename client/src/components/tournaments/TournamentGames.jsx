import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux'
import Game from '../game';

import socket from '../socket';

export default function TournamentGames ({matchesList, savedData}){
    const [showGame, setShowGame] = useState(false)
    const [actualIdGame, setActualIdGame] = useState('')
    const [wins, setWins] = useState([])
    const [allPlayersWins, setAllPlayersWins] = useState([])
    const [showWinner, setShowWinner] = useState(false)
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
        if(finishedFirstMatch===false && finishedSecondMatch===false && finishedThirdMatch===false){
            if(matches.length>0){
                if(matches[0].participants[0] === localStorage.user || (matches[0].participants[1] === localStorage.user)){
                    console.log('EN CASO DE QUE SE REPITA ARRIBA')
                    socket.emit('tournamentGame', ({tournamentId: savedData[0].tournamentId, matchId: matches[0].matchId}));
                }
                else if(matches[matches.length-1].participants[0] === localStorage.user || (matches[matches.length-1].participants[1] === localStorage.user)){
                    console.log('EN CASO DE QUE SE REPITA ABAJO')
                    socket.emit('tournamentGame', ({tournamentId: savedData[0].tournamentId, matchId: matches[matches.length-1].matchId}));
                }
            }
        }
        // return () => {socket.off()}
    }, [firstMatch])
    
    useEffect(() => {
        if(finishedFirstMatch===true && finishedSecondMatch===false && finishedThirdMatch===false ){
            // console.log(secondMatch, 'ENTRAMOSSSSSSS USEEFFECT SECONDMATCH')
            if(matches.length>0){
                if(matches[1].participants[0] === localStorage.user || (matches[1].participants[1] === localStorage.user)){
                    console.log(localStorage.user, 'HA ENTRADO A SEGUNDA PARTIDA ARRIBA')
                    socket.emit('tournamentGame', ({tournamentId: savedData[0].tournamentId, matchId: matches[1].matchId, matchNumber: 2}));
                }
                else if(matches[matches.length-2].participants[0] === localStorage.user || (matches[matches.length-2].participants[1] === localStorage.user)){
                    console.log(localStorage.user, 'HA ENTRADO A SEGUNDA PARTIDA ABAJO')
                    socket.emit('tournamentGame', ({tournamentId: savedData[0].tournamentId, matchId: matches[matches.length-2].matchId, matchNumber: 2}));
                }
            }
        }
    }, [secondMatch])

    useEffect(() => {
        if(finishedFirstMatch===true && finishedSecondMatch===true && finishedThirdMatch===false){
            // console.log(secondMatch, 'ENTRAMOSSSSSSS USEEFFECT SECONDMATCH')
            if(matches.length>0){
                if(matches[2].participants[0] === localStorage.user || (matches[2].participants[1] === localStorage.user)){
                    console.log(localStorage.user, 'HA ENTRADO A TERCERA PARTIDA ARRIBA')
                    socket.emit('tournamentGame', ({tournamentId: savedData[0].tournamentId, matchId: matches[2].matchId, matchNumber: 3}));
                }
                else if(matches[matches.length-3].participants[0] === localStorage.user || (matches[matches.length-3].participants[1] === localStorage.user)){
                    console.log(localStorage.user, 'HA ENTRADO A TERCERA PARTIDA ABAJO')
                    socket.emit('tournamentGame', ({tournamentId: savedData[0].tournamentId, matchId: matches[matches.length-3].matchId, matchNumber: 3}));

                }
            }
        }
    }, [thirdMatch])

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
        socket.on('showGameThree', (matchId) => {
            console.log('EL ID DE LA SEGUNDA PARTIDA ES: ', matchId)
            setShowThirdMatch(true);
            setActualIdGame(matchId)
        })
        socket.on('showWinner', (results) => {
            setAllPlayersWins(results)
            setShowWinner(true)
        })
    })

    useEffect(() => {
        if(finishedFirstMatch===true){
            console.log('PRIMERA PARTIDA TERMINADA')
            setSecondMatch(true)
        }
    }, [finishedFirstMatch])

    useEffect(() => {
        if(finishedSecondMatch===true){
            console.log('SEGUNDA PARTIDA TERMINADA')
            setThirdMatch(true)
        }
    }, [finishedSecondMatch])

    useEffect(() => {
        if(finishedFirstMatch===true && finishedSecondMatch===true && finishedThirdMatch===true){
            socket.emit('setWinner', ({tournamentId: savedData[0].tournamentId, playerWins: wins}))
        }
    }, [finishedFirstMatch, finishedSecondMatch, finishedThirdMatch])

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
                    setShowFirstMatch={setShowFirstMatch}
                    setFinishedFirstMatch={setFinishedFirstMatch}

                    wins={wins}
                    setWins={setWins}
                    
                    finishedFirstMatch={finishedFirstMatch}
                    finishedSecondMatch={finishedSecondMatch}
                    finishedThirdMatch={finishedThirdMatch}
                /> 
                : null
            }
            
            {/*///////////// SEGUNDA PARTIDA /////////////*/}
            {
                showSecondMatch ?
                <div>
                    <h1>SEGUNDA PARTIDA: {actualIdGame}</h1> 
                    <Game 
                        tournamentMatchId={actualIdGame}
                        setShowSecondMatch={setShowSecondMatch} 
                        setFinishedSecondMatch={setFinishedSecondMatch}

                        wins={wins}
                        setWins={setWins}

                        finishedFirstMatch={finishedFirstMatch}
                        finishedSecondMatch={finishedSecondMatch}
                        finishedThirdMatch={finishedThirdMatch}
                    /> 
                </div>
                : null
            }

             {/*///////////// TERCERA PARTIDA /////////////*/}
             {
                showThirdMatch ? 
                <div>
                    <h1>TERCERA PARTIDA</h1> 
                    <Game 
                        tournamentMatchId={actualIdGame} 
                        setShowThirdMatch={setShowThirdMatch}
                        setFinishedThirdMatch={setFinishedThirdMatch}

                        wins={wins}
                        setWins={setWins}

                        finishedFirstMatch={finishedFirstMatch}
                        finishedSecondMatch={finishedSecondMatch}
                        finishedThirdMatch={finishedThirdMatch} 
                    /> 
                </div>
                : null
            }
            {
            finishedFirstMatch && finishedSecondMatch && finishedThirdMatch 
            ? 
                <div>
                    <h1>EL TORNEO HA TERMINADO</h1> 
                    {
                        allPlayersWins.length > 0
                        ? allPlayersWins.map(w => {
                            if(w.length > 0){
                                return(<h6>{`${w[0]}: ${w.length} puntos.`}</h6>)
                            }
                        })
                        : null
                    }
                </div>
            : null}
            {console.log(showGame, actualIdGame)}
        </div>
    )
}