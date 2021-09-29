import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router';
import { useModal } from '../hooks/useModal';

import editProfileActions from '../Redux/actions-types/editProfileActions';

import Modal from "./Modal";
import Avatars from './Avatars';
import Loading from './Loading';

import styles from './styles/EditProfile.module.css';

const ALPHA = /^[a-zA-Z\s]+$/;
const EMAIL = /^[^@]+@[^@]+\.[^@]+$/;

function validate(state) {
  let errors = {};
  if(!state.username) {
    errors.username = 'Ingresa tu nombre de usuario...';
  } else if (state.username.length < 4) {
      errors.username = 'Nombre inválido. Debe contener más de 3 caracteres...';
  } else if(!ALPHA.test(state.username)) {
      errors.username = 'Solo se aceptan letras...'
  };
  if(!state.email) {
    errors.email = 'Ingresa tu email...';
  } else if(!EMAIL.test(state.email)) {
      errors.email = 'El email es inválido...';
  };
  if(!state.password) {
    errors.password = 'Ingresa un contraseña...';
  } else if (state.password.length < 4) {
      errors.password = 'Contraseña inválida. Debe contener más de 3 caracteres...';
  };
  return errors;
};

const initialState = {
    username: null,
    email: null,
    previousEmail: null ,
    password: null,
    image: null,
};

export default function EditProfile() {

    const history = useHistory();

    const { getEditProfile, putEditProfile, clearData } = editProfileActions;

    const { status, msg } = useSelector(state => state.signUpReducer);
    const editProfileReducer = useSelector(state => state.editProfileReducer);
    
    const dispatch = useDispatch();

    const [state, setState] = useState(initialState);

    const [img, setImg] = useState(null);

    const [errors, setErrors] = useState(initialState);

    const [isOpenModal, openModal, closeModal] = useModal();

    //Trae primeramente los datos del usuario
    useEffect(() => {
        //informacion del usuario
        dispatch(getEditProfile({token: localStorage.token}));
    }, []);

    useEffect(() => {
        setState({
            username: editProfileReducer.username,
            email: editProfileReducer.email,
            previousEmail: editProfileReducer.email,
            password: editProfileReducer.password,
            image: editProfileReducer.img,
        });
    }, [editProfileReducer]);

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
        //dispatch(putEditProfile({state, img}));
        //seteo el response en false hasta que me llegue la confirmacion de que 
        //se cambio con exito, y si asi muestro el modal y redirecciono
        openModal();
        if(status) {
            dispatch(clearData());
            setState(initialState);
            setErrors(initialState);
        };
    };

    return (
        <>
            <section className={styles.container}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    {
                        editProfileReducer.response ? 
                        <>
                            <h3> Edita el campo que quieras cambiar* </h3>
                            <label className={styles.label} htmlFor="username" > Usuario: </label>
                            <input
                                type="text"
                                id="username"
                                name = "username"
                                value={state.username}
                                placeholder="Nuevo nombre de usurario"
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
                                placeholder="Nuevo email"
                                autoComplete="off"
                                className={styles.input}
                                onChange={handleChange}
                            />
                            {errors.email && (<p className={styles.danger}> {errors.email} </p>)}
                            <label className={styles.label} htmlFor="password"> Contraseña: </label>
                            <input 
                                type='password'
                                id='password'
                                name="password"
                                value={state.password}
                                placeholder="Nueva contraseña"
                                autoComplete="off"
                                className={styles.input}
                                onChange={handleChange}
                            />
                            {errors.password && (<p className={styles.danger}> {errors.password} </p>)}
                            <Avatars set={setImg}/>
                            <label className={styles.labelFile} htmlFor="image"> Subir Imagen: </label>
                            <input 
                                type='file'
                                id='image'
                                name="image"
                                accept="image/png, image/jpeg"
                                value={state.image}
                                className={styles.inputFile}
                                onChange={handleChange}
                            />
                            <div className={styles.buttons}>
                                {
                                    ((!errors.username && !errors.email && !errors.password) 
                                    && 
                                    (errors.username !== '' && errors.email !== '' && errors.password !== '')) 
                                    ? 
                                    (<button type="submit" className={styles.button}> Guardar </button>) 
                                    : 
                                    <button type="submit" className={styles.disabled} disabled> Guardar </button>
                                }
                                <button className={styles.button} onClick={() => history.push('profile')}> Cancelar </button>
                            </div>
                        </>
                        :
                        <Loading />
                    }
                </form> 
            </section>
            <Modal isOpen={isOpenModal} closeModal={closeModal}>
              <h3>Status:</h3>
              <p>{msg}</p>
              {
                status ? 
                <p>Redireecionando...</p>
                :
                null
              }
            </Modal> 
        </>
    );
};