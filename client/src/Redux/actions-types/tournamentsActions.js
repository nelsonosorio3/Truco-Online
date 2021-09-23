import { IS_IN_TOURNAMENT } from '../actions/index';

export const setIsInTournament = (isInTournament) => {
    return {
        type: IS_IN_TOURNAMENT,
        payload: isInTournament
    }
}