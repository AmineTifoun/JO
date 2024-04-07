import React, { useEffect, useState } from 'react';
import DataDisp from '../Component/DataDisp';
import flags from './../Tools/flags.png';
import paris from './../Tools/paris.png';
import spr from '../Tools/PARIS-2024-VISUELS-PICTOGRAMMES-FOOTBALL-1080x1080-1.jpg';
import { useLocation } from 'react-router-dom';
import './../Styles/ResultPage.css'
import drapeau from './../Tools/drapeau+jo.png'
import facebook from './../Tools/facebook.png'
import instagram from './../Tools/instagram.png'
import twitter from './../Tools/twitter.png'

const ResultPage = () => {
    const location = useLocation();
    const [tuples, setTuples] = useState(null);
    const [type, setType] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0); 

    useEffect(() => {
        setTuples(location.state.data);
        setType(location.state.type);
    }, [location.state.data, location.state.type]);

    const goToPrevious = () => {
        if (tuples !== null) {
            setCurrentIndex((prevIndex) => Math.max(0, prevIndex - 1));
        }
    };

    const goToNext = () => {
        if (tuples !== null) {
            setCurrentIndex((prevIndex) => Math.min(tuples.length - 1, prevIndex + 1));
        }
    };

    return (
        <div className="ground">
            <img src={flags} alt='Flags' className='flags'></img>
            <div className="container">
                <img src={drapeau} alt='Flags' className='drapeau'></img>
                <h1 className="titre">Resultats De Recherche</h1>
                <div className="slider">
                    {tuples && (
                        <DataDisp Data={tuples[currentIndex]} type={type} />
                    )}
                { tuples && (<div>{currentIndex+1} / {tuples.length}</div>)}
                </div>
                <div className="navigation-buttons">
                    <button onClick={goToPrevious} disabled={currentIndex === 0} className='btn-nav'>Précédent</button>
                    <button onClick={goToNext} disabled={!tuples || currentIndex === tuples.length - 1} className='btn-nav'>Suivant</button>
                </div>
                <div className='communication'>
                    <a href='https://www.facebook.com/actujeuxolympiques/?locale=fr_FR'>
                    <img src={facebook} alt='Flags' className='social' ></img>
                    </a>
                    <a href='https://www.instagram.com/paris2024/?hl=fr'>
                    <img src={instagram} alt='Flags' className='social'></img>
                    </a>
                    <a href='https://twitter.com/jeuxolympiques?lang=fr'>
                    <img src={twitter} alt='Flags' className='social' ></img>
                    </a>
                </div>
            </div>
            <img src={paris} alt='Paris' className='paris'></img>
        </div>
    );
};

export default ResultPage;
