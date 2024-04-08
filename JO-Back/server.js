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


server.post('/competition',(req, res)=>{
    console.log(req.body);
    const { id_comp}= req.body;
    const formule = ` SELECT * FROM abriter JOIN competition ON competition.comp_ID = abriter.id_compet JOIN sport ON sport.sport_ID = abriter.sport_id where sport.sport_ID= '${id_comp}' `; 
    db.query( formule , (err  , data)=>{
        if( err){
            return res.status(400);
        }
        console.log(data);
        return res.json({
            data: data , 
            type:'compt'
        });

    });
})

server.post('/updateComp' , (req,res)=>{
    console.log(req.body);
    const { id, nom_comp, categorie_comp, step_comp, } = req.body;
    let formule = "UPDATE competition SET ";
    formule += (nom_comp) ? `nom_comp = '${nom_comp}' ` : '';
    formule += (categorie_comp) ? `categorie_comp = '${categorie_comp}' ` : '';
    formule += (step_comp) ? `step_comp = '${step_comp}' ` : '';
    formule += `WHERE comp_ID = '${id}'`;
    db.query(formule, (err, data) => {
        if (err) {
            console.log(err);
            res.status(300).json({
                state: err
            });
        } else {
            res.status(200).json({
                state: "Success"
            });
        }
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

server.post('/updateAth', (req, res) => {
    console.log(req.body);
    const { id, nomAth, date_naissance, medailles, PrenomAth } = req.body;
    let formule = "UPDATE Athletes SET ";
    formule += (nomAth) ? `nom_ath = '${nomAth}' ` : '';
    formule += (date_naissance) ? `date_naissance = '${date_naissance}' ` : '';
    formule += (medailles) ? `nb_medailles = '${medailles}' ` : '';
    formule += (PrenomAth) ? `prenom_ath = '${PrenomAth}' ` : '';
    formule += `WHERE ath_ID = '${id}'`;
    console.log(formule);
    db.query(formule, (err, data) => {
        if (err) {
            res.status(300).json({
                state: err
            });
        } else {
            res.status(200).json({
                state: "Success"
            });
        }
    });
});

server.post('/updateSprt' , (req , res)=>{
    const { id, nomFr, adhesion, isIndiv, nomEng } = req.body;
    let formule = "UPDATE sport SET ";
    formule += (nomFr) ? `nom_sport = '${nomFr}'` : '';
    formule += (adhesion) ? `date_adhesion = '${adhesion}'` : '';
    formule += (isIndiv) ? `isIndividual = '${isIndiv}' ` : '';
    formule += (nomEng) ? `nom_sport_eng = '${nomEng}' ` : '';
    formule += `WHERE sport_ID = '${id}'`;
    console.log(formule);
    db.query(formule, (err, data) => {
        if (err) {
            console.log(err);
            res.status(300).json({
                state: err
            });
        } else {
            res.status(200).json({
                state: "Success"
            });
        }
    });
})


/********************** SERVER CONNEXION  *********************/
server.listen(3500, () => {
    console.log(" +213's server is connected to port 5000");
})
/**************************************************************/
