import React from "react";
import './../Styles/Update.css'
import axios from "axios";
import {useNavigate} from 'react-router-dom'

export default function Update({ ID, type }) {
    const navigate = useNavigate();
    
    const handleSubmitAth = async (event) => {
        event.preventDefault();
        const update = {};
        update.id = ID; // Assuming ID is defined elsewhere in your code
    
        // Extract values from form fields
        const nomFr = event.target[0].value;
        const prenomFr= event.target[1].value;
        const date_naissance= event.target[2].value;
        const medailles = event.target[3].value;
    
        // Add properties to update object if they exist
        if (prenomFr) {
            update.PrenomFr = prenomFr;
        }
        if (nomFr) {
            update.nomFr = nomFr;
        }
        if (date_naissance) {
            update.date_naissance = date_naissance;
        }
        if (medailles) {
            update.medailles = medailles;
        }
    
        try {
            const res = await axios.post('http://localhost:3500/updateAth', update);
            console.log(res.data);
            navigate('/Filter');
        } catch (err) {
            console.error(err);
        }
    };
    

    const handleSubmitSport = async(event)=>{
            event.preventDefault();
            const update = {};
            update.id = ID; // Assuming ID is defined elsewhere in your code
            console.log(update.id)
            // Extract values from form fields
            const nomFr = event.target[0].value;
            const nomEng= event.target[1].value;
            const adhesion= event.target[2].value;
            const isIndiv = event.target[3].value;
        
            // Add properties to update object if they exist
            if (nomEng) {
                update.nomEng = nomEng;
            }
            if (nomFr) {
                update.nomFr = nomFr;
            }
            if (adhesion) {
                update.adhesion = adhesion;
            }
            if (isIndiv) {
                update.isIndiv = 1;
            }else{
                update.isIndiv = 2;
            }
        
            try {
                const res = await axios.post('http://localhost:3500/updateSprt', update);
                navigate('/Filter');
            } catch (err) {
                console.error(err);
            }
        };
        
        const handleSubmitCompt = async(event)=>{
            event.preventDefault();
            const update = {};
            update.id = ID; // Assuming ID is defined elsewhere in your code
            console.log(update.id)
            // Extract values from form fields
            const nom_comp = event.target[0].value;
            const categorie_comp= event.target[1].value;
            const step_comp= event.target[2].value;
           
        
            // Add properties to update object if they exist
            if (categorie_comp) {
                update.categorie_comp = categorie_comp;
            }
            if (nom_comp) {
                update.nom_comp = nom_comp;
            }
            if (step_comp) {
                update.step_comp = step_comp;
            }
      
            try {
                const res = await axios.post('http://localhost:3500/updateComp', update);
                navigate('/Filter');
            } catch (err) {
                console.error(err);
            }
        };

        const handleSubmitSite = async(event)=>{
            event.preventDefault();
            const update = {};
            update.id = ID; // Assuming ID is defined elsewhere in your code
            console.log(event.target)
            // Extract values from form fields
            const nom_site = event.target[0].value;
            console.log(nom_site);
            const gps= event.target[1].value;
            const capacite= event.target[2].value;
            const adresse= event.target[3].value;
           
        
            // Add properties to update object if they exist
            if (gps) {
                update.gps = gps;
            }
            if (nom_site) {
                update.nom_site = nom_site;
            }
            if (capacite) {
                update.capacite = capacite;
            }
            if (adresse) {
                update.adresse = adresse;
            }
      
            try {
                const res = await axios.post('http://localhost:3500/updateSite', update);
                navigate('/Filter');
            } catch (err) {
                console.error(err);
            }
        };

        const handleSubmitTrans = async(event)=>{
            event.preventDefault();
            const update = {};
            update.id = ID; // Assuming ID is defined elsewhere in your code
            // Extract values from form fields
            const nom_arret = event.target[0].value;
            const gps= event.target[2].value;
            const num_ligne= event.target[1].value;
           
        
            // Add properties to update object if they exist
            if (gps) {
                update.gps = gps;
            }
            if (nom_arret) {
                update.nom_arret = nom_arret;
            }
            if (num_ligne) {
                update.num_ligne = num_ligne;
            }      
            try {
                const res = await axios.post('http://localhost:3500/updateTrans', update);
                console.log(res)
                navigate('/Filter');
            } catch (err) {
                console.error(err);
            }
        };
    return (
        <>
            <div className="bg">
                {type === "ath" && (
                    <div className="model_ath">
                        <h3 className="titre"> Update Athlete</h3>
                        <form className="form" onSubmit={handleSubmitAth}>
                            <input type="text" className="input" placeholder="Nom Athletes" />
                            <input type="text" className="input" placeholder="Prenom" />
                            <input type="text" className="input" placeholder="aaaa/mm/jj" />
                            <input type="text" className="input" placeholder="Medailles" />
                            <button className="btn">APPLIQUER</button>
                        </form>
                    </div>
                )}
                { type == "sprt" &&(
                    <div className="model_ath">
                        <h3 className="titre"> Update Sport</h3>
                        <h4>     </h4>
                        <form className="form" onSubmit={handleSubmitSport}>
                        <input type="text" className="input" placeholder="Nom Sport (Fr)" />
                        <input type="text" className="input" placeholder="Nom Sport (ENG)" />
                        <input type="text" className="input" placeholder="Date Ahésion"/>
                        <label className="label1">
                        <input type="checkbox" className="check" value="Individuel" />
                        Individuel
                        </label>
                        <label className="label1">
                        <input type="checkbox" className="check" value="Collectif" />
                        .      .Collectif
                        </label>
                        <button className="btn" type="submit">APPLIQUER</button>
                    </form>
                    </div>
                )
                }
                { type === "site" &&(
                    <div className="model_ath">
                        <h3 className="titre"> Update Site</h3>
                        <h4>     </h4>
                        <form className="form" onSubmit={handleSubmitSite}>
                        <input type="text" className="input" placeholder="Nom Site" />
                        <input type="text" className="input" placeholder="GPS" />
                        <input type="text" className="input" placeholder="Capacité" />
                        <input type="text" className="input" placeholder="Adresse" />
                        <button className="btn" >APPLIQUER</button>
                    </form>
                    </div>
                )
                }
                { type === "compt" &&(
                    <div className="model_ath">
                        <h3 className="titre"> Update Competition</h3>
                        <h4>     </h4>
                        <form className="form" onSubmit={handleSubmitCompt}>
                        <input type="text" className="input" placeholder="Nom Compet" />
                        <input type="text" className="input" placeholder="Categorie Compet" />
                        <input type="text" className="input" placeholder="Step Compet" />
                        <button className="btn">APPLIQUER</button>
                    </form>
                    </div>
                )
                }
                { type === "trnspr" &&(
                    <div className="model_ath">
                        <h3 className="titre"> Update Transport</h3>
                        <h4>     </h4>
                        <form className="form" onSubmit={handleSubmitTrans}>
                        <input type="text" className="input" placeholder="Nom Arret" />
                        <input type="text" className="input" placeholder="Num Ligne " />
                        <input type="text" className="input" placeholder="GPS" />
                        <button className="btn">APPLIQUER</button>
                    </form>
                    </div>
                )
                }
                
           </div>
        </>
    );
}
