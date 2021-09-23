import { IS_IN_TOURNAMENT } from '../actions/index';

const INITIAL_STATE = {
  isInTournament: false,
  roomId: null,
};

const tournamentsReducer = (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case IS_IN_TOURNAMENT:
      return {
        isInTournament: payload.isInTournament,
        tournamentId: payload.tournamentId,
      };
    default:
      return state;    
  };
};

export default tournamentsReducer;