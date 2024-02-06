const express = require("express");
const server = express();

server.use(express.json());


/**************** BASE DE DONNEE CONFIGURATION ***************/




/************************************************************* */


/********************** SERVER CONNEXION  *********************/
server.listen(5000 , (req , res)=>{
    console.log(" +213's server is connected to port 5000");
})
/**************************************************************/