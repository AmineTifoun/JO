import React, { useState, useEffect } from 'react';
import logo from './../Tools/logo.png';
import "./../Styles/DispData.css";
import site from'./../Tools/sites.jpg'
import axios from 'axios';

export default function DataDisp({ Data, type  }) {
    const [randomNumber, setRandomNumber] = useState(null);
    const [isIndiv, setisIndiv] = useState('');
    const [photo , setPhoto] = useState(null);
    const [date_naisse , setDate] = useState("");
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
            default:
                alert(" ERROR SETTING VARIABLES ");
        }
    }, [type, Data]);

    return (
        <>
            {type === 'ath' && (
                <div className="ath">
                    <div className="TextContainer use">
                        <p><span className="style">Nom :</span> {Data.nom_ath}</p>
                        <p><span className="style">Prénom :</span> {Data.prenom_ath}</p>
                        <p><span className="style">Date de Naissance :</span> {date_naisse}</p> {/* Afficher la date de naissance ici */}
                        <p><span className="style">Nationalité :</span>       {Data.nationalite}</p>
                        <p><span className="style">Nombre de Médailles :</span> {randomNumber}</p>
                        
                    </div>
                    <div class="img-con">
                        <img  class ="profilePic" src={Data.img ? "http://localhost:3500/images/"+Data.img : logo} alt="Photo De Profile" width={165} />
                        <p><span className="style label2">Drapeau</span></p>
                    </div>
                </div>
            )}

            {type === 'sprt' && (
                <div className="sprt">
                    <img  class ="profilePic" src={Data.img ? "http://localhost:3500/images/"+Data.img : logo} alt="Logo Sport" width={120} />
                    <div className="TextContainer sport">
                        <p><span className="style">Nom Fr:</span> {Data.nom_sport}</p>
                        <p><span className="style">Nom ENG:</span> {Data.nom_sport_eng}</p>
                        <p><span className="style">Type :</span> {isIndiv}</p>

                    </div>
                    <div class= 'btn-cont'>
                        <button className="sprt-btn"> Athletes </button>
                        <button className="sprt-btn"> Competitions</button>
                    </div>
                </div>
            )}

            { type === 'site' && (
                <div className="site">
                    <img  class ="sitePic" src={photo} alt="Logo Localisation" width={1220} />
                    <div className="TextContainer sites">
                        <p><span className="style">Nom Site:</span> {Data.nom_site}</p>
                        <p><span className="style">Adresse:</span> {Data.adresse}</p>
                        <p><span className="style">GPS :</span> {Data.gps}</p>
                        <p><span className="style">Capicité :</span> {Data.capacite}</p>
                    </div>
                    <div class= 'btn-cont'>
                        <button className="trsprt-btn sprt-btn"> Transports </button>
                    </div>
                </div>
            )}
        </>
    );
}
