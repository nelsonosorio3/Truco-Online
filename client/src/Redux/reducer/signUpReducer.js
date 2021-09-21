import { SIGN_UP } from '../actions/index';

const INITIAL_STATE = {
  registered: false,
  validEmail: null,
};

const signUpReducer = (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case SIGN_UP:
      return {
        ...state,
        registered: payload.registered,
        validEmail: payload.validEmail,
      };
    default:
      return state;    
  };
};

export default signUpReducer;