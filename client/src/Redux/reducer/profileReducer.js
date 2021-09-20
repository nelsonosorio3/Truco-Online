import { GET_PROFILE } from '../actions/index';

const INITIAL_STATE = {
  userProfile: {},
};

const profileReducer = (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case GET_PROFILE:
      return {
        userProfile: {
            email: payload.email,
            gamesPlayed: payload.gamesPlayed,
            gamesWon: payload.gamesWon,
            gamesLost: payload.gamesLost,
        },
      };
    default:
      return state;    
  };
};

export default profileReducer;