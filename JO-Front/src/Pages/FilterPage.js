import React from "react";
import flags from './../Tools/flags.png'
import paris from './../Tools/paris.png';
import Filter from './../Component/Filter';
import './../Styles/FilterPage.css';
import drapeau from './../Tools/drapeau.png'
import logo from './../Tools/logo.png'
import facebook from './../Tools/facebook.png'
import instagram from './../Tools/instagram.png'
import twitter from './../Tools/twitter.png'

import {Navigate} from "react-router-dom";

export default function FiltrePage(){
    return(
        <div className="ground">
            <img src={flags} alt='Flags' className='flags'></img>
            <div className="container">
                <img src={drapeau} alt='Flags' className='drapeau'></img>
                <h1 className="Title">Filtre De Recherche</h1>
                <Filter></Filter>
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
        
    )
}