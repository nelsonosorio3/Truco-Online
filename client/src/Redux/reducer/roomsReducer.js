import { ADD_ROOM } from '../actions/index';

const INITIAL_STATE = {
  rooms: []
};

const roomsReducer = (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case ADD_ROOM:
      return {
        ...state,
        rooms: [...state.rooms, payload]
      };
    default:
      return state;    
  };
};

export default roomsReducer;