const express = require("express");
const server = express();
const { createPool }= require("mysql")
server.use(express.json());


/**************** BASE DE DONNEE CONFIGURATION ***************/

const pool = createPool({
    host:"localhost",
    user:"root",
    password:"amine",
    database:"JO",
    connectionLimit:5
})


/************************************************************* */


/********************** SERVER CONNEXION  *********************/
server.listen(5000 , (req , res)=>{
    console.log(" +213's server is connected to port 5000");
})
/**************************************************************/