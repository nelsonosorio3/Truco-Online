import {useCallback, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import log from '../Redux/actions-types/logActions';

// export default function useUser() {
//   const { logIn, logOut } = log;
//   const { isAuth } = useSelector(state => state.logReducer);
//   const [state, setState] = useState({ loading: false, error: false });

//   const login = useCallback((data) => {
//     setState({loading: true, error: false })
//     logIn(data) 
//       .then(response => {
//         window.sessionStorage.setItem('isAuth', isAuth)
//         setState({loading: false, error: false })
//       })
//       .catch(error => {
//         window.sessionStorage.removeItem('isAuth')
//         setState({loading: false, error: true })
//         console.error(error)
//       })
//   }, [isAuth, logIn]);

//   const logout = useCallback(() => {
//     window.sessionStorage.removeItem('isAuth')
//     logOut();
//   }, [logOut]);

//   return {
//     isLogged: isAuth,
//     isLoginLoading: state.loading,
//     hasLoginError: state.error,
//     login,
//     logout,
//   };
// }; 

// ESTO NO ANDA(PROBLEMAS TECNICOS XD)
export default function useUser() {
  const dispatch = useDispatch();
  const { logIn, logOut } = log;
  const { isAuth } = useSelector(state => state.logReducer);
  const [state, setState] = useState({ loading: false, error: false });

  const login = useCallback((data) => {
    setState({loading: true, error: false })
      dispatch(logIn(data));
      if(isAuth) {
        window.sessionStorage.setItem('isAuth', isAuth)
        setState({loading: false, error: false })
      } else {
          window.sessionStorage.removeItem('isAuth')
          setState({loading: false, error: true })
      }
  }, [isAuth, logIn]);

  const logout = useCallback(() => {
    window.sessionStorage.removeItem('isAuth')
    dispatch(logOut());
  }, [logOut]);

  return {
    isLogged: isAuth,
    isLoginLoading: state.loading,
    hasLoginError: state.error,
    login,
    logout,
  };
}; 