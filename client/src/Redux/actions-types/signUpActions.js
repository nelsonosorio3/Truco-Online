import axios from 'axios';
import { SIGN_UP } from '../actions/index';

const signUpActions = (data) => {
  return function(dispatch) {
    return axios.post(`http://143.198.96.96:3001/api/user`, data)
      .then(response => {
        dispatch({ type: SIGN_UP, payload: response.data });
      })
      .catch(error => console.log(error));
  };
};

export default {
  signUpActions,
};