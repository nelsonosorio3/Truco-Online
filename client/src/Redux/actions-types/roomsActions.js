import { ADD_ROOM } from '../actions/index';

export const addRoom = (roomData) => {
    return {
        type: ADD_ROOM,
        payload: roomData
    }
}