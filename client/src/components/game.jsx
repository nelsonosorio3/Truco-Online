import React, { useState, useEffect } from 'react';
import stylesGame from './styles/game.module.css';
import socket from './socket';
import {useDispatch, useSelector} from 'react-redux'
import Chat from './rooms/Chat';
import { useHistory } from "react-router-dom";
import { setIsInRoom } from '../Redux/actions-types/roomsActions';
import axios from 'axios';


export default function Game({tournamentMatchId}) {
    var roomId = useSelector(store => store.roomsReducer.roomId); //traer el id de la sala en la que esta el jugador
    if(tournamentMatchId) roomId = tournamentMatchId;
    const [player, setPlayer] = useState({ //objeto del jugador en el cliente deberia tener solo propiedades que se usan para renderizar o limitar interacciones en el cliente
        id: 1, // socket id del jugador
        name: "player", // la idea seria que sea el nombre del profile
        nameRival: "otherPlayer",
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
    const history = useHistory();
    const dispatch = useDispatch();
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
      socket.on("gameStarts", player=>{ //escucha gameStarts para iniciar cuando la sala se llena y dejar el estado jugador listo
        setPlayer(player);
      });
      socket.on("newRoundStarts", player=>{  //escucha para empezar nueva partida
        setPlayer(player);
      });
      socket.on("bet", async (betOptions, bool)=>{  //trae la apuesta segun turno
        setPlayer({...player, betOptions, bet: bool});
      });
      socket.on("betting", bool=>{  //cambia el estado de si se esta apostando para bloquear jugar cartas hasta resolverlo
        setPlayer({...player, bet: false, betOptions: [], isTurn: !player.isTurn});
      });
      socket.on("playCard", card=>{  //escucha carta jugada por rival
        setPlayer({...player, tableRival:  [...player.tableRival, card], isTurn: true}); 
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
      socket.on("gameEnds", data=>{
        console.log("termino");
        history.push("/profile");
        alert("el juego termino");
        dispatch(setIsInRoom({isInRoom: false, roomId: null}));
      });
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
      };
    },[player]);
    
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

            <div id={stylesGame.points}>
              <div>
                <h2>{player.name}</h2>
                {player.score? <img src={player.score<=30? `/points/${player.score}.png.webp` : "/points/30.png.webp"}/> : <div></div>}
              </div>
              <div>
                <h2>{player.nameRival}</h2>
                {player.scoreRival? <img src={player.scoreRival<=30? `/points/${player.scoreRival}.png.webp` : "/points/30.png.webp"}/> : <div></div>}
              </div>
            </div>

            <div id={stylesGame.containerChat}>
              <Chat name={player.name} roomId={roomId}/>
                <div className={"betContainer"}>
                  {player.betOptions?.map(betPick=><button onClick={bet} name={betPick} key={betPick} className={player.isTurn? stylesGame.btnBet : stylesGame.btnBetNoTurn}>{betPick}</button>)}<br/>
                </div>
            </div>
          </div> 
    );
};