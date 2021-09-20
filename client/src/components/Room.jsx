import React, {useEffect, useState} from 'react';
import Chat from './Chat';

export default function JoinRoom() {
  const [name, setName] = useState('');
  const [registered, setRegistered] = useState(false);

  const register = (event) => {
    event.preventDefault();
    if(name !== '') setRegistered(true);
  }

  return (
    <div>
      {
      !registered
      ?
      <form onSubmit={register}>
        <label htmlFor="">Write your name</label>
        <input type={name} onChange={event => setName(event.target.value)}/>
        <button>Go to chat</button>
      </form>
      :
      <Chat name={name}/>
      }
    </div>
  );
}