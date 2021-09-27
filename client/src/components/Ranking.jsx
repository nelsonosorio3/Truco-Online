import React , { useEffect  } from 'react';
import styles from './styles/Ranking.module.css';
import getRanking from '../Redux/actions-types/getRanking';
import NavBar from './NavBar'; 
import { useDispatch , useSelector } from 'react-redux';




export default function Ranking() {
    const state = useSelector(state => state.rankingReducer)
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getRanking())
    }, [])
    
    console.log(state)
    
    return(
        <>
        <NavBar />
            <div > 
              <div className={styles.fondo}> 
                <section>
                  <ul>
                    {/* {state && state.map(u => 
                      <li>{state.ranking.username}</li>
                      )} */}
                  </ul>
                </section>
             </div>
            </div>
        </>
    );
};