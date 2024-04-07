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
    const { NomAth, PrenomAth , Sport , Pays } = req.body;
    // Vérifier si au moins une variable de recherche est définie
    if (NomAth || PrenomAth || Sport || Pays) {
        // Au moins une variable est définie, construire la requête SQL en fonction des données reçues
        let formule = "SELECT * FROM Athletes JOIN Pays ON Athletes.nationalite = Pays.code WHERE 1=1";
        formule += NomAth ? ` AND nom_ath LIKE '%${NomAth}%'` : '';
        formule += PrenomAth ? ` AND prenom_ath LIKE '%${PrenomAth}%'` : '';
        formule += Sport ? ` AND nom_sport LIKE '%${Sport}%'` : '';
        formule += Pays ? ` AND nom_pays LIKE '%${Pays}%'` : '';


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


server.post('/sport' , (req, res)=>{
    console.log(req.body);
    const { nomEng, nomFr , type } = req.body;
    // Vérifier si au moins une variable de recherche est définie
    if (nomEng || nomFr || type) {
        // Au moins une variable est définie, construire la requête SQL en fonction des données reçues
        let formule = "SELECT * FROM sport WHERE 1=1";
        formule += nomFr ? ` AND nom_sport LIKE '%${nomFr}%'` : '';
        formule += nomEng ? ` AND nom_sport_eng LIKE '%${nomEng}%'` : '';
        formule += type ? ` AND isIndividual = '${type}'` : '';

    db.query( formule , (err  , data)=>{
        if( err){
            console.log(err);
            return res.status(400).json();
        }
        console.log(data);
        return res.status(200).json({
            data : data,
            type : 'sprt'
        });

    })
    }else{
        return res.json({ message: "Aucun critère de recherche spécifié" });
    }
    }
)


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


server.post('/ath',(req , res)=>{
    const { ath_ID } = req.body;
    console.log(req.body);
    if( ath_ID){
        console.log(req.body);
        const fomrule = `DELETE FROM athletes  WHERE ath_ID= '${ath_ID}'`;
        db.query( fomrule , (err  , data)=>{
            if( err){
                console.log(err);
                return res.status(400);
            }
            console.log("DELETED")
            return res.status(200).json({
                statu : "DELETED"
            });
    })    
        } else{
            res.json({
                msg:"PROBLEME ON DELETING"
            })
        }
        } 
    )

    server.post('/sprt',(req , res)=>{
        const { ath_ID } = req.body;
        console.log(req.body);
        if( ath_ID){
            console.log(req.body);
            const fomrule = `DELETE FROM sport  WHERE sport_ID = '${ath_ID}'`;
            db.query( fomrule , (err  , data)=>{
                if( err){
                    console.log(err);
                    return res.status(400);
                }
                console.log("DELETED")
                return res.status(200).json({
                    statu : "DELETED"
                });
        })    
            } else{
                res.json({
                    msg:"PROBLEME ON DELETING"
                })
            }
            } 
        )

server.post('/athBysport', (req, res) => {
    const { id_sport} = req.body;
    const  formule = `SELECT * FROM participer JOIN sport ON participer.id_sport= sport.sport_ID JOIN athletes ON athletes.ath_ID = participer.athletes_id where sport_ID='${id_sport}' `;
    db.query( formule , (err  , data)=>{
        if( err){
            console.log(err);
            return res.status(400).json();
        }
        console.log(data);
        return res.status(200).json({
            data : data,
            type : 'ath'
        });
})
}
);

/********************** SERVER CONNEXION  *********************/
server.listen(3500, () => {
    console.log(" +213's server is connected to port 5000");
})
/**************************************************************/
