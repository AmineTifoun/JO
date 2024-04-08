import React, { useState, useEffect } from 'react';
import logo from './../Tools/logo.png';
import "./../Styles/DispData.css";
import site from'./../Tools/sites.jpg'
import axios from 'axios';
import {useNavigate , useLocation} from 'react-router-dom'

export default function DataDisp({ Data, type  }) {
    const [randomNumber, setRandomNumber] = useState(null);
    const [isIndiv, setisIndiv] = useState('');
    const [photo , setPhoto] = useState(null);
    const [date_naisse , setDate] = useState("");
    const navigate = useNavigate();
    // Fonction pour générer une date de naissance aléatoire
    function generateRandomDOB() {
        const minYear = 1990;
        const maxYear = 2003;
        const year = Math.floor(Math.random() * (maxYear - minYear + 1)) + minYear;
        const month = Math.floor(Math.random() * 12);
        const day = Math.floor(Math.random() * 28) + 1;
        const dob = new Date(year, month, day);

        return dob.toDateString(); // Convertir la date en format de chaîne lisible
    }

    useEffect(() => {
        if (!Data) {
            window.location.reload();
        }
    }, [Data]);
    
    const getAthbySport = async () => {
        try {
            console.log(Data.sport_ID);
            const res = await axios.post('http://localhost:3500/athBysport', { id_sport: Data.sport_ID });
            console.log(res.data);
            navigate('/ath', { state: { data: res.data.data, type: res.data.type } });
        } catch (err) {
            console.log(err);
        }
    }

    
    const getTransportBySite =  async()=>{
        try {
            console.log(Data);
            const res = await axios.post('http://localhost:3500/transport', { sites_ID: Data.sites_ID });
            console.log('PROBLEM');
            console.log(res);
            navigate('/Transport', { state: { data: res.data.data, type: res.data.type } });
        } catch (err) {
            console.log(err);
        }
    }

    const getCompetition = async () => {
        try {
            console.log(Data.sport_ID);
            const res = await axios.post('http://localhost:3500/competition', { id_comp: Data.sport_ID });
            
            navigate('/Results', { state: { data: res.data.data, type: res.data.type } });
        } catch (err) {
            console.log(err);
        }
    }

    const getSitesByComp = async ()=>{
        try {
            console.log("comp_ID ="+Data.comp_ID);
            const res = await axios.post('http://localhost:3500/siteByComp', { id_comp: Data.comp_ID });
            console.log(res.data);
            navigate('/Results', { state: { data: res.data.data, type: res.data.type } });
        } catch (err) {
            console.log(err);
        }
        
    }

    const getDate = async ()=>{
        try {
            console.log("comp_ID ="+Data.comp_ID);
            const res = await axios.post('http://localhost:3500/date', { id_comp: Data.comp_ID });
            console.log(res.data);
            navigate('/Results', { state: { data: res.data.data, type: res.data.type } });
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        console.log("Data updated:", Data);
        // Le reste du code ici
    }, [Data]);
    
    useEffect(() => {
        switch (type) {
            case 'ath':
                console.log("data sent :"+ Data);
                const min = 1;
                const max = 4;
                const random = Math.floor(Math.random() * (max - min + 1)) + min;
                setRandomNumber(random);
                setDate(generateRandomDOB()); // Générer une date de naissance aléatoire ici
                setPhoto((Data.img != null) ? "http://localhost:3500/images/"+Data.img : site)
                break;
            case 'sprt':
                setisIndiv((Data.isIndividual === 1) ? 'Individuel' : 'Collectif');
                setPhoto((Data.img != null) ? "http://localhost:3500/images/"+Data.img : site)
                break;
            case 'site':
                setPhoto((Data.img != null) ? "http://localhost:3500/images/"+Data.img : site)
                break;
            case 'compt':
                break ;
            case 'trnspr':
                break;
                case 'agenda':
                    break ;
            default:
                alert(" ERROR SETTING VARIABLES ");
        }
    }, [type, Data]);

    return (
        <>
            {Data && type === 'ath' && (
                <div className="ath">
                    <div className="TextContainer use">
                        <p><span className="style">Nom :</span> {Data.nom_ath}</p>
                        <p><span className="style">Prénom :</span> {Data.prenom_ath}</p>
                        <p><span className="style">Date de Naissance :</span> {(Data.date_naissance)?Data.date_naissance.slice(0 , 10 ) :date_naisse}</p> {/* Afficher la date de naissance ici */}
                        <p><span className="style">Nationalité :</span>       {Data.nationalite}</p>
                        <p><span className="style">Nombre de Médailles :</span> {(Data.nb_medailles)?Data.nb_medailles : randomNumber}</p>
                        
                    </div>
                    <div class="img-con">
                        <img  class ="profilePic" src={Data.image ? "http://localhost:3500/images/"+Data.image : logo} alt="Photo De Profile" width={165} />
                        <p><span className="style label2">Drapeau</span></p>
                    </div>
                </div>
            )}

            {Data && type === 'sprt' && (
                <div className="sprt">
                    <img  class ="profilePic" src={Data.img ? "http://localhost:3500/images/"+Data.img : logo} alt="Logo Sport" width={120} />
                    <div className="TextContainer sport">
                        <p><span className="style">Nom Fr:</span> {Data.nom_sport}</p>
                        <p><span className="style">Nom ENG:</span> {Data.nom_sport_eng}</p>
                        <p><span className="style">Type :</span> {isIndiv}</p>

                    </div>
                    <div class= 'btn-cont'>
                        <button className="sprt-btn" onClick={getAthbySport}> Athletes </button>
                        <button className="sprt-btn" onClick={getCompetition}> Competitions</button>
                    </div>
                </div>
            )}

            {Data && type === 'site' && (
                    <div className="site">
                    <img  class ="sitePic" src={photo} alt="Logo Localisation" width={120} />
                    <div className="TextContainer sites">
                        <p><span className="style">Nom Site:</span> {Data.nom_site}</p>
                        <p><span className="style">Adresse:</span> {Data.adresse}</p>
                        <p><span className="style">GPS :</span> {Data.gps}</p>
                        <p><span className="style">Capicité :</span> {Data.capacite}</p>
                    </div>
                    <div class= 'btn-cont'>
                        <button className="trsprt-btn sprt-btn" onClick={getTransportBySite}> Transports </button>
                    </div>
                </div>

            )}
            { Data && type === 'compt' && (
                <div className="compt">
                    <img  className ="compPic" src={Data.img ? "http://localhost:3500/images/"+Data.img : logo} alt="Logo Sport" width={140} />
                    <div className="TextContainer sites">
                        <p><span className="style">Nom Competition:</span> {Data.nom_comp}</p>
                        <p><span className="style">Catégorie:</span> {Data.categorie_comp}</p>
                        <p><span className="style">Niveau :</span> {Data.step_comp}</p>
                        <div class= 'btn-cont'>
                        <button className="trsprt-btn sprt-btn" onClick={getSitesByComp}> Sites </button>
                        <button className="trsprt-btn sprt-btn" onClick={getDate}> Date </button>
                    </div>
                    </div>
                </div>
            )}
            { Data && type === 'agenda' && (
                <div className="compt">
                    <div className="TextContainer sites">
                        <p><span className="style">Date:</span> {Data.date_deroulement}</p>
                        <p><span className="style">Heure:</span> {Data.heure_deroulement}</p>
                        <div class= 'btn-cont'>
                        <button className="trsprt-btn sprt-btn" onClick={(e)=>{navigate('/Filter')}}> RETOUR VERS FILTRE </button>
                    </div>
                    </div>
                </div>
            )}
            { Data &&  type === 'trnspr' && (
                <div className="compt">
                    <img  class ="profilePic" src={(Data.logo_ligne)? "http://localhost:3500/images/"+Data.logo_ligne : logo} alt="Logo Sport" width={140} />
                    <div className="TextContainer sites">
                        <p><span className="style">Nom Arret:</span> {Data.nom_arret}</p>
                        <p><span className="style">Type Transport:</span> {Data.type_transport}</p>
                        <p><span className="style">Num Ligne :</span> {Data.num_ligne}</p>
                        <p><span className="style">GPS :</span> {Data.gps_arret}</p>
                        <div class= 'btn-cont'>
                        <button className="trsprt-btn sprt-btn" onClick={(e)=>{ navigate('/Filter')}}> RETOUR AU FILTRE </button>
                    </div>
                    </div>
                </div>
            )}
        </>
    );
}
