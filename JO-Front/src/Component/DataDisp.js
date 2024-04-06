import React, { useState, useEffect } from 'react';
import logo from './../Tools/logo.png';
import './../Styles/DispData.css'; 

export default function DataDisp({ Data, type }) {
    const [randomNumber, setRandomNumber] = useState(null);
    const [isIndiv, setisIndiv] = useState('');
    const [photo , setPhoto] = useState(null);

    useEffect(() => {
        switch (type) {
            case 'ath':
                const min = 1;
                const max = 4;
                const random = Math.floor(Math.random() * (max - min + 1)) + min;
                setRandomNumber(random);
                setPhoto((Data.img != null) ? Data.img : logo)
                break;
            case 'sprt':
                setisIndiv((Data.isIndividual === 1) ? 'Individuel' : 'Collectif');
                setPhoto((Data.img != null) ? Data.img : logo)
                break;
            case 'site':
                break;
            default:
                alert(" ERROR SETTING VARIABLES ");
        }
    }, [type, Data]);

    return (
        <>
            {type === 'ath' && (
                <div className="Container">
                    <div className="TextContainer">
                    <p><span className="style">Nom :</span> {Data.nom_ath}</p>
                    <p><span className="style">Prénom :</span> {Data.prenom_ath}</p>
                    <p><span className="style">Date de Naissance :</span> {Data.date_naissance}</p>
                    <p><span className="style">Nombre de Médailles :</span> {randomNumber}</p>
                    <p><span className="style">Pays :</span> {Data.pays}</p>
                    </div>
                    <div class="img-con">
                    <img  class ="profilePic" src={photo} alt="Photo De Profile" width={120} />
                    <p><span className="style label">      Photo De L'Athlethe</span></p>
                    </div>
                </div>
            )}

            {type === 'sprt' && (
                <div className="Container sprt">
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
        </>
    );
}
