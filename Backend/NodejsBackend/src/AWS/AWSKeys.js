const mysql = require('mysql');

const db_connection = mysql.createConnection({
  host     : "database-1.cy4vohpq0xqv.us-east-1.rds.amazonaws.com",
  user     : "admin",
  password : "Semi_2022",
  database : "superStorage",
  port     : 3306
});
// Connect to MySQL server
 db_connection.connect((err) => {
    if (err) {
      console.log("Database Connection Failed !!!", err);
    } else {
      console.log("connected to Database");
    }
  });
module.exports = db_connection;

