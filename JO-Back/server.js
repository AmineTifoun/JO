const express = require("express");
const mysql = require("mysql2");
const cors = require('cors');
var server = express();

server.use(cors());

/**************** BASE DE DONNEE CONFIGURATION ***************/

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Amine.Tifoun@2003",
    database: "jo_2024",
    connectionLimit: 5
})

/************************************************************* */

server.get('/athletes', (req, res) => {
    const formule = "SELECT * FROM athletes";
    db.query(formule, (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json(data);
    })
})

/********************** SERVER CONNEXION  *********************/
server.listen(3500, (req, res) => {
    console.log(" +213's server is connected to port 5000");
})
/**************************************************************/
