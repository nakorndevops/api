const express = require('express');

require('dotenv').config();
const port = process.env.PORT;
const mysql_host = process.env.MYSQL_HOST;
const mysql_user = process.env.MYSQL_USER;
const mysql_password = process.env.MYSQL_PASSWORD;
const mysql_database = process.env.MYSQL_DATABASE;

const mysql = require('mysql2');
const con = mysql.createConnection({
  host: mysql_host,
  user: mysql_user,
  password: mysql_password,
  database: mysql_database
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

const app = express ();
app.use(express.json());


app.get('/appoint', (request, response) => {
      con.query("SELECT clinicID FROM visitrecord WHERE appointdate=CURDATE()", function (err, result, fields) {
         if (err) throw err;
         response.send(result);
      });
});

app.get('/today_summary', (request, response) => {
      con.query("SELECT clinicID FROM visitrecord WHERE dates=CURDATE()", function (err, result, fields) {
         if (err) throw err;
         response.send(result);
      });
});

app.get('/find', (request, response) => {
      con.query("SELECT clinicID FROM patientgeneraldata WHERE patientname='นคร'", function (err, result, fields) {
         if (err) throw err;
         response.send(result);
      });
});

app.listen(port, () => {
  console.log("Server Listening on PORT:", port);
});