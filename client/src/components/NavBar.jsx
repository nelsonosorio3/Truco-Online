import React , { useSelector }from 'react';
import styles from './styles/NavBar.module.css'
import { Link } from 'react-router-dom';
import logo from '../img/logo2.png';

import Logo2 from '../img/Logo2.png'
import styles from './styles/NavBar.module.css'

export default function NavBar(){
     
    // const name = useSelector(state => state.user)
    let name =null;

    return(
      <div>
      </div>
//         <div className={styles.mainDiv}>
//             <nav className={styles.nav}>
//                 <img src={Logo2} alt="TrucoHenry" className={styles.logo2} />
//                 <Link to='/rooms' className={styles.a}>Lobbys</Link>
//                 <Link to='profile' className={styles.a}>My Profile</Link>
//             </nav>


//         <div className={styles.mainDiv}>
//             <Link to='/'><img className='logo' src={logo} alt='...' width= '40px' /></Link>
//             <Link to='/rooms'><a href='#0' className={styles.a}>Lobbys</a></Link>
//             <Link to='/ranking'><a href='#0' className={styles.a}>Rankings</a> </Link> 
//             <Link to='/user'><a href='#0' className={styles.a}>{name ? name : 'My Profile'}</a> </Link> 
//         </div>
    );
};
