import React from 'react';
import { useDispatch , useSelector } from 'react-redux';
import { Redirect } from 'react-router'

import NavBar from './NavBar'; 

export default function Ranking() {
    
    const { isAuth } = useSelector(state => state.logReducer);

    return(
        <div>
            {isAuth ? <></> : <Redirect to="/rooms" />}
            <NavBar />
            <div > 
                Probando ranking
            </div>
        </div>
    );
};