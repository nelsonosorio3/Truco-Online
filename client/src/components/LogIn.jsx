import { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { Redirect } from 'react-router-dom'; 

import useUser from '../hooks/useUser';

import NavBar from './NavBar';

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

export default function LogIn({onLogin}) {

    const dispatch = useDispatch();

    const [state, setState] = useState(initialState);
    
    const [errors, setErrors] = useState(initialState);

    const { isLoginLoading, hasLoginError, login, isLogged } = useUser();
    
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
        dispatch(login(state));
        setState(initialState);
        setErrors(initialState);
    };

    useEffect(() => {
        if(isLogged) {
            <Redirect to='/rooms'/>
            onLogin && onLogin()
        };
    }, [isLogged, onLogin]);

    return (
        <>
            <NavBar />
            <section className={styles.container}>
                {isLoginLoading && <strong> Checking credentials... </strong>}   
                {!isLoginLoading &&             
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <label className={styles.label} htmlFor="user" > User: </label>
                        <input
                            type="text"
                            id="user"
                            name = "user"
                            value={state.user}
                            placeholder="Put here the username"
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
                            placeholder="Put here the password"
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
                }
                {
                    hasLoginError && <strong> Credentials are invalid. </strong>
                }
            </section>
        </>
    );
};