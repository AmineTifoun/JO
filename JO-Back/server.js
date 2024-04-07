const express = require("express");
const mysql = require("mysql2");
const cors = require('cors');
var server = express();

server.use(cors());
server.use(express.json());
server.use(express.static('public'));
/**************** BASE DE DONNEE CONFIGURATION ***************/

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Amine.Tifoun@2003",
    database: "JO_PARIS_2024",
    connectionLimit: 5
})

/************************************************************* */

server.post('/athletes', (req, res) => {
    console.log(req.body);
    const { NomAth, PrenomAth } = req.body;
    // Vérifier si au moins une variable de recherche est définie
    if (NomAth || PrenomAth) {
        // Au moins une variable est définie, construire la requête SQL en fonction des données reçues
        let formule = "SELECT * FROM athletes WHERE 1=1";
        formule += NomAth ? ` AND athletes.nom_ath = '${NomAth}'` : '';
        formule += PrenomAth ? ` AND athletes.prenom_ath = '${PrenomAth}'` : '';

        // Exécuter la requête SQL
        db.query(formule, (err, data) => {
            if (err) {
                return res.json(err);
            }
            console.log(data);
            return res.status(200).json({
                data: data ,
                type:'ath'
            });
        });
    } else {
        // Aucune variable de recherche n'est définie, renvoyer une réponse indiquant qu'aucune recherche n'a été effectuée
        return res.json({ message: "Aucun critère de recherche spécifié" });
    }
});


server.get('/sport' , (req, res)=>{
    const formule = " SELECT * FROM SPORT "; 
    db.query( formule , (err  , data)=>{
        if( err){
            return res.status(400);
        }
        return res.json(data);

    })
})


server.get('/competiton',(req, res)=>{
    const formule = " SELECT * FROM COMPETITON "; 
    db.query( formule , (err  , data)=>{
        if( err){
            return res.status(400);
        }
        return res.json(data);

    });
})

server.get('/transport', (req, res)=>{
    const formule = " SELECT * FROM transport "; 
    db.query( formule , (err  , data)=>{
        if( err){
            return res.status(400);
        }
        return res.json(data);

    })
})
/********************** SERVER CONNEXION  *********************/
server.listen(3500, () => {
    console.log(" +213's server is connected to port 5000");
})
/**************************************************************/
