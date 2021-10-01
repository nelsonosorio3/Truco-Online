import axios from "axios";
import { GET_RANKING } from "../actions";


function getRanking() { 
    return async function (dispatch) {
      return await axios.get(`https://trucohenry.com/api/ranking`)
        .then(response => {
          dispatch({ type: GET_RANKING, payload: response.data });
        })
        .catch((error) => console.error(error));
    };
  };


  export default getRanking
  