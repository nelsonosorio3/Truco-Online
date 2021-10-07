import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import adminPanelActions from '../Redux/actions-types/adminPanelActions';
import { createSemanticDiagnosticsBuilderProgram } from "typescript";

// import styles from "./styles/FilaDeTabla.module.css"
import profileIcon from '../img/profileIcon.png';

export default function FilaDeTabla({ username, id, email, gamesPlayed, gamesWon, gamesLost,
    createdAt, reportedUser, status }) {

    /*
function banUser() {
    fetch(
        `http://localhost:3001/api/user/banuser?userId=${id}`,
        {
            method: "PUT",
            headers: {
                "x-access-token": localStorage.token,
                'Content-Type': 'application/json'
            }
        })
        .then(
            r => {
                console.log(r)
                //dispatch(getUsers({ token: localStorage.token }))
            }
        )
}*/

    const { banUser } = adminPanelActions;
    const dispatch = useDispatch();

    function suspendUser(id) {
        fetch(`http://localhost:3001/api/user/banuser?userId=${id}`)
            .then(
                r => {
                    console.log(r)
                    //dispatch(getUsers({ token: localStorage.token }))
                }
            )

    }

    function activateUser(id) {
        fetch(`http://localhost:3001/api/user/banuser?userId=${id}`)
            .then(
                r => {
                    console.log(r)
                    //dispatch(getUsers({ token: localStorage.token }))
                }
            )
    }


    return (
        <tr>
            <td><img src={profileIcon} alt="Imagen de bandera" height="20"></img></td>
            <td>{id}</td>
            <td>
                {username ? (<Link to={`/welcome`} >{username}</Link>) : <p>{username}</p>}
            </td>
            <td>{email}</td>
            <td>{gamesPlayed}</td>
            <td>{gamesWon}</td>
            <td>{gamesLost}</td>
            <td>{createdAt.split("T")[0]}</td>
            <td width="170">
                <div className="buttonContainer">
                    {
                        status === "activo" ?
                            (<div><button onClick={() => suspendUser(id)}>Suspender</button> <button onClick={() => dispatch(banUser(id, localStorage.token))}>Banear</button></div>) :
                            <button onClick={() => activateUser(id)}>Re-activar</button>
                    }
                </div>

            </td>
            <td>
                {
                    reportedUser.length > 0 ?
                        reportedUser.map(r => <button> ! </button>) :
                        ""
                }
            </td>



        </tr>
    )

}

