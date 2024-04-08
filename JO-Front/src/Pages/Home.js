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
import axios from 'axios';
export default function Home(){
    const [ search , setSeach] = useState("");
    const navigate = useNavigate()
    const  HandleSearchChange = async (e)=>{
        setSeach(e.target.value);
        console.log(search)
    }
    const go = async ()=>{
    try{
        console.log(search)
        const res = await axios.post('http://localhost:3500/sport' , { nomFr : search});
        if ( res.data.data.length !== 0){
            navigate('/Results', { state: { data: res.data.data, type: res.data.type } });
        }else{
            alert("NO DATA FOUND")
        }
        }catch(err){
            console.log(err);
        console.error(err);
    }

    }

    return (
        <div className='ground'>
            <img src={flags} alt='Flags' className='flags'></img>
            <div className='container'>
                <img src={drapeau} alt='Flags' className='drapeau'></img>
                <img src={logo} alt='Flags' className='logo'></img>
                <input type='search' name='search' className='search' placeholder='Nom Sport ... ' value={search} onChange={HandleSearchChange}></input>
                <div className='buttons'>
                    <img src={filter} alt='' onClick={()=>{navigate("/Filter")}}></img>
                    <img src={TUBE}alt='' className='tube'></img>                    
                    <img src={loop} alt='' onClick={ ()=>{go()}}></img>
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