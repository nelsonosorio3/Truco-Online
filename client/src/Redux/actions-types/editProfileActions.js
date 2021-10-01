import axios from 'axios';
import { EDIT_PROFILE, PUT_PROFILE, CLEAR_DATA } from '../actions/index';

const getEditProfile = ({token}) => {
  return function(dispatch) {
    return axios.get(`http://143.198.96.96:3001/api/user/edit`, {
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

const putEditProfile = (data, token) => {
  const headers = {
    "x-access-token": token,
  };
  return function(dispatch) {
    return axios.put(`http://143.198.96.96:3001/api/user/edit`, data, { headers })
    .then(data => {
      console.log('Response put', data);
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