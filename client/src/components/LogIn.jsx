import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

import NavBar from './NavBar';

import signUpActions from '../Redux/actions-types/signUpActions';

import styles from './styles/LogIn.module.css';

function validate(state) {
  let errors = {};
  if(!state.user) {
    errors.user = 'You have to enter a user name...';
  };
  if(!state.password) {
    errors.password = 'You have to enter a password...';
  };
  return errors;
};

const initialState = {
    user: '',
    password: '',
};

export default function LogIn() {

    const isAuth = useSelector(state => state.isAuth);
    
    const dispatch = useDispatch();

    const [state, setState] = useState(initialState);
    
    const [errors, setErrors] = useState(initialState);
    
    function handleChange(event) {
        const { name, value } = event.target;
        setErrors(validate({
          ...state,
          [name]: value
        }));
        setState({
          ...state,
          [name]: value,
        });
    };

    function handleSubmit(event) {
        event.preventDefault();
        dispatch(signUpActions(state));
        setState(initialState);
        setErrors(initialState);
    };

    useEffect(() => {
        if(isAuth) {
            // para saber si el usuario se registro con exito
            // si asi fue mostrar mensaje de exito, guardar en local y redirigir
        };
    }, [isAuth]);

    return (
        <>
            <NavBar />
            <div className={styles.container}>
                <form className={styles.form} onSubmit={handleSubmit}>
                <label className={styles.label} htmlFor="user" > User: </label>
                <input
                    type="text"
                    id="user"
                    name = "user"
                    value={state.user}
                    autoComplete="off"
                    className={styles.input}
                    onChange={handleChange}
                />
                {errors.user && (<p className={styles.danger}> {errors.user} </p>)}
                <label className={styles.label} htmlFor="health"> Password: </label>
                <input 
                    type='text'
                    id='password'
                    name="password"
                    value={state.password}
                    autoComplete="off"
                    className={styles.input}
                    onChange={handleChange}
                    />
                {errors.password && (<p className={styles.danger}> {errors.password} </p>)}
                {((!errors.user && !errors.password) 
                    && 
                    (errors.user !== '' && errors.password !== '')) 
                    ? 
                    (<button type="submit" className={styles.button}>Login</button>) 
                    : 
                    <button type="submit" className={styles.disabled} disabled>Login</button>}
                </form> 
            </div>
        </>
    );
};