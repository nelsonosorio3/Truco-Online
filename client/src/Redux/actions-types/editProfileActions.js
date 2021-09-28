import axios from 'axios';
import { EDIT_PROFILE, CLEAR_DATA } from '../actions/index';

const editProfile = ({token}) => {
  return function(dispatch) {
    return axios.get(`http://localhost:3001/api/user/edit`,{
      headers: {
        "x-access-token": token,
      },
    })
    .then(data => {
      console.log('edit', data);
      dispatch({ type: EDIT_PROFILE, payload: data.data[0] });
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
    editProfile,
    clearData,
};