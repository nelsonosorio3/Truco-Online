const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('user', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        gamesPlayed: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        gamesWon: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        gamesLost: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

    });
};