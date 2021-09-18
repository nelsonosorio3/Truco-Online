const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {

    sequelize.define('user', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        gamesPlayed: {
            type: DataTypes.INTEGER,
        },
        gamesWon: {
            type: DataTypes.INTEGER,
        },
        gamesLost: {
            type: DataTypes.INTEGER,
        },

    });
};