import {React , useState } from 'react';
import "./../Styles/Home.css";
import flags from './../Tools/flags.png'
import paris from './../Tools/paris.png'
import drapeau from './../Tools/drapeau.png'
import logo from './../Tools/logo.png'
import facebook from './../Tools/facebook.png'
import instagram from './../Tools/instagram.png'
import twitter from './../Tools/twitter.png'
import loop from './../Tools/Loop.png'
import filter from './../Tools/filter.png'
import TUBE from './../Tools/TUBE.png'
import { useNavigate } from 'react-router-dom';

export default function Home(){
    const [ search , setSeach] = useState("");
    const navigate = useNavigate()
    function HandleSearchChange(e){
        setSeach(e.target.value);
        
    }

    function onSubmit(){/* Traitement de la string de donnée*/

    }

    return (
        <div className='ground'>
            <img src={flags} alt='Flags' className='flags'></img>
            <div className='container'>
                <img src={drapeau} alt='Flags' className='drapeau'></img>
                <img src={logo} alt='Flags' className='logo'></img>
                <input type='search' name='search' className='search' placeholder='Rechercher...' value={search} onChange={HandleSearchChange}></input>
                <div className='buttons'>
                    <img src={filter} alt='' onClick={()=>{navigate("/Filter")}}></img>
                    <img src={TUBE}alt='' className='tube'></img>                    
                    <img src={loop} alt='' onClick={onSubmit}></img>
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
}