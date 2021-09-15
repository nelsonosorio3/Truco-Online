const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('partida', {
        state: {
            type: DataTypes.ENUM('finished', 'initialized', 'pending'),
            allowNull: false,
            //notEmpty doesn't allow empty strings
        },

        winner: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
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
            type:DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true,
                notNull: {
                    msg: 'Please enter a loser'
                }
            }
        },
s
    });
};