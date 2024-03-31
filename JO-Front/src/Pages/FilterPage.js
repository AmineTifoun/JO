import React from "react";
import flags from './../Tools/flags.png'
import paris from './../Tools/paris.png';
import Filter from './Component/Filter';
import './../Styles/FilterPage.css';
import {Navigate} from "react-router-dom";

export default function FiltrePage(){
    return(
        <div className="ground">
            <img src={flags} alt='Flags' className='flags'></img>
            <div className="container">
                <h1 className="Title">Filtre De Recherche</h1>
                <Filter></Filter>
            </div>
            <img src={paris} alt='Paris' className='paris'></img>
        </div>
        
    )
}