// module.exports = {
//     HOST: "localhost",
//     USER: "root",
//     PASSWORD: "",
//     DB: "e_controllerv1.0"
//   };

module.exports = {
    client: 'mysql2',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'transport',
        dateStrings: true
        
    }
}

// const Sequelize = require("Sequelize");
// // create connection
// const db = new Sequelize('e_controllerv1.0', 'root', '', {
//     host: 'localhost',
//     dialect: 'mysql'
// });
 
// // export connection

// module.exports = db;