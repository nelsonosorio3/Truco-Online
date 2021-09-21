import React, { useState, useEffect } from 'react';
import styles from './styles/game.module.css';
import socket from './socket';

export default function Game() {
    const [player, setPlayer] = useState({
        name: "player",
        score: 0,
        hand: [],
        action: "",
        mesa1: null,
        mesa2: null,
        mesa3: null,
        rounds: [],
        isTurn: false,
        turnNumber: 1,
        betOptions: [],
      });

    const newRoundStarts = async () => {
        socket.emit('newRoundStarts')
    }

    const bet = async (e) =>{
        socket.emit("bet", e.target.name)
    }

    const playCard = async (card) =>{
      if(!player.mesa1) setPlayer({...player, hand: player.hand.filter(cardH=> card.id !== cardH.id), mesa1: card});
      else if (!player.mesa2) setPlayer({...player, hand: player.hand.filter(cardH=> card.id !== cardH.id), mesa2: card});
      else setPlayer({...player, hand: player.hand.filter(cardH=> card.id !== cardH.id), mesa3: card});
      socket.emit("playCard", card)
      console.log(card)
    }
    useEffect(()=>{
        socket.on("newRoundStarts", (hand)=>{
            console.log(hand)
            setPlayer({...player, hand});
        });
        socket.on("bet", (betOptions)=>{
            console.log(betOptions)
            setPlayer({...player, betOptions})
        })
        return () =>{
          socket.off('newRoundStarts');
          socket.off("bet");
        };
      });
      console.log(player)
    return(<div>
            <div className={styles.image}> 
            </div>
            <button onClick={newRoundStarts}>New round Start</button>
            {player.betOptions?.map(betPick=><button onClick={bet} name={betPick} key={betPick} style = {{ padding: "30px" }}>{betPick}</button>)}<br/>
            {player.hand?.map(card => <div onClick={()=>playCard(card)}><h2>{card.suit}</h2><h2>{card.number}</h2></div>)}
            </div>
            
    );
};