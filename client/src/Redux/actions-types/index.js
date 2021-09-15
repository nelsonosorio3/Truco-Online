import axios from 'axios';
import { SIGN_UP } from '../actions/index';

export function signUpUser(data) {
  return function(dispatch) {
    return axios.post(`http://localhost:3001/users`, data)
      .then(response => {
        dispatch({ type: SIGN_UP, payload: response.data });
      })
      .catch(error => console.log(error));
  };
};
