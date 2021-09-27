import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// import profileIcon from '../img/profileIcon.png';
import adminPanelActions from '../Redux/actions-types/adminPanelActions';
import styles from './styles/AdminPanel.module.css';

import FilaDeTabla from "./FilaDeTabla";

// nav
import NavBar from './NavBar';

export default function AdminPanel() {


  const tableStatus = useSelector(state => state.adminPanelReducer);
  const { getUsers, filterByName, filterByEmail, sortByPlayedAsc, sortByPlayedDesc,
    sortByWonAsc, sortByWonDesc, sortByLostAsc, sortByLostDesc,
    sortByUserSinceAsc, sortByUserSinceDesc } = adminPanelActions;
  const dispatch = useDispatch();

  //Trae los usuarios

  useEffect(() => {
    dispatch(getUsers(/*{ token: localStorage.token }*/))
  }, [])


  // Esto es para que se actualice el estado una vez que se elimina


  //const { userProfile, userFriends } = useSelector(state => state.profileReducer);

  function arrCreator(amount) { // Función creadora de array con números de página.
    var arr = [];
    for (let i = 0; i < amount; i++) {
      arr.push(i + 1);
    }
    return arr;
  }

  //var pagesArray = arrCreator(tableStatus.totalPages);
  var pagesArray = [1];


  var handleFilterChange = function (event) {
    dispatch(filterByName(event.target.value));
  };

  var handleEmailFilterChange = function (event) {
    dispatch(filterByEmail(event.target.value));
  };

  var handlePageSubmit = function () { };

  var handlePageChange = function () { };

  var handleSortAscPlayed = function () {
    dispatch(sortByPlayedAsc()); //Ordena el array de fondo, no el que se muestra
    dispatch(filterByName(tableStatus.filterValue))
  };

  var handleSortDescPlayed = function () {
    dispatch(sortByPlayedDesc()); //Ordena el array de fondo, no el que se muestra
    dispatch(filterByName(tableStatus.filterValue))
  };

  var handleSortAscWon = function () {
    dispatch(sortByWonAsc());
    dispatch(filterByName(tableStatus.filterValue))
  };

  var handleSortDescWon = function () {
    dispatch(sortByWonDesc());
    dispatch(filterByName(tableStatus.filterValue))
  };

  var handleSortAscLost = function () {
    dispatch(sortByLostAsc());
    dispatch(filterByName(tableStatus.filterValue))
  };

  var handleSortDescLost = function () {
    dispatch(sortByWonDesc());
    dispatch(filterByName(tableStatus.filterValue))
  };

  var handleSortAscUserSince = function () {
    dispatch(sortByUserSinceAsc());
    dispatch(filterByName(tableStatus.filterValue))
  };

  var handleSortDescUserSince = function () {
    dispatch(sortByUserSinceDesc());
    dispatch(filterByName(tableStatus.filterValue))
  };

  var someFunction = function () { };



  return (


    <div className={styles.mainContainer}>
      <div><NavBar /></div>

      <div className={styles.tableContainer}>
        <h2>Usuarios registrados</h2>


        <p>Filtrar por nombre de usuario:
          <form>
            <input
              name="filterValue"
              value={tableStatus.filterValue}
              onChange={handleFilterChange}
              type="text"
              placeholder="Ingrese Nombre de Usuario"
              title="Búsqueda de Usuario (ingresar username)"
            />

          </form>
        </p>

        <p>Filtrar por email:
          <form>
            <input
              name="emailFilterValue"
              value={tableStatus.emailFilterValue}
              onChange={handleEmailFilterChange}
              type="text"
              placeholder="Ingrese Email"
              title="Búsqueda de Usuario (ingresar username)"
            />

          </form>
        </p>

        {/*}
      <p>Página actual: {tableStatus.currentPage}</p>

      <form action="/action_page.php" onSubmit={handlePageSubmit} className="paginator">
        <label for="pageSelector">Ir a la página:</label>
        <select id="pageSelector" name="pageSelector" onChange={handlePageChange}>
          {
            pagesArray.map(num => {
              return <option value={num.toString()}>{num}</option>
            })
          }
        </select>
        <input type="submit" value="Go to page" />
      </form>
        {*/}

        <table id="myTable">
          <tbody>
            <tr className="header">
              <th>Imagen </th>
              <th>Id de Usuario </th>
              <th>Nombre de Usuario </th>
              <th>Correo </th>
              <th>Partidos Jugados <button onClick={handleSortAscPlayed}>A</button> <button onClick={handleSortDescPlayed}>D</button>    </th> {/* onClick={sortTablebyCountry} */}
              <th>Partidos Ganados <button onClick={handleSortAscWon}>A</button> <button onClick={handleSortDescWon}>D</button>    </th> {/* onClick={sortTablebyCountry} */}
              <th>Partidos Perdidos <button onClick={handleSortAscLost}>A</button> <button onClick={handleSortDescLost}>D</button>    </th> {/* onClick={sortTablebyCountry} */}
              <th>Usuario desde <button onClick={handleSortAscUserSince}>A</button> <button onClick={handleSortDescUserSince}>D</button> </th>
              <th>Medidas </th>
            </tr>
            {
              tableStatus.displayedUsers.map(u => <FilaDeTabla //nuestros usuarios traídos desde nuestro redux store!
                key={u.id}
                id={u.id}
                //Image={u.flagImage}
                username={u.username}
                email={u.email}
                gamesPlayed={u.gamesPlayed}
                gamesWon={u.gamesWon}
                gamesLost={u.gamesLost}
                createdAt={u.createdAt}
              />)
            }

          </tbody>
        </table>
        <div className={styles.cargarNuevamente}>
          <p>Para cargar o reiniciar los filtros y ordenamiento presione: <button onClick={someFunction}>Cargar datos nuevamente.</button></p>
        </div>

      </div>
    </div>

  )
};