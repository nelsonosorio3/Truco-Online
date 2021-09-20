import axios from 'axios';
import { LOG_IN, LOG_OUT } from '../actions/index';

const logIn = ({user, password}) => {
  return function(dispatch) {
    return axios(`http://localhost:3001/api/user?user=${user}&password=${password}`)
      .then(response => {
        dispatch({ type: LOG_IN, payload: response.data });
      })
      .catch(error => console.log(error));
  };
};

const logOut = () => {
  return function(dispatch) {
    dispatch({type: LOG_OUT});
  };
};

export default {
    logIn,
    logOut,
};