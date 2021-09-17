const { get } = require('http');
const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('games', {
        state: {
            type: DataTypes.ENUM('finished', 'initialized', 'pending'),
            allowNull: false,
        },
        winner: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                //notEmpty doesn't allow empty strings  
                notEmpty: true,
                notNull: {
                    msg: 'Please enter a winner'
                }
            }
        },
        loser: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                notNull: {
                    msg: 'Please enter a loser'
                }
            }
        },
        results: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true,
                validatingFormat(value){
                    let regex = /^\d{0,2}\|\d{0,2}$/gm
                    //only this format is valid "12|23" un string con uno o dos numeros separados por "|"
                    if(!regex.test(value)) throw new Error("Invalid Format");
                }
            }

        },
    });
};