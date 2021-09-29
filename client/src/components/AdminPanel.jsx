import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import profileIcon from '../img/profileIcon.png';
import adminPanelActions from '../Redux/actions-types/adminPanelActions';
import styles from './styles/AdminPanel.module.css';

import FilaDeTabla from "./FilaDeTabla";

// nav
import NavBar from './NavBar';

export default function AdminPanel() {


  const tableStatus = useSelector(state => state.adminPanelReducer);
  const { getUsers, filterByName, filterByEmail, sortByPlayedAsc, sortByPlayedDesc,
    sortByWonAsc, sortByWonDesc, sortByLostAsc, sortByLostDesc, goToPage, setSelectedPage,
    sortByUserSinceAsc, sortByUserSinceDesc, setDisplayedOnPage, setUsersPerPage } = adminPanelActions;
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


  var handleFilterChange = function (event) {
    dispatch(filterByName(event.target.value));
    dispatch(filterByName(event.target.value));
    dispatch(goToPage(1));
  };

  var handleEmailFilterChange = function (event) {
    dispatch(filterByEmail(event.target.value));
    dispatch(filterByEmail(event.target.value));
    dispatch(goToPage(1));
  };

  var handlePageSubmit = function (event) {
    event.preventDefault();
    dispatch(goToPage(event.target.value));
  };

  var handlePageChange = function (event) {
    dispatch(setSelectedPage(event.target.value))
  };

  var handleUsersPerPageSubmit = function (event) {
    dispatch(setUsersPerPage(event.target.value));
    dispatch(goToPage(1));
  }

  var handleSortAscPlayed = function () {
    dispatch(sortByPlayedAsc()); //Ordena el array de fondo, no el que se muestra
    dispatch(filterByName(tableStatus.filterValue))
    dispatch(goToPage(1));
  };

  var handleSortDescPlayed = function () {
    dispatch(sortByPlayedDesc()); //Ordena el array de fondo, no el que se muestra
    dispatch(filterByName(tableStatus.filterValue))
    dispatch(goToPage(1));
  };

  var handleSortAscWon = function () {
    dispatch(sortByWonAsc());
    dispatch(filterByName(tableStatus.filterValue))
  };

  var handleSortDescWon = function () {
    dispatch(sortByWonDesc());
    dispatch(filterByName(tableStatus.filterValue))
    dispatch(goToPage(1));
  };

  var handleSortAscLost = function () {
    dispatch(sortByLostAsc());
    dispatch(filterByName(tableStatus.filterValue))
    dispatch(goToPage(1));
  };

  var handleSortDescLost = function () {
    dispatch(sortByWonDesc());
    dispatch(filterByName(tableStatus.filterValue))
    dispatch(goToPage(1));
  };

  var handleSortAscUserSince = function () {
    dispatch(sortByUserSinceAsc());
    dispatch(filterByName(tableStatus.filterValue))
    dispatch(goToPage(1));
  };

  var handleSortDescUserSince = function () {
    dispatch(sortByUserSinceDesc());
    dispatch(filterByName(tableStatus.filterValue))
    dispatch(goToPage(1));
  };

  var pagesButtonsCreator = function () {

  }

  var someFunction = function () { };



  return (


    <div className={styles.mainContainer}>
      <NavBar />
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

        <form action="/action_page.php" onSubmit={handlePageSubmit} className="paginator">
          <label for="pageSelector">Página actual: {tableStatus.currentPage} (de un total de {tableStatus.pages.length}). Ir a la página:</label>
          <select id="pageSelector" name="pageSelector" onChange={handlePageChange}>
            {
              tableStatus.pages.map(num => {
                return <option value={num.toString()}>{num}</option>
              })
            }
          </select>
          <input type="submit" value="Go to page" />
        </form>

        <p>Usuarios por página:
          <form>
            <input
              name="emailFilterValue"
              value={tableStatus.usersPerPage}
              onChange={handleUsersPerPageSubmit}
              type="text"
              placeholder="Ingrese Email"
              title="Búsqueda de Usuario (ingresar username)"
            />

          </form>
        </p>




        <div>



        </div>

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
              tableStatus.displayedInPage.map(u => <FilaDeTabla //nuestros usuarios traídos desde nuestro redux store!
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