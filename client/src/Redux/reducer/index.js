import { SING_UP } from '../actions/index';

const INITIAL_STATE = {
  isAuth: false,
  user: '',
};

export default function reducer(state = INITIAL_STATE, {type, payload}) {
  switch (type) {
    case SING_UP:
      return {
        ...state,
        isAuth: payload.isAuth,
        user: payload.name,
      };
    default:
      return state;    
  };
};