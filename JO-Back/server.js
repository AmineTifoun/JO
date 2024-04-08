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
    let formule ;
    // Vérifier si au moins une variable de recherche est définie
    if (NomAth || PrenomAth || Sport || Pays) {
        if(Sport){
            formule = "SELECT * FROM Pays JOIN Athletes ON Athletes.nationalite = Pays.code JOIN participer ON participer.athletes_id = Athletes.ath_ID JOIN sport ON sport.sport_ID = participer.id_sport  WHERE 1=1";
            formule += Sport ? ` AND nom_sport LIKE '%${Sport}%'` : '';
        }else{
            formule="SELECT * FROM Pays JOIN Athletes ON Athletes.nationalite = Pays.code where 1=1 "
        }
        formule += NomAth ? ` AND nom_ath LIKE '%${NomAth}%'` : '';
        formule += PrenomAth ? ` AND prenom_ath LIKE '%${PrenomAth}%'` : '';
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

server.post('/siteByComp' , (req , res)=>{
    console.log("siteByComp");
    const { id_comp} = req.body;
    let formule ;
        formule = `SELECT * FROM derouler JOIN competition ON derouler.id_comp = competition.comp_ID JOIN sites ON sites.sites_ID = derouler.id_site WHERE comp_ID = '${id_comp}'`
        db.query(formule, (err, data) => {
            if (err) {
                console.log(err);
                return res.status(300).json(err);
            }
            console.log(data);
            return res.status(200).json({
                data: data ,
                type:'site'
            });
        });
    
})

server.post('/date' , (req , res)=>{
    const { id_comp} = req.body;
    let formule ;
        formule = `SELECT * FROM programmer JOIN competition ON programmer.compete_id = competition.comp_ID JOIN calendrier ON calendrier.agenda_ID = programmer.agenda_ID WHERE comp_ID = '${id_comp}'`
        db.query(formule, (err, data) => {
            if (err) {
                console.log(err);
                return res.status(300).json(err);
            }
            console.log(data);
            return res.status(200).json({
                data: data ,
                type:'agenda'
            });
        });
})

server.post('/updateComp' , (req,res)=>{
    console.log(req.body);
    const { id, nom_comp, categorie_comp, step_comp} = req.body;
    if( nom_comp|| categorie_comp|| step_comp ){
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
    })}else{
        res.json({
            msg:"PROBLEME ON UPDATING"
        })
}})

server.post('/transport', (req, res)=>{
    const {sites_ID} = req.body ;
    console.log(sites_ID);
    const formule = `SELECT * FROM transport  JOIN desservir ON transport.arret_ID = id_transport JOIN sites ON desservir.id_sites = sites.sites_ID where sites_ID =  '${sites_ID}'`; 
    db.query( formule , (err  , data)=>{
        if( err){
            console.log(err);
            return res.status(400);
        }
        console.log(data);
        return res.status(200).json({
            data: data ,
            type: 'trnspr'
        }
        );

    })
})

server.post('/deleteSite' , (req , res)=>{
    const { sites_ID } = req.body;
    console.log(req.b)
    if( sites_ID){
        console.log("delete" + req.body);
        const fomrule = `DELETE FROM sites  WHERE sites_ID= '${sites_ID}'`;
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
        }  )

server.post('/updateSite' ,( req , res)=>{
    const { id, nom_site, capacite, adresse, gps } = req.body;
    if(nom_site || capacite || adresse ||gps){
    let formule = "UPDATE sites SET ";
    formule += (nom_site) ? `nom_site = '${nom_site}' ` : '';
    formule += (capacite) ? `capacite = '${capacite}' ` : '';
    formule += (adresse) ? `adresse = '${adresse}' ` : '';
    formule += (gps) ? `gps = '${gps}' ` : '';
    formule += `WHERE sites_ID = '${id}'`;
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
    });}else{
        res.json({
            msg:"PROBLEME ON UPDATING"
        })
    }
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

server.post('/deleteTrans' , (req , res)=>{
    const { arret_ID }= req.body;
    db.query(`DELETE FROM transport WHERE arret_ID = '${arret_ID}'`, (err , data)=>{
        if( err){
            console.log(err);
            return res.status(400);
        }
        console.log("DELETED")
        return res.status(200).json({
            statu : "DELETED"
        });
    })
})
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


server.post('/deleteComp' , ( req , res)=>{
    console.log('delete comp')
    const { comp_ID }= req.body;
    db.query(`DELETE FROM competition WHERE comp_ID = '${comp_ID}'`, (err , data)=>{
        if( err){
            console.log(err);
            return res.status(400);
        }
        console.log("DELETED")
        return res.status(200).json({
            statu : "DELETED"
        });
    })

})

server.post('/sites', (req , res)=>{
    console.log(req.body);
    const { nomSite, nom_sport , capacite , adress } = req.body;
    let formule ;
    // Vérifier si au moins une variable de recherche est définie
    if (nomSite || capacite || capacite || adress || nom_sport) {
        if( nom_sport){
             formule = "SELECT * FROM sport JOIN abriter ON sport.sport_ID = abriter.sport_id JOIN competition ON abriter.id_compet = competition.comp_ID JOIN derouler ON competition.comp_ID= derouler.id_comp JOIN sites ON  derouler.id_site = sites.Sites_ID WHERE 1=1";
        }else{
             formule = "SELECT * FROM sites where 1=1"
        }
        formule += nomSite ? ` AND nom_site LIKE '%${nomSite}%'` : '';
        formule += nom_sport ? ` AND nom_sport LIKE '%${nom_sport}%'` : '';
        formule += capacite ? ` AND capacite <= '${capacite}'` : '';
        formule += adress ? ` AND adresse LIKE '%${adress}%'` : '';


        // Exécuter la requête SQL
        db.query(formule, (err, data) => {
            if (err) {
                console.log(err);
                return res.status(300).json(err);
            }
            console.log(data);
            return res.status(200).json({
                data: data ,
                type:'site'
            });
        });
    } else {
        // Aucune variable de recherche n'est définie, renvoyer une réponse indiquant qu'aucune recherche n'a été effectuée
        return res.json({ message: "Aucun critère de recherche spécifié" });
    }
    
})



server.post('/updateAth', (req, res) => {
    console.log(req.body);
    const { id, nomFr, date_naissance, medailles, PrenomFr } = req.body;
    let formule = "UPDATE Athletes SET ";
        formule += (nomFr) ? `nom_ath = '${nomFr}', ` : '';
        formule += (PrenomFr) ? `prenom_ath = '${PrenomFr}', ` : '';
        formule += (date_naissance) ? `date_naissance = '${date_naissance}', ` : '';
        formule += (medailles) ? `nb_medailles = '${medailles}', ` : '';

        // Supprimer la dernière virgule si elle existe
        if (formule.endsWith(', ')) {
            formule = formule.slice(0, -2); // Supprimer les deux derniers caractères
        }

        formule += ` WHERE ath_ID = '${id}'`;
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
});

server.post('/updateSprt' , (req , res)=>{
    const { id, nomFr, adhesion, isIndiv, nomEng } = req.body;
    let formule = "UPDATE sport SET ";
formule += (nomFr) ? `nom_sport = '${nomFr}', ` : '';
formule += (adhesion) ? `date_adhesion = '${adhesion}', ` : '';
formule += (isIndiv) ? `isIndividual = '${isIndiv}', ` : '';
formule += (nomEng) ? `nom_sport_eng = '${nomEng}', ` : '';

// Supprimer la dernière virgule si elle existe
if (formule.endsWith(', ')) {
    formule = formule.slice(0, -2); // Supprimer le dernier caractère
}

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

server.post('/updateTrans' , (req , res)=>{
    console.log("AMINE");
    const { id, nom_arret, gps , num_ligne } = req.body;
    let formule = "UPDATE transport SET ";
    formule += (nom_arret) ? `nom_arret = '${nom_arret}'` : '';
    formule += (num_ligne) ? `num_ligne = '${num_ligne}'` : '';
    formule += (gps) ? `gps_arret = '${gps}' ` : '';
    formule += `WHERE arret_ID = '${id}'`;
    console.log(formule);
    db.query(formule, (err, data) => {
        if (err) {
            console.log(formule);
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
