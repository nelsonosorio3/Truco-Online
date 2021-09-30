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

function validate(newData) {
  let errors = {};
  if(!newData.username) {
    errors.username = 'Ingresa tu nombre de usuario...';
  } else if (newData.username.length < 4) {
      errors.username = 'Nombre inválido. Debe contener más de 3 caracteres...';
  } else if(!ALPHA.test(newData.username)) {
      errors.username = 'Solo se aceptan letras...';
  };
  if(!newData.email) {
    errors.email = 'Ingresa tu email...';
  } else if(!EMAIL.test(newData.email)) {
      errors.email = 'El email es inválido...';
  };
  if(!newData.password) {
    errors.password = 'Ingresa un contraseña...';
  } else if(newData.password.length < 4) {
      errors.password = 'Contraseña inválida. Debe contener más de 3 caracteres...';
    } ;
  return errors;
};

function doPackage(oldData, newData, img) {
    const data = {};
    newData.username.length === 0 ? data.username = oldData.username : data.username = newData.username;
    newData.email.length === 0 ? data.email = oldData.email : data.email = newData.email;
    newData.password.length === 0 ? data.password = oldData.password : data.password = newData.password;
    // img ? data.image = img : data.image = newData.image? : data.image = oldData.image;
    return data;
};

const initialState = {
    username: '',
    email: '',
    password: '',
    image: null,
};

export default function EditProfile() {

    const history = useHistory();

    const { getEditProfile, putEditProfile, clearData } = editProfileActions;

    const { status, msg } = useSelector(state => state.signUpReducer);
    const editProfileReducer = useSelector(state => state.editProfileReducer);
    
    const dispatch = useDispatch();

    const [newData, setNewData] = useState(initialState);
    const [oldData, setOldData] = useState(initialState);

    const [img, setImg] = useState(null);

    const [errors, setErrors] = useState(initialState);

    const [isOpenModal, openModal, closeModal] = useModal();

    //Trae primeramente los datos del usuario
    useEffect(() => {
        //informacion del usuario
        dispatch(getEditProfile({token: localStorage.token}));
    }, []);

    useEffect(() => {
        setOldData({
            username: editProfileReducer.username,
            email: editProfileReducer.email,
            password: editProfileReducer.password,
            image: editProfileReducer.img,
        });
        //seteo el response en false hasta que me llegue la confirmacion de que 
        //se cambio con exito, y si asi muestro el modal y redirecciono
        if(status) {
            openModal();
            dispatch(clearData());
            setNewData(initialState);
            setErrors(initialState);
        };
    }, [editProfileReducer]);

    function handleChange(event) {
        const { name, value } = event.target;
        setErrors(validate({
          ...newData,
          [name]: value,
        }));
        setNewData({
          ...newData,
          [name]: value,
        });
    };

    function handleSubmit(event) {
        event.preventDefault();
        dispatch(putEditProfile(doPackage(oldData, newData, img), localStorage.token));
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
                            <p className={styles.old}>{oldData.username}</p>
                            <input
                                type="text"
                                id="username"
                                name = "username"
                                value={newData.username}
                                placeholder="Nuevo nombre de usurario"
                                autoComplete="off"
                                className={styles.input}
                                onChange={handleChange}
                            />
                            {errors.username && (<p className={styles.danger}> {errors.username} </p>)}
                            <label className={styles.label} htmlFor="email"> Email: </label>
                            <p className={styles.old}>{oldData.email}</p>
                            <input 
                                type="email"
                                id='email'
                                name="email"
                                value={newData.email}
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
                                value={newData.password}
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
                                value={newData.image}
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