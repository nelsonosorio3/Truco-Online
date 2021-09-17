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
            validate: {
                notEmpty: true,
                notNull: {
                    msg: 'Please enter score.'
                }
            }
        },
    });
};