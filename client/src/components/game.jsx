import React, { useState, useEffect } from 'react';
import styles from './styles/game.module.css';
import socket from './socket';
import {useDispatch, useSelector} from 'react-redux'



export default function Game() {
    const roomId = useSelector(store => store.roomsReducer.roomId); //traer el id de la sala en la que esta el jugador
    const [player, setPlayer] = useState({ //objeto del jugador en el cliente deberia tener solo propiedades que se usan para renderizar o limitar interacciones en el cliente
        name: "player",
        score: 0,
        hand: [],
        isTurn: false,
        roundChange: 1,
        betOptions: [],
        tableRival: [],
        tablePlayer: [],
        bet: false,
        roundResults: [],
      });
    
    console.log(roomId)
    function roundCheckWinner(playerCard, rivalCard){
      console.log(playerCard)
      if(playerCard.truco < rivalCard.truco){
        setPlayer({...player, roundResults: [...player.roundResults, "win"]});
      }
      else if(playerCard.truco > rivalCard.truco){
        setPlayer({...player, roundResults: [...player.roundResults, "loss"]});
      }
      else{
        setPlayer({...player, roundResults: [...player.roundResults, "tie"]});
      }
    }

    function checkWinnerMatch(rounds){
      console.log(rounds)
      if((rounds.filter(round => round === "win").length >1) || 
        (rounds.filter(round => round === "tie").length === 2 && rounds.some(round => round === "win")) ||
        rounds.every(round => round === "tie")){
          setPlayer({...player, score: ++player.score, roundChange: ++player.roundChange})
          roundWin();
          return
        } 
      if(rounds.length >= 3){
        for (let i = 0; i < 3; i++) {
          if(rounds[i] === "win") {setPlayer({...player, score: ++player.score, roundChange: ++player.roundChange}); roundWin()};
        }
      }
    }

    const newRoundStarts = async () => {
      player.isTurn && socket.emit('newRoundStarts', roomId);
    }

    const bet = async (e) =>{
      player.isTurn && socket.emit("bet", e.target.name, roomId);
    }

    const roundWin = () =>{
      socket.emit("roundWin", roomId, socket.id)
    }
    const playCard = async (card) =>{
      // if(!player.mesa1) setPlayer({...player, hand: player.hand.filter(cardH=> card.id !== cardH.id), mesa1: card});
      // else if (!player.mesa2) setPlayer({...player, hand: player.hand.filter(cardH=> card.id !== cardH.id), mesa2: card});
      if(player.isTurn){
      setPlayer({...player, hand: player.hand.filter(cardH=> card.id !== cardH.id), tablePlayer: [...player.tablePlayer, card]});
      socket.emit("playCard", card, roomId)
      console.log(card)}
    }

    const passTurn = () =>{
      socket.emit('passTurn');
    }

    const changeTurn = () =>{
      socket.emit("changeTurn", roomId);
    };
    
    const turnTwo = () =>{
      socket.emit("turnTwo");
    }

    
    useEffect(()=>{
        socket.on("newRoundStarts", hand=>{
          console.log(hand)
          socket.emit('passTurn')
          setPlayer({...player, hand, tableRival: [], tablePlayer: [], roundResults: []});
        });
        socket.on("bet", betOptions=>{
          console.log(betOptions);
          setPlayer({...player, betOptions});
          changeTurn();
        });
        socket.on("playCard", card=>{
          // console.log(card)
          setPlayer({...player, tableRival:  [...player.tableRival, card]});
          if(player.tableRival[0] && player.tablePlayer[0]) turnTwo();
          changeTurn();
        });
        socket.on("playerOrder", (isTurn)=>setPlayer({...player, isTurn}));
        return () =>{
          socket.off('newRoundStarts');
          socket.off("bet");
          socket.off("playCard");
          socket.off("playerOrder");
        };
      });

      useEffect(()=>{
        if(player.tablePlayer[0] && player.tableRival[0]){
          socket.on("checkWinnerHand", player.tablePlayer[0], player.tablePlayer[0])
          turnTwo();
        } 
        if(player.tablePlayer[0] && player.tableRival[0] && player.roundResults.length === 0) roundCheckWinner(player.tablePlayer[0], player.tableRival[0])
        if(player.tablePlayer[1] && player.tableRival[1] && player.roundResults.length === 1) roundCheckWinner(player.tablePlayer[1], player.tableRival[1])
        if(player.tablePlayer[2] && player.tableRival[2] && player.roundResults.length === 2) roundCheckWinner(player.tablePlayer[2], player.tableRival[2])
        

      }, [player.tablePlayer, player.tableRival])

      useEffect(()=>{
        if(player.roundResults.length > 1) checkWinnerMatch(player.roundResults)
      },[player.roundResults])

      console.log(player)
      if(player.roundChange > 2) {newRoundStarts(); setPlayer({...player, roundChange:1})}
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