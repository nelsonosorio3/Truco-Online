import { GET_PROFILE, GET_FRIENDS, GET_HISTORY } from '../actions/index';

const INITIAL_STATE = {
  userProfile: {},
  userFriends: {},
  userHistory: {},
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
    case GET_FRIENDS:
      return {
        userFriends: {
            
        },
      };  
      case GET_HISTORY:
      return {
        userHistory: {
            
        },
      };
    default:
      return state;    
  };
};

export default profileReducer;