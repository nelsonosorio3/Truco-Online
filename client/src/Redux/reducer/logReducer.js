import { LOG_OUT, LOG_IN } from '../actions/index';

const INITIAL_STATE = {
  isAuth: false,
  user: null,
  id: null,
};

const logReducer = (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case LOG_IN:
      if(payload.login) { 
        return {
          ...state,
          isAuth: payload.login,
          user: payload.username,
          id: payload.id,
        };
      } else {
          return {
            ...state,
            message: payload.message,
          };
      };
    case LOG_OUT:
      return {
        ...state,
        isAuth: false,
        user: null,
        id: null,
      };  
    default:
      return state;    
  };
};

export default logReducer;