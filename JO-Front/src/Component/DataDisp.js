import React, { useState, useEffect } from 'react';
import logo from './../Tools/logo.png';
import "./../Styles/DispData.css";
import site from'./../Tools/sites.jpg'

export default function DataDisp({ Data, type }) {
    const [randomNumber, setRandomNumber] = useState(null);
    const [isIndiv, setisIndiv] = useState('');
    const [photo , setPhoto] = useState(null);
    console.log("DATA DISP ");
    useEffect(() => {
        switch (type) {
            case 'ath':
                console.log("data sent :"+ Data);
                const min = 1;
                const max = 4;
                const random = Math.floor(Math.random() * (max - min + 1)) + min;
                setRandomNumber(random);
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
                <div className="back ath">
                    <div className="TextContainer use">
                    <p><span className="style">Nom :</span> {Data.nom_ath}</p>
                    <p><span className="style">Prénom :</span> {Data.prenom_ath}</p>
                    <p><span className="style">Date de Naissance :</span> {Data.date_naissance.slice(0, 10)}</p>
                    <p><span className="style">Nombre de Médailles :</span> {randomNumber}</p>
                    </div>
                    <div class="img-con">
                    <img  class ="profilePic" src={photo} alt="Photo De Profile" width={120} />
                    <p><span className="style label">      Pays De L'Athlethe</span></p>
                    </div>
                </div>
            )}

            {type === 'sprt' && (
                <div className="back sprt">
                    <img  class ="profilePic" src={photo} alt="Logo Sport" width={120} />
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
                <div className="back site">
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
