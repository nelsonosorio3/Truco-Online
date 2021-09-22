import { LOG_OUT, LOG_IN } from '../actions/index';

const INITIAL_STATE = {
  isAuth: false, // sacar
  user: null,
  id: null,
  message: ''
};

const saveInLocalStorage = () => {
  
};

const logReducer = (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case LOG_IN:
      if(payload.login) {
        //Se almacena en el state las respuesta obtenida del server, en caso de afirmativa, el payload queda asi:
        // id: 1
        // login: true
        // username: "pedro"
        // token: "String"
        window.localStorage.setItem("token", payload.token);
        window.localStorage.setItem("isAuth", payload.login);
        return {
          ...state,
          isAuth: payload.login,
          user: payload.username,
          id: payload.id,
          token: payload.token
        };
      } else {
        const newState = {
          ...state,
          isAuth: false,
          message: payload.message,
        };
        return newState
      };
    case LOG_OUT:
      // esto no va aca, es para no olvidarme
      // window.localStorage.removeItem("token", token);
      // window.localStorage.removeItem("isAuth", isAuth);
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