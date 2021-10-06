import axios from 'axios';
import { GET_PROFILE, GET_FRIENDS, GET_HISTORY, DELETE_FRIEND, PUT_FRIEND_REQUEST } from '../actions/index';

const getProfile = ({token}) => {

  return function(dispatch) {
    return axios.get(`https://trucohenry.com/api/user/profile`, {
      headers: {
        "x-access-token": token,
      },
    })
    .then(data => {
      dispatch({ type: GET_PROFILE, payload: data.data[0] });
    })
    .catch((error) => console.error(error));
  };
};

const getFriends = (token) => {
  return function(dispatch) {
    return axios(`https://trucohenry.com/api/user/friends`, {
      headers: {
        "x-access-token": token,
      },
    })
    .then(data => {
      dispatch({ type: GET_FRIENDS, payload: data.data });
    })
    .catch((error) => console.error(error));
  };
};

const deleteFriends = (id, email) => {
  return function(dispatch) {
    return axios.delete(`https://trucohenry.com/api/friends/${id}/${email}`)
      .then(data => {
        dispatch({ type: DELETE_FRIEND, payload: data.data.id });
      })
      .catch((error) => console.error(error));
  };
};

const putFriendRequest = (id, email, response) => {
  return function(dispatch) {
    return axios.put(`https://trucohenry.com/api/friends/${id}/${email}?response=${response}`)
      .then(data => {
        dispatch({ type: PUT_FRIEND_REQUEST, payload: data.data.id });
      })
      .catch((error) => console.error(error));
  };
};

const getGames = (token) => {
  return function(dispatch) {
    return axios(`https://trucohenry.com/api/games/mygames`, {
      headers: {
        "x-access-token": token,
      }
    })
    .then(data => {
      dispatch({ type: GET_HISTORY, payload: data.data.games});
    })
    .catch((error) => console.error(error));
  };
};

export default {
    getProfile,
    getFriends,
    putFriendRequest,
    deleteFriends,
    getGames,
};