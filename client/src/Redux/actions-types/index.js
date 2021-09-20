// En este archivo se hacen las importaciones de todos los actions types
// Definir el nomnre de los archivos como: nombre/funcion + Actions

import signUpActions from "./signUpActions";
import logActions from "./logActions";
import profileActions from "./profileActions";

const allActions = {
  signUpActions,
  logActions,
  profileActions,
};

export default allActions;