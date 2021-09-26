import axios from 'axios';
import { GET_USERS, FILTER_BY_EMAIL, FILTER_BY_NAME, FILTER_BY_ID } from '../actions/index';
import {
  ORDER_BY_GAMES_ASC, ORDER_BY_GAMES_DESC, ORDER_BY_WINS_ASC, ORDER_BY_WINS_DESC,
  ORDER_BY_LOST_ASC, ORDER_BY_LOST_DESC, GO_TO_N_PAGE, SET_USERS_PER_PAGE,
  ORDER_BY_USER_SINCE_ASC, ORDER_BY_USER_SINCE_DESC
} from '../actions/index';


function getUsers() { //por ahora, token no es necesario como parámetro, luego lo será.
  //fetch data from server

  return function (dispatch) {
    return axios.get(`http://localhost:3001/api/user`
      /*,{
        headers: {
          "x-access-token": token,
        }
      }*/
    )
      .then(data => {
        dispatch({ type: GET_USERS, payload: data.data });
      })
      .catch((error) => console.error(error));
  };
};

function filterByName(payload) {
  return function (dispatch) {
    return dispatch({ type: FILTER_BY_NAME, payload })
  }
}

function filterByEmail(payload) {
  return function (dispatch) {
    return dispatch({ type: FILTER_BY_EMAIL, payload })
  }
}

function sortByPlayedAsc() {
  return function (dispatch) {
    return dispatch({ type: ORDER_BY_GAMES_ASC })
  }
}

function sortByPlayedDesc() {
  return function (dispatch) {
    return dispatch({ type: ORDER_BY_GAMES_DESC })
  }
}

function sortByWonAsc() {
  return function (dispatch) {
    return dispatch({ type: ORDER_BY_WINS_ASC })
  }
}

function sortByWonDesc() {
  return function (dispatch) {
    return dispatch({ type: ORDER_BY_WINS_DESC })
  }
}

function sortByLostAsc() {
  return function (dispatch) {
    return dispatch({ type: ORDER_BY_LOST_ASC })
  }
}

function sortByLostDesc() {
  return function (dispatch) {
    return dispatch({ type: ORDER_BY_LOST_DESC })
  }
}

function sortByUserSinceAsc() {
  return function (dispatch) {
    return dispatch({ type: ORDER_BY_USER_SINCE_ASC })
  }
}

function sortByUserSinceDesc() {
  return function (dispatch) {
    return dispatch({ type: ORDER_BY_USER_SINCE_DESC })
  }
}

export default {
  getUsers, filterByName, filterByEmail,
  sortByPlayedAsc, sortByPlayedDesc, sortByWonAsc, sortByWonDesc,
  sortByLostAsc, sortByLostDesc, sortByUserSinceAsc, sortByUserSinceDesc
};