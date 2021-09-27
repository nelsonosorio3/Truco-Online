import { GET_USERS, FILTER_BY_EMAIL, FILTER_BY_NAME, FILTER_BY_ID } from '../actions/index';
import { ORDER_BY_GAMES_ASC, ORDER_BY_GAMES_DESC, ORDER_BY_WINS_ASC, ORDER_BY_WINS_DESC } from '../actions/index';
import {
  ORDER_BY_LOST_ASC, ORDER_BY_LOST_DESC, GO_TO_N_PAGE, SET_USERS_PER_PAGE,
  ORDER_BY_USER_SINCE_ASC, ORDER_BY_USER_SINCE_DESC
} from '../actions/index';
import comparers from './helpers/comparers';

const INITIAL_STATE = {
  users: {},
  currentPage: 1,
  orderedUsers: [],
  displayedUsers: [],
  filterValue: "",
  emailFilterValue: "",
  totalPages: 1,
  resultsPerPage: 10,


};

const adminPanelReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {

    case GET_USERS:
      return {
        ...state,
        displayedUsers: payload,
        orderedUsers: payload,
      };

    case FILTER_BY_NAME:

      var newUsers = state.orderedUsers.filter(u => u.username.toLowerCase().includes(payload.toLowerCase()))
      return {
        ...state,
        filterValue: payload, // Que raro, hubiera esperado que tengo que concatenarlo pero no... por que será...
        displayedUsers: newUsers,
      };

    case FILTER_BY_EMAIL:
      var newUsers = state.orderedUsers.filter(u => u.email.toLowerCase().includes(payload.toLowerCase()))
      return {
        ...state,
        emailFilterValue: payload, // Que raro, hubiera esperado que tengo que concatenarlo pero no... por que será...
        displayedUsers: newUsers,
      };

    case ORDER_BY_GAMES_ASC:
      var newOrderedUsers = [...state.orderedUsers];
      var newOrderedUsers2 = newOrderedUsers.sort(comparers.byPlayedAsc)
      return {
        ...state,
        orderedUsers: newOrderedUsers2,
        displayedUsers: newOrderedUsers2,
      };

    case ORDER_BY_GAMES_DESC:
      var newOrderedUsers = [...state.orderedUsers];
      var newOrderedUsers2 = newOrderedUsers.sort(comparers.byPlayedDesc)
      return {
        ...state,
        orderedUsers: newOrderedUsers2,
        displayedUsers: newOrderedUsers2,
      };

    case ORDER_BY_WINS_ASC:
      var newOrderedUsers = [...state.orderedUsers];
      var newOrderedUsers2 = newOrderedUsers.sort(comparers.byWonAsc)
      return {
        ...state,
        orderedUsers: newOrderedUsers2,
        displayedUsers: newOrderedUsers2,
      };

    case ORDER_BY_WINS_DESC:
      var newOrderedUsers = [...state.orderedUsers];
      var newOrderedUsers2 = newOrderedUsers.sort(comparers.byWonDesc)
      return {
        ...state,
        orderedUsers: newOrderedUsers2,
        displayedUsers: newOrderedUsers2,
      };

    case ORDER_BY_LOST_ASC:
      var newOrderedUsers = [...state.orderedUsers];
      var newOrderedUsers2 = newOrderedUsers.sort(comparers.byLostAsc)
      return {
        ...state,
        orderedUsers: newOrderedUsers2,
        displayedUsers: newOrderedUsers2,
      };

    case ORDER_BY_LOST_DESC:
      var newOrderedUsers = [...state.orderedUsers];
      var newOrderedUsers2 = newOrderedUsers.sort(comparers.byLostDesc)
      return {
        ...state,
        orderedUsers: newOrderedUsers2,
        displayedUsers: newOrderedUsers2,
      };

    case ORDER_BY_USER_SINCE_ASC:
      var newOrderedUsers = [...state.orderedUsers];
      var newOrderedUsers2 = newOrderedUsers.sort(comparers.byUserSinceAsc)
      return {
        ...state,
        orderedUsers: newOrderedUsers2,
        displayedUsers: newOrderedUsers2,
      };

    case ORDER_BY_USER_SINCE_DESC:
      var newOrderedUsers = [...state.orderedUsers];
      var newOrderedUsers2 = newOrderedUsers.sort(comparers.byUserSinceDesc)
      return {
        ...state,
        orderedUsers: newOrderedUsers2,
        displayedUsers: newOrderedUsers2,
      };



    default:
      return state;

  };

};

export default adminPanelReducer;



