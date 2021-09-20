import axios from 'axios';
import { GET_PROFILE } from '../actions/index';

const getProfile = (id) => {
  return function(dispatch) {
    return axios(`http://localhost:3001/api/user/${id}`)
      .then(data => {
        dispatch({ type: GET_PROFILE, payload: data });
      })
      .catch((error) => console.error(error));
  };
};

export default {
    getProfile,
};