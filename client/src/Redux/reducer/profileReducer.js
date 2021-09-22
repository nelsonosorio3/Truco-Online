import { GET_PROFILE, GET_FRIENDS, GET_HISTORY, DELETE_FRIEND } from '../actions/index';

const INITIAL_STATE = {
  userProfile: {},
  userFriends: [],
  userHistory: {},
};

const profileReducer = (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    
    case GET_PROFILE:
    return {
      ...state,
      userProfile: {
          id: payload.id,
          username: payload.username,
          email: payload.email,
          gamesPlayed: payload.gamesPlayed,
          gamesWon: payload.gamesWon,
          gamesLost: payload.gamesLost,
      },
    };
      
    case GET_FRIENDS:
      const ansFriends = {
        ...state,
        userFriends: payload
      }
    return ansFriends 

    case DELETE_FRIEND:
      const ans = {
        ...state,
        userFriends: state.userFriends.filter(f => f.id !== payload)
      }
    return ans  

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