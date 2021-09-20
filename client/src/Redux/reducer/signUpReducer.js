import { SIGN_UP } from '../actions/index';

const INITIAL_STATE = {
  isRegister: false,
  isValidName: null,
  isValidEmail: null,
};

const signUpReducer = (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case SIGN_UP:
      return {
        ...state,
        isRegister: payload.isRegister,
        isValidName: payload.isValidName,
        isValidEmail: payload.isValidEmail,
      };
    default:
      return state;    
  };
};

export default signUpReducer;