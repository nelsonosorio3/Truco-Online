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
        tableRival: [],
        tablePlayer: [],
      });

    const newRoundStarts = async () => {
      socket.emit('newRoundStarts')
    }

    const bet = async (e) =>{
      socket.emit("bet", e.target.name)
    }

    const playCard = async (card) =>{
      // if(!player.mesa1) setPlayer({...player, hand: player.hand.filter(cardH=> card.id !== cardH.id), mesa1: card});
      // else if (!player.mesa2) setPlayer({...player, hand: player.hand.filter(cardH=> card.id !== cardH.id), mesa2: card});
      setPlayer({...player, hand: player.hand.filter(cardH=> card.id !== cardH.id), tablePlayer: [...player.tablePlayer, card]});
      socket.emit("playCard", card)
      console.log(card)
    }

    const passTurn = () =>{
      socket.emit('passTurn')
    }

    const changeTurn = () =>{
      socket.emit("changeTurn")
    };

    useEffect(()=>{
        socket.on("newRoundStarts", hand=>{
          console.log(hand)
          socket.emit('passTurn')
          setPlayer({...player, hand, tableRival: [], tablePlayer: []});
        });
        socket.on("bet", betOptions=>{
          console.log(betOptions);
          setPlayer({...player, betOptions});
          changeTurn();
        });
        socket.on("playCard", card=>{
          console.log(card)
          setPlayer({...player, tableRival:  [...player.tableRival, card]});
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
      console.log(player)
    return(<div>
            {/* <div className={styles.image}>  */}
            {/* </div> */}
            <button onClick={newRoundStarts}>New round Start</button>
            {player.betOptions?.map(betPick=><button onClick={bet} name={betPick} key={betPick} style = {{ padding: "30px" }}>{betPick}</button>)}<br/>
            {player.hand?.map(card => <div onClick={()=>playCard(card)}><h2>{card.suit}</h2><h2>{card.number}</h2></div>)}<br/>
            <div style ={{ display: "flex", flexDirection: "column" }}>
            {player.tableRival?.map(card => <div style = {{ display: "flex", flexDirection: "row" }}><h2>{card.suit}</h2><h2>{card.number}</h2></div>)}
            {player.tablePlayer?.map(card => <div style = {{ display: "flex", flexDirection: "row" }}><h2>{card.suit}</h2><h2>{card.number}</h2></div>)}
            </div>
            </div>
            
    );
};