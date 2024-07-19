const mysql = require("mysql2");
const PropertiesReader = require("properties-reader");

const { decrypt } = require("./encryption");
const properties = PropertiesReader("./application.properties");

const connection = mysql.createConnection({
  host: properties.get("hostname"),
  user: properties.get("username"),
  password: decrypt(properties.get("password")),
  database: properties.get("database"),
});

module.exports = connection.promise();
