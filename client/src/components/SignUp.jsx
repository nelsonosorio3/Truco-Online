import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router';
import { useModal } from '../hooks/useModal';

import HomeButton from './HomeButton';
import Modal from "./Modal";

import signUpActions from '../Redux/actions-types/signUpActions';

import styles from './styles/SignUp.module.css';

const ALPHA = /^[a-zA-Z\s]+$/;
const EMAIL = /^[^@]+@[^@]+\.[^@]+$/;

function validate(state) {
  let errors = {};
  if(!state.username) {
    errors.username = 'You have to enter a user name...';
  } else if (state.username.length < 4) {
      errors.username = 'The user is invalid. Must be more than 4 characters...';
  } else if(!ALPHA.test(state.username)) {
      errors.username = 'Only letters are allowed...'
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
    username: '',
    email: '',
    password: '',
};

export default function SignUp() {
    const logged = window.localStorage.getItem("isAuth");

    const history = useHistory();

    const { registered, message } = useSelector(state => state.signUpReducer);
    
    const dispatch = useDispatch();

    const [state, setState] = useState(initialState);
    
    const [errors, setErrors] = useState(initialState);

    const [isOpenModal, openModal, closeModal] = useModal();

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
        dispatch(signUpActions.signUpActions(state));
        openModal();
        setState(initialState);
        setErrors(initialState);

    };

    useEffect(() => {
        // para saber si el usuario se registro con exito
        if(logged) {
            setTimeout(() => {
                history.push('rooms');
            }, 0);
        };
        if(registered) {
            setTimeout(() => {
                history.push('log-in');
            }, 3000);
        };
    }, [registered]);

    return (
        <>
            <HomeButton />
            <section className={styles.container}>
                <form className={styles.form} onSubmit={handleSubmit}>
                <label className={styles.label} htmlFor="username" > User: </label>
                <input
                    type="text"
                    id="username"
                    name = "username"
                    value={state.username}
                    placeholder="Put here the username"
                    autoComplete="off"
                    className={styles.input}
                    onChange={handleChange}
                />
                {errors.username && (<p className={styles.danger}> {errors.username} </p>)}
                <label className={styles.label} htmlFor="email"> Email: </label>
                <input 
                    type="email"
                    id='email'
                    name="email"
                    value={state.email}
                    placeholder="Put here your email"
                    autoComplete="off"
                    className={styles.input}
                    onChange={handleChange}
                />
                {errors.email && (<p className={styles.danger}> {errors.email} </p>)}
                <label className={styles.label} htmlFor="password"> Password: </label>
                <input 
                    type='password'
                    id='password'
                    name="password"
                    value={state.password}
                    placeholder="Put here the password"
                    autoComplete="off"
                    className={styles.input}
                    onChange={handleChange}
                    />
                {errors.password && (<p className={styles.danger}> {errors.password} </p>)}
                {((!errors.username && !errors.email && !errors.password) 
                    && 
                    (errors.username !== '' && errors.email !== '' && errors.password !== '')) 
                    ? 
                    (<button type="submit" className={styles.button}> Create User </button>) 
                    : 
                    <button type="submit" className={styles.disabled} disabled> Create User </button>}
                </form> 
            </section>
            <Modal isOpen={isOpenModal} closeModal={closeModal}>
              <h3>Status:</h3>
              <p>{message}</p>
              {
                registered ? 
                <p>Redirecting...</p>
                :
                null
              }
            </Modal> 
        </>
    );
};