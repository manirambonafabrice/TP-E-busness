const Sequelize = require("Sequelize");
// create connection
const db = new Sequelize('sequelize_db', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});
 
// export connection

module.exports = db;