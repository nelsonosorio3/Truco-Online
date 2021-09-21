import axios from 'axios';
import { LOG_IN, LOG_OUT } from '../actions/index';

const logIn = ({emailInput, passwordInput}) => {
  return function(dispatch) {
    return axios(`http://localhost:3001/api/user/login?emailInput=${emailInput}&passwordInput=${passwordInput}`)
      .then(response => {
        dispatch({ type: LOG_IN, payload: response.data });
      })
      .catch(error => console.log(error));
  };
}; 

// const logIn = (data) => {
//   return function(dispatch) {
//     return axios({
//         url: "http://localhost:3001/api/filltable",
//         method: "GET",
//         headers: {
//           'Accept': 'application/json',
//           'Content-Type': 'application/json;charset=UTF-8'
//         },
//         body: data,
//       })
//       .then(response => {
//         console.log('AA:', response);
//         dispatch({ type: LOG_IN, payload: response.data });
//       })
//       .catch(error => console.log(error));
//   };
// };

const logOut = () => {
  return function(dispatch) {
    dispatch({type: LOG_OUT});
  };
};

export default {
    logIn,
    logOut,
};