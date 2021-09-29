// En este archivo se hace el combine
import { combineReducers } from "redux";

// importar cada reducer(exportarlos en su archivo por default) y añadirlos a rootReducer
import signUpReducer from "./signUpReducer";
import logReducer from "./logReducer";
import profileReducer from "./profileReducer";
import roomsReducer from "./roomsReducer";
import adminPanelReducer from "./adminPanelReducer";
import tournamentsReducer from "./tournamentsReducer";
import editProfileReducer from "./editProfileReducer";

const rootReducer = combineReducers({
  signUpReducer,
  logReducer,
  profileReducer,
  roomsReducer,
  adminPanelReducer,
  tournamentsReducer,
  editProfileReducer,
});

export default rootReducer;
