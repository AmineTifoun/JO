import React , {useState} from "react";
import './../Styles/Filter.css'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
export default function Filter() {
  const [NomAth, SetnomAth] = useState("");
  const [PrenomAth, setPrenomAth] = useState("");
  const [sport , setNomSport]=useState("");
  const [pays , setPays] = useState("");
  const navigate = useNavigate();
  const handleSubmitAth = async (event)=>{
    event.preventDefault();
    const data ={};
    if( NomAth !==""){
      data.NomAth = NomAth ;
    }
    if( PrenomAth !== ""){
      data.PrenomAth = PrenomAth; 
    }
    if( sport !== ""){
      data.Sport = sport ;
    }
    if( pays !==""){
      data.Pays = pays;
    }
    try {
      console.log(data);
      const res = await axios.post('http://localhost:3500/athletes', data);
      console.log((res.data.data));
      if (res.data.data.length > 0) {
        navigate('/Results', { state: { data: res.data.data, type: res.data.type } });
        console.log(res);
      } else {
        alert("PAS DE CORRESPONDANCES TROUVÉES !! ");
      }
    } catch (err) {
      console.error(err);
    }
    

  
  }
  return (
    <div className="Grnd">
      <div className="filtre">
        <h4 className="Titre">Athletes</h4>
        <form className="form">
          <input type="text" className="input" placeholder="NomSport" onChange={(e) =>{setNomSport(e.target.value)}}  ></input>
          <input type="text" className="input" placeholder="Nom Athletes" onChange={(e) =>{SetnomAth(e.target.value)}}></input>
          <input type="text" className="input" placeholder="Prenom Athletes" onChange={(e)=>{setPrenomAth(e.target.value)}}></input>
          <input type="text" className="input" placeholder="Pays" onChange={(e) =>{setPays(e.target.value)}}></input>
          <button className="btn" onClick={handleSubmitAth} >Rechercher</button>
        </form>
      </div>
      <div className="filtre">
        <h4 className="Titre">Sport</h4>
        <form className="form">
          <input type="text" className="input" placeholder="Nom Sport (Fr)" ></input>
          <input type="text" className="input" placeholder="Nom Sport (ENG)"></input>
          <label className="label">
            <input type="checkbox" className="check" value="Individuel" />
            Individuel
          </label>
          <label className="label">
            <input type="checkbox" className="check" value="Collectif  ." />
            Collectif           ..
          </label>
          <button className="btn" type="submit">Rechercher</button>
        </form>
      </div>
      <div className="filtre">
        <h4 className="Titre">Sites</h4>
        <form className="form">
          <input type="text" className="input" placeholder="Nom Site"></input>
          <input type="text" className="input" placeholder="Nom Sport"></input>
          <input type="text" className="input" placeholder="Capacité"></input>
          <input type="text" className="input" placeholder="Adresse"></input>
          <button className="btn">Rechercher</button>
        </form>
      </div>
    </div>
  );
}
