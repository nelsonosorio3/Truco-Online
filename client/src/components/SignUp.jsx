import React, { useState } from 'react';
import { useDispatch } from "react-redux";

import NavBar from './NavBar';

import signUpActions from '../Redux/actions-types/signUpActions';

import styles from './styles/SignUp.module.css';

const ALPHA = /^[a-zA-Z\s]+$/;
const EMAIL = /^[^@]+@[^@]+\.[^@]+$/;

function validate(state) {
  let errors = {};
  if(!state.user) {
    errors.user = 'You have to enter a user name...';
  } else if (state.user.length < 4) {
      errors.user = 'The user is invalid. Must be more than 4 characters...';
  } else if(!ALPHA.test(state.user)) {
      errors.user = 'Only letters are allowed...'
  };
  if(!state.email) {
    errors.email = 'You have to enter an email...';
  } else if(!EMAIL.test(state.email)) {
      errors.email = 'The email is invalid';
  };
  if(!state.password) {
    errors.password = 'You have to enter a password...';
  } else if (state.password.length < 4) {
      errors.password = 'The password is invalid';
  };
  return errors;
};

const initialState = {
    user: '',
    email: '',
    password: '',
};

export default function SignUp() {

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
        dispatch(signUpActions(state));
        event.preventDefault();
        setState(initialState);
        setErrors(initialState);
    };

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
                <label className={styles.label} htmlFor="email"> Email: </label>
                <input 
                    type="email"
                    id='email'
                    name="email"
                    value={state.email}
                    autoComplete="off"
                    className={styles.input}
                    onChange={handleChange}
                />
                {errors.email && (<p className={styles.danger}> {errors.email} </p>)}
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
                {((!errors.user && !errors.email && !errors.password) 
                    && 
                    (errors.user !== '' && errors.email !== '' && errors.password !== '')) 
                    ? 
                    (<button type="submit" className={styles.button}> Create User </button>) 
                    : 
                    <button type="submit" className={styles.disabled} disabled> Create User </button>}
                </form> 
            </div>
        </>
    );
};