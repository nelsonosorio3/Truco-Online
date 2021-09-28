import axios from 'axios';
import { EDIT_PROFILE, PUT_PROFILE, CLEAR_DATA } from '../actions/index';

const getEditProfile = ({token}) => {
  //necesito que me retorne: username, password, email e image(no se si esta implementada)
  return function(dispatch) {
    return axios.get(`http://localhost:3001/api/user/edit`, {
      headers: {
        "x-access-token": token,
      },
    })
    .then(data => {
      dispatch({ type: EDIT_PROFILE, payload: data.data[0] });
    })
    .catch((error) => console.error(error));
  };
};

const putEditProfile = (data) => {
  //necesito que me retorne status(boolean) y msg('Usuario actualizado con exito!' o 'Error en la actualizacion')
  return function(dispatch) {
    return axios.put(`http://localhost:3001/api/user/edit`, {
      body: data,
    })
    .then(data => {
      console.log('Data put', data);
      dispatch({ type: PUT_PROFILE, payload: data });
    })
    .catch((error) => console.error(error));
  };
};

const clearData = () => {
  return function(dispatch) {
      dispatch({ type: CLEAR_DATA });
  };
};

export default {
    getEditProfile,
    putEditProfile,
    clearData,
};