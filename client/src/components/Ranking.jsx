import axios from 'axios';
import React , { useEffect , useState } from 'react';
import styles from './styles/Ranking.module.css'

import NavBar from './NavBar'; 

export default function Ranking() {
    const [state, setState] = useState() 

    function getRanking () {
        axios(`http://localhost:3001/api/ranking`)
        .then(response => {
          setState({
            state : response.data
          })
        })
        .catch((error) => console.error(error))
    }
    
    useEffect(() => {
        getRanking()
    }, [setState])
    
    

    console.log(state)
    return(
<<<<<<< HEAD
            <div className={styles.fondo}> 
                <section>
                  <ul>
                    
                  </ul>
                </section>
=======
        <>
        <NavBar />
            <div > 
                Probando ranking
>>>>>>> 56fb7ac3a7513066afb10c30d403ff6b04751b03
            </div>
        </>
    );
};