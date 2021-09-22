import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from "react-redux";

import ModalController from "./Modal";
import HomeButton from './HomeButton';

import log from '../Redux/actions-types/logActions';

import styles from './styles/LogIn.module.css';

const EMAIL = /^[^@]+@[^@]+\.[^@]+$/;

function validate(state) {
  let errors = {};
  if(!state.emailInput) {
    errors.emailInput = 'You have to enter an email...';
  } else if(!EMAIL.test(state.emailInput)) {
    errors.emailInput = 'The email is invalid';
  };
  if(!state.passwordInput) {
    errors.passwordInput = 'You have to enter a password...';
  };
  return errors;
};

const initialState = {
    emailInput: '',
    passwordInput: '',
};

export default function LogIn() {

  const dispatch = useDispatch();
    
  const history = useHistory();
    
  const { isAuth, message, token  } = useSelector(state => state.logReducer);

  const { logIn } = log;

  const [state, setState] = useState(initialState);
  const [errors, setErrors] = useState(initialState);

  // Esto es para el modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
      dispatch(logIn(state)); 
      setState(initialState);
      setErrors(initialState);
      
      // Para el modal
      handleShow()
  };

  useEffect(() => {
    if(isAuth) {
      localStorage.setItem("token", token)
      history.push('/rooms');

      // setTimeout(() => {
      //   history.push('/rooms');
      // }, 3000);
    }
  }, [isAuth]);

  return (
        <>
            <HomeButton />
            {/* Este es el modal. El state que lo determina es "show" */}
            <ModalController show={show} handleClose={handleClose} message={message}/>

            <section className={styles.container}>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <label className={styles.label} htmlFor="emailInput" > Email: </label>
                        <input
                            type="text"
                            id="emailInput"
                            name = "emailInput"
                            value={state.emailInput}
                            placeholder="Put your email"
                            autoComplete="off"
                            className={styles.input}
                            onChange={handleChange}
                        />
                        {errors.emailInput && (<p className={styles.danger}> {errors.emailInput} </p>)}
                        <label className={styles.label} htmlFor="passwordInput"> Password: </label>
                        <input 
                            type='password'
                            id='passwordInput'
                            name="passwordInput"
                            value={state.passwordInput}
                            placeholder="Put here the password"
                            autoComplete="off"
                            className={styles.input}
                            onChange={handleChange}
                            />
                        {errors.passwordInput && (<p className={styles.danger}> {errors.passwordInput} </p>)}
                        {((!errors.emailInput && !errors.passwordInput) 
                            && 
                            (errors.emailInput !== '' && errors.passwordInput !== '')) 
                            ? 
                            (<button type="submit" className={styles.button}>Login</button>) 
                            : 
                            <button type="submit" className={styles.disabled} disabled>Login</button>}
                    </form> 
            </section>

        </>
    );
};

//-------------------------------------------------------------------------------------
// FALTA TERMINAR

// export default function LogIn({onLogin}) {

//     const dispatch = useDispatch();

//     const [state, setState] = useState(initialState);
    
//     const [errors, setErrors] = useState(initialState);

//     const { isLoginLoading, hasLoginError, login, isLogged } = useUser();
    
//     function handleChange(event) {
//         const { name, value } = event.target;
//         setErrors(validate({
//           ...state,
//           [name]: value
//         }));
//         setState({
//           ...state,
//           [name]: value,
//         });
//     };

//     function handleSubmit(event) {
//         event.preventDefault();
//         dispatch(login(state));
//         setState(initialState);
//         setErrors(initialState);
//     };

//     useEffect(() => {
//         if(isLogged) {
//             <Redirect to='/rooms'/>
//             onLogin && onLogin()
//         };
//     }, [isLogged, onLogin]);

//     return (
//         <>
//             <NavBar />
//             <section className={styles.container}>
//                 {isLoginLoading && <strong> Checking credentials... </strong>}   
//                 {!isLoginLoading &&             
//                     <form className={styles.form} onSubmit={handleSubmit}>
//                         <label className={styles.label} htmlFor="user" > User: </label>
//                         <input
//                             type="text"
//                             id="user"
//                             name = "user"
//                             value={state.user}
//                             placeholder="Put here the username"
//                             autoComplete="off"
//                             className={styles.input}
//                             onChange={handleChange}
//                         />
//                         {errors.user && (<p className={styles.danger}> {errors.user} </p>)}
//                         <label className={styles.label} htmlFor="health"> Password: </label>
//                         <input 
//                             type='text'
//                             id='password'
//                             name="password"
//                             value={state.password}
//                             placeholder="Put here the password"
//                             autoComplete="off"
//                             className={styles.input}
//                             onChange={handleChange}
//                             />
//                         {errors.password && (<p className={styles.danger}> {errors.password} </p>)}
//                         {((!errors.user && !errors.password) 
//                             && 
//                             (errors.user !== '' && errors.password !== '')) 
//                             ? 
//                             (<button type="submit" className={styles.button}>Login</button>) 
//                             : 
//                             <button type="submit" className={styles.disabled} disabled>Login</button>}
//                     </form> 
//                 }
//                 {
//                     hasLoginError && <strong> Credentials are invalid. </strong>
//                 }
//             </section>
//         </>
//     );
// };