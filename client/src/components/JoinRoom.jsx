import React, {useEffect, useState} from 'react';
import Chat from './Chat';
import Socket from './socket';
// import {io} from 'socket.io-client'
// import socketService from '../services/socketService';
// import GameContext, { IGameConetxtProps } from '../gameContext';
import JoinRoomForm from './JoinRoomForm';

export default function JoinRoom() {
  return (
    <div>
      <JoinRoomForm />
    </div>
  );
}

// import React, {useEffect, useState} from 'react';
// import Chat from './Chat';
// import Socket from './socket';
// // import {io} from 'socket.io-client'
// // import socketService from '../services/socketService';
// // import GameContext, { IGameConetxtProps } from '../gameContext';
// // import JoinRoomForm from './JoinRoomForm';

// export default function JoinRoom() {
//   const [name, setName] = useState('');
//   const [registered, setRegistered] = useState(false);

//   const register = (event) => {
//     event.preventDefault();
//     if(name !== '') setRegistered(true);
//   }
//   // const [isInRoom, setInRoom] = useState(false)

//   // const connectSocket = async () => {
//   //   const socket = await socketService.connect('http://localhost:9000').catch((error) => {
//   //     console.log('Error:', error);
//   //   });
//   // };

//   // useEffect(() => {
//   //   connectSocket();
//   // }, [])

//   // const gameContextValue: IGameConetxtProps = {
//   //   isInRoom,
//   //   setInRoom
//   // }

//   return (
//     <div>
//       {
//       !registered
//       ?
//       <form onSubmit={register}>
//         <label htmlFor="">Write your name</label>
//         <input type={name} onChange={event => setName(event.target.value)}/>
//         <button>Go to chat</button>
//       </form>
//       :
//       <Chat name={name}/>
//       }
//     </div>
//     // <GameContext.Provider value={gameContextValue}>
//     //       <JoinRoomForm />
//     // </GameContext.Provider>
//   );
// }



