import React, { useState, useEffect, useRef } from 'react';
import stylesGame from './styles/game.module.css';
import socket from './socket';
import {useDispatch, useSelector} from 'react-redux'
import Chat from './rooms/Chat';
import { useHistory } from "react-router-dom";
import { setIsInRoom } from '../Redux/actions-types/roomsActions';
import axios from 'axios';
import profileActions from '../Redux/actions-types/profileActions';


export default function Game({
  tournamentMatchId,

  setShowFirstMatch, 
  setFinishedFirstMatch,

  setShowSecondMatch,
  setFinishedSecondMatch,

  setShowThirdMatch,
  setFinishedThirdMatch,

  finishedFirstMatch,
  finishedSecondMatch,
  finishedThirdMatch,

  wins,
  setWins

  }) {
    var roomId = useSelector(store => store.roomsReducer.roomId); //traer el id de la sala en la que esta el jugador
    // let isinRoom = useSelector(store => store.roomsReducer.isInRoom); // traer si esta en sala
    if(tournamentMatchId) roomId = tournamentMatchId;
    const [player, setPlayer] = useState({ //objeto del jugador en el cliente deberia tener solo propiedades que se usan para renderizar o limitar interacciones en el cliente
        id: 1, // socket id del jugador
        name: localStorage.user || "jugador 1", // la idea seria que sea el nombre del profile
        nameRival: "jugador 2",
        score: 0,  // puntaje que lleva
        scoreRival: 0,
        hand: [], // las 3 cartas de la ronda
        turnNumber: 1, // numero de turno
        isTurn: false, //para que pueda o no hacer click
        betOptions: [], // lista de apuesta o respuestas segun el momento
        tableRival: [], // las cartas del oponente en la mesa, tambien puede usarse para calcular cuantas cartas de dorso mostrar
        tablePlayer: [], // cartas del jugador en la mesa
        bet: false, // llevar registro de si aposto
        roundResults: [], //deberia contener el resultado de la mano por ejemplo ["tie", "win", "loss"]
        starts: false, // referencia para cambiar turnos al finalizar ronda
      });
    const [newRound, setNewRound] = useState(false);
    const [pointBox, setPointsBox] = useState(false);
    const [isYourTurn, setIsYourTurn] = useState(false);
    const history = useHistory();
    const scoreBox = useRef();
    const {getProfile} = profileActions;
    const { userProfile} = useSelector(state => state.profileReducer);
    const dispatch = useDispatch();

    const addFriend = ()=>{
      player?.id && socket.emit("addFriend", localStorage.id, roomId, player.id, player.name);
    }
    const surrender = ()=>{
      socket.emit("surrender", roomId, player.id);
      dispatch(setIsInRoom({isInRoom: false, roomId: null}));
    }
    const tutorial = ()=>{
      /// mostrar valor cartas y explicacion corta de apuestas
    }
    const report = ()=> {
      /// falta crear la ruta a donde enviarlo en el back
    }
    const showScore = ()=>{
      setPointsBox(!pointBox)
    }
    const bet = e => { //emite la apuesta
      if(player.isTurn){
        socket.emit("bet", e.target.name, roomId, player.id);
        if(e.target.name !== "ir al mazo") setPlayer({...player, bet:true, isTurn:false, betOptions: []})
      };
    };

    const playCard = (card) =>{ //emite carta jugada
      if(player.isTurn && !player.bet){
      setPlayer({...player, hand: player.hand.filter(cardH=> card.id !== cardH.id), tablePlayer: [...player.tablePlayer, card], isTurn: false});
      socket.emit("playCard", card, roomId, player.id);
      };
    };
    
    useEffect(()=>{
      localStorage?.isAuth && dispatch(getProfile({token: localStorage?.token}));
    },[]);
    useEffect(()=>{
      socket.on("gameStarts", player=>{ //escucha gameStarts para iniciar cuando la sala se llena y dejar el estado jugador listo
        setPlayer(player);
      });
      socket.on("newRoundStarts", player1=>{  //escucha para empezar nueva mano
        setPlayer({...player, isTurn: false})
        setNewRound(true);
        setTimeout(()=>setPlayer(player1),3000);
      });
      socket.on("bet", (betOptions, bool, turn)=>{  //trae la apuesta segun turno
        console.log(turn)
        if(turn === undefined) setPlayer({...player, betOptions, bet: bool});
        else setPlayer({...player, betOptions, bet: bool, isTurn: turn});
      });
      socket.on("betting", bool=>{  //cambia el estado de si se esta apostando para bloquear jugar cartas hasta resolverlo
        setPlayer({...player, bet: false, betOptions: [], isTurn: !player.isTurn});
      });
      socket.on("playCard", (card, bool)=>{  //escucha carta jugada por rival
        setPlayer({...player, tableRival:  [...player.tableRival, card], isTurn: bool}); 
      });
      socket.on("updateScore", (score, bool) =>{  //trae cambios en el puntaje
        setPlayer({...player, score: player.score + score, bet: false, isTurn: bool})
      });
      socket.on("changeTurn", (bool)=>{  //cambia turno entre jugadores
        setPlayer({...player, isTurn: bool});
      });
      socket.on("quieroTruco", (bool)=>{
        setPlayer({...player, isTurn: bool, bet: false, betOptions: []});
      });
      socket.on("quieroEnvido1", (bool, score, scoreRival)=>{
        setPlayer({...player, isTurn: bool, bet: false, betOptions: [], score: player.score+ score, scoreRival: player.scoreRival + scoreRival});
      });
      socket.on("envido1", (betOptions, bool)=>{
        setPlayer({...player, betOptions: betOptions, bet: true, isTurn: bool});
      });
      socket.on("updateRivalScore", (score, bool)=>{
        setPlayer({...player, scoreRival: player.scoreRival + score, bet: false, isTurn: bool})
      });
      socket.on("gameEnds", (data) =>{
        let dataCopy = Object.assign({}, data)
        console.log('ESTA ES LA DATA DE GAME ENDS:', dataCopy)
        if(tournamentMatchId){
          if(finishedFirstMatch===false && finishedSecondMatch===false && finishedThirdMatch===false){
            alert("Partida terminada. Ganador:", dataCopy.winner);
            dispatch(setIsInRoom({isInRoom: false, roomId: null}));
            if(dataCopy.winner === localStorage.user) setWins([...wins, dataCopy.winner])
            setShowFirstMatch(false)
            setFinishedFirstMatch(true)
          }
          if(finishedFirstMatch===true && finishedSecondMatch===false && finishedThirdMatch===false){
            alert("Partida terminada. Ganador:", dataCopy.winner);
            dispatch(setIsInRoom({isInRoom: false, roomId: null}));
            if(dataCopy.winner === localStorage.user) setWins([...wins, dataCopy.winner])
            setShowSecondMatch(false)
            setFinishedSecondMatch(true)
          }
          if(finishedFirstMatch===true && finishedSecondMatch===true && finishedThirdMatch===false){
            alert("Partida terminada. Ganador:", dataCopy.winner);
            dispatch(setIsInRoom({isInRoom: false, roomId: null}));
            if(dataCopy.winner === localStorage.user) setWins([...wins, dataCopy.winner])
            setShowThirdMatch(false)
            setFinishedThirdMatch(true)
          }

        } else{
          console.log("termino");
          history.push("/profile");
          alert("el juego termino");
          dispatch(setIsInRoom({isInRoom: false, roomId: null}));
        }
      },);
      socket.on("surrender",()=>{
        alert("El otro jugador se rindio, TU GANAS!");
        socket.emit("surrender2", roomId);
        dispatch(setIsInRoom({isInRoom: false, roomId: null}));
      });
      socket.on("addFriend", (idSender)=>{
        // dispatch(sendFriendRequest({idSender, email: userProfile.email}));
        console.log("casi");
        userProfile.email && idSender && axios.post(`https://trucohenry.com/api/friends/${idSender}/${userProfile.email}`)
      })
      let handler = event =>{
        if(!scoreBox.current.contains(event.target)){
          setPointsBox(false);
        }
      }
      document.addEventListener("mousedown", handler)
      return () =>{ //limpieza de eventos
        socket.off("gameStarts");
        socket.off('newRoundStarts');
        socket.off("bet");
        socket.off("playCard");
        socket.off("playerOrder");
        socket.off("betting");
        socket.off("changeTurn");
        socket.off("gameEnds");
        socket.off("quieroTruco");
        socket.off("quieroEnvido1");
        socket.off("envido1");
        socket.off("updateScore");
        socket.off("updateRivalScore");
        socket.off("surrender");
        socket.off("addFriend");
        document.removeEventListener("mousedown", handler)
      };
    },[player]);
    useEffect(()=>{
      setTimeout(()=>setNewRound(false), 3000);
    },[newRound])
    useEffect(()=>{
      setPointsBox(true)
      setTimeout(()=>setPointsBox(false), 2000);
    },[player.score, player.scoreRival])
    useEffect(()=>{
      if(player.isTurn && !isYourTurn && !player.tablePlayer[2]){
        setIsYourTurn(true)
        console.log("is your turn")
        setTimeout(()=>setIsYourTurn(false), 1000);
      } 
    },[player.isTurn])
    console.log(player) //para testing
    return(<div id={stylesGame.gameBackground}>
            <div id={stylesGame.cardZone}>
              <ol >{[...Array(3-player.tableRival.length).keys()].map(card=><div key={card} id={stylesGame.rivalHand}><img src={`/cards/0.webp`} className={stylesGame.cardsImg}/></div>)}</ol>
              <div id={stylesGame.cardsContainer}>
              
                <ol>{player.tableRival?.map(card => <div key={card.id} className={stylesGame.tableCards}><img src={`/cards/${card.id}.webp`}  className={stylesGame.cardsImg}/></div>)}</ol>
                <ol>{player.tablePlayer?.map(card => <div key={card.id} className={stylesGame.tableCards}><img src={`/cards/${card.id}.webp`}  className={stylesGame.cardsImg}/></div>)}</ol>
              </div>
            
            <ol>{player.hand?.map(card => <div key={card.id} onClick={()=>playCard(card)} id={player.isTurn && !player.bet? stylesGame.playerHandActive : stylesGame.playerHand}><img src={`/cards/${card.id}.webp`}  className={stylesGame.cardsImg}/></div>)}</ol><br/>
            </div>

            <div id={stylesGame.points} ref={scoreBox} style={{ display: pointBox? "flex" : "none", position: "absolute",zIndex:"999"}}>
              <div style={{ height: "20%"}}>
                <h2>{player.name}</h2>
                {player.score? <img src={player.score<=30? `/points/${player.score}.png.webp` : "/points/30.png.webp"}/> : <div></div>}
              </div>
              <div style={{ height: "20%"}}>
                <h2>{player.nameRival}</h2>
                {player.scoreRival? <img src={player.scoreRival<=30? `/points/${player.scoreRival}.png.webp` : "/points/30.png.webp"}/> : <div></div>}
              </div>
            </div>

            <div id={stylesGame.containerChat}>
              <div id={stylesGame.optionsButtons}>
                <button className={stylesGame.btnOptions} onClick={showScore}>Puntaje</button>
                <button className={stylesGame.btnOptions} onClick={report}>Reportar</button>
                <button className={stylesGame.btnOptions} onClick={addFriend}>Agregar amigo</button>
                <button className={stylesGame.btnOptions} onClick={surrender}>Salir</button>
                <button className={stylesGame.btnOptions} onClick={tutorial}>❔</button>
              </div>
              <Chat name={player.name} roomId={roomId}/>
                <div id={"betContainer"}>
                  {player.betOptions?.map(betPick=><button onClick={bet} name={betPick} key={betPick} className={player.isTurn? stylesGame.btnBet : stylesGame.btnBetNoTurn}>{betPick}</button>)}
                </div>
            </div>
            <div><img src={`/cards/shuffle.gif`} style={{width: "50%", heigth: "30%", display: newRound? "flex" : "none", position: "absolute", left:"30%", bottom: "0%",zIndex:"999"}}/></div>
            <div id={stylesGame.isYourTurn} style={{display: isYourTurn? "flex" : "none"}}><h1>ES TU TURNO</h1></div>
          </div> 
    );
};