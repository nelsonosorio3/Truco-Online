import { LOG_OUT, LOG_IN } from '../actions/index';

const INITIAL_STATE = {
  isAuth: false,
  user: null,
};

const logReducer = (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case LOG_IN:
      return {
        ...state,
        isAuth: payload.isAuth,
        user: payload.name ? payload.name : '',
      };
    case LOG_OUT:
      return {
        ...state,
        isAuth: false,
        user: null,
      };  
    default:
      return state;    
  };
};

export default logReducer;