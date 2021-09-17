const server = require('./src/app.js');
const { conn } = require('./src/db.js');

// Syncing all the models at once.
// [force flag]
// If a table exists already exists, the method will DROP it and CREATE a new one. 
// If it doesn't exist, a table is just created. 
conn.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
    console.log("The table for the User model was just (re)created!");
  });
})