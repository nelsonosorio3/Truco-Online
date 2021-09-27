import React from "react";
import { Link } from "react-router-dom";
import profileIcon from '../img/profileIcon.png';

export default function FilaDeTabla({ username, id, email, gamesPlayed, gamesWon, gamesLost, createdAt }) {
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
                    <button>Suspender</button> <button>Banear</button>

                </div>
            </td>



        </tr>
    )

}

