import axios from 'axios';
import { GET_PROFILE, GET_FRIENDS, GET_HISTORY } from '../actions/index';

const getProfile = (id) => {
  return function(dispatch) {
    return axios(`http://localhost:3001/api/user/${id}`)
      .then(data => {
        dispatch({ type: GET_PROFILE, payload: data });
      })
      .catch((error) => console.error(error));
  };
};

const getFriends = (id) => {
  return function(dispatch) {
    return axios(`http://localhost:3001/api/user/${id}/friends`)
      .then(data => {
        dispatch({ type: GET_FRIENDS, payload: data });
      })
      .catch((error) => console.error(error));
  };
};

const getHistory = (id) => {
  return function(dispatch) {
    return axios(`http://localhost:3001/api/user/${id}/history`)
      .then(data => {
        dispatch({ type: GET_HISTORY, payload: data });
      })
      .catch((error) => console.error(error));
  };
};

export default {
    getProfile,
    getFriends,
    getHistory,
};