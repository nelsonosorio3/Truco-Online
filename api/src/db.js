require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/finalgrupal`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});

//.authenticate() function is used to test if the connection is OK:
try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { User, Partidas, Message } = sequelize.models;

// Aca vendrian las relaciones
//relacion users <-----> games
User.belongsToMany(Games, { through: 'UserGames' });
Games.belongsToMany(User, { through: 'UserGames' });

// Associative entity for friends
const Friends = sequelize.define('Friends', {
  User1_Id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      as: 'User1',
      key: 'id'
    }
  },
  User2_Id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      as: 'User2',
      key: 'id'
    }
  },

  status: {
    type: DataTypes.ENUM('pending', 'rejected', 'accepted'),
    allowNull: false,
  },
});

User.belongsToMany(User, { through: 'Friends' });
User.belongsToMany(User, { through: 'Friends' });


// Prueba de conflicto
//
// https://stackoverflow.com/questions/24747652/sequelize-self-references-has-many-relation
//
//
// Probando conflicto


module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};