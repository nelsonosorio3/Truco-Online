import { EDIT_PROFILE, CLEAR_DATA} from '../actions/index';

const INITIAL_STATE = {
    id: '',
    username: '',
    email: '',
    password: '',
    response: false,
    img: null,
};

const editProfileReducer = (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case EDIT_PROFILE:
        return {
          ...state,
          id: payload.id,
          username: payload.username,
          email: payload.email,
          password: payload.password,
          response: true,
          //img: payload.img,
        };
    case CLEAR_DATA:
        return {INITIAL_STATE};
    default:
      return state;    
  };
};

export default editProfileReducer;