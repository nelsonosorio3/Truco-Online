import React, { useState, useEffect } from 'react';
import styles from './styles/game.module.css';
import socket from './socket';
import {useDispatch, useSelector} from 'react-redux'



export default function Game() {
    const roomId = useSelector(store => store.roomsReducer.roomId); //traer el id de la sala en la que esta el jugador
    const [player, setPlayer] = useState({ //objeto del jugador en el cliente deberia tener solo propiedades que se usan para renderizar o limitar interacciones en el cliente
        id: 1, // socket id del jugador
        name: "player", // la idea seria que sea el nombre del profile
        score: 0,  // puntaje que lleva
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
    
    const bet = e => {
      if(player.isTurn){
        socket.emit("bet", e.target.name, roomId, player.id);
        setPlayer({...player, bet:true, isTurn:false})
      };
    };

    const newRoundStarts = () => {
      player.isTurn && socket.emit('newRoundStarts', roomId);
    };

    const playCard = (card) =>{
      // if(!player.mesa1) setPlayer({...player, hand: player.hand.filter(cardH=> card.id !== cardH.id), mesa1: card});
      // else if (!player.mesa2) setPlayer({...player, hand: player.hand.filter(cardH=> card.id !== cardH.id), mesa2: card});
      if(player.isTurn && !player.bet){
      setPlayer({...player, hand: player.hand.filter(cardH=> card.id !== cardH.id), tablePlayer: [...player.tablePlayer, card], isTurn: false});
      socket.emit("playCard", card, roomId, player.id);
      };
    };

    const changeTurn = () =>{
      socket.emit("changeTurn", roomId, player.id);
    };
    
    useEffect(()=>{
      socket.on("gameStarts", player=>{ //escucha gameStarts para iniciar cuando la sala se llena y dejar el estado jugador listo
        setPlayer(player);
      });
      socket.on("newRoundStarts", player=>{
        setPlayer(player);
      });
      socket.on("bet", async betOptions=>{
        // await changeTurn();
        setPlayer({...player, betOptions});
      });
      socket.on("betting", bool=>{
        setPlayer({...player, bet: bool});
      });
      socket.on("playCard", async card=>{
        // await changeTurn();
        setPlayer({...player, tableRival:  [...player.tableRival, card]}); 
      });
      socket.on("updateScore", score=>{
        setPlayer({...player, score: player.score + score})
      });
      socket.on("changeTurn", bool=>{
        setPlayer({...player, isTurn: bool});
      });
      // socket.on("noFirstTurn", betOptions=>{
      //   setPlayer({...player, betOptions});
      // })
      // socket.on("changeTurn", (bool)=>setPlayer({...player, isTurn: bool}));
      return () =>{
        socket.off("gameStarts");
        socket.off('newRoundStarts');
        socket.off("bet");
        socket.off("playCard");
        socket.off("playerOrder");
        socket.off("betting");
        socket.off("changeTurn");
      };
    });

    console.log(player)
    return(<div>
            {/* <div className={styles.image}>  */}
            {/* </div> */}
            <button onClick={newRoundStarts}>New round Start</button>
            {player.betOptions?.map(betPick=><button onClick={bet} name={betPick} key={betPick} style = {{ padding: "30px" }}>{betPick}</button>)}<br/>
            {player.hand?.map(card => <div onClick={()=>playCard(card)}><h2>{card.suit}</h2><h2>{card.number}</h2></div>)}<br/>
            <div style ={{ display: "flex", flexDirection: "row" }}>
            <ol>{player.tableRival?.map(card => <li key={card.id}style = {{ display: "flex", flexDirection: "row" }}><h2>{card.suit}</h2><h2>{card.number}</h2></li>)}</ol>
            <ol>{player.tablePlayer?.map(card => <div key={card.id}style = {{ display: "flex", flexDirection: "row" }}><h2>{card.suit}</h2><h2>{card.number}</h2></div>)}</ol>
            </div>
            </div>    
    );
};