import axios from 'axios';
import React , { useEffect , useState } from 'react';
import styles from './styles/Ranking.module.css'


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
            <div className={styles.fondo}> 
                <section>
                  <ul>
                    
                  </ul>
                </section>
            </div>
    );
};