import React, { useState } from "react";
import './../Styles/Filter.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Filter() {
  const [NomAth, SetnomAth] = useState("");
  const [PrenomAth, setPrenomAth] = useState("");
  const [sport, setNomSport] = useState("");
  const [pays, setPays] = useState("");
  const navigate = useNavigate();

  const handleSubmitAth = async (event) => {
    event.preventDefault();
    const data = {};
    if (NomAth !== "") {
      data.NomAth = NomAth;
    }
    if (PrenomAth !== "") {
      data.PrenomAth = PrenomAth;
    }
    if (sport !== "") {
      data.Sport = sport;
    }
    if (pays !== "") {
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

  const handleSubmitSport = async (event) => {
    event.preventDefault();
    const data = {};
    // Récupérer les valeurs des champs
    const nomFr = event.target[0].value;
    const nomEng = event.target[1].value;
    const isIndiv = event.target[2].checked;
    const isCollectif = event.target[3].checked;

    // Ajouter les valeurs au data
    if (nomFr !== "") {
      data.nomFr = nomFr;
    }
    if (nomEng !== "") {
      data.nomEng = nomEng;
    }
    if (isIndiv) {
      data.type = 1;
    }
    if (isCollectif) {
      data.type = 2;
    }

    try {
      console.log(data);
      const res = await axios.post('http://localhost:3500/sport', data); 
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
   const handleSiteSubmit = async (event)=>{
    event.preventDefault();
    const data = {};
    // Récupérer les valeurs des champs
    const nomSite = event.target[0].value;
    const nom_sport = event.target[1].value;
    const capacite = event.target[2].value;
    const adress = event.target[3].value;

    // Ajouter les valeurs au data
    if (nomSite !== "") {
      data.nomSite = nomSite;
    }
    if (nom_sport !== "") {
      data.nom_sport = nom_sport;
    }
    if (capacite) {
      data.capacite = capacite;
    }
    if (adress) {
      data.adress = adress;
    }

    try {
      console.log(data);
      const res = await axios.post('http://localhost:3500/sites', data); 
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
        <form className="form" onSubmit={handleSubmitAth}>
          <input type="text" className="input" placeholder="NomSport" onChange={(e) => setNomSport(e.target.value)} />
          <input type="text" className="input" placeholder="Nom Athletes" onChange={(e) => SetnomAth(e.target.value)} />
          <input type="text" className="input" placeholder="Prenom Athletes" onChange={(e) => setPrenomAth(e.target.value)} />
          <input type="text" className="input" placeholder="Pays" onChange={(e) => setPays(e.target.value)} />
          <button className="btn">Rechercher</button>
        </form>
      </div>
      <div className="filtre">
        <h4 className="Titre">Sport</h4>
        <form className="form" onSubmit={handleSubmitSport}>
          <input type="text" className="input" placeholder="Nom Sport (Fr)" />
          <input type="text" className="input" placeholder="Nom Sport (ENG)" />
          <label className="label1">
            <input type="checkbox" className="check" value="Individuel" />
            Individuel
          </label>
          <label className="label1">
            <input type="checkbox" className="check" value="Collectif" />
            .      .Collectif
          </label>
          <button className="btn" type="submit">Rechercher</button>
        </form>
      </div>
      <div className="filtre">
        <h4 className="Titre">Sites</h4>
        <form className="form" onSubmit={handleSiteSubmit}>
          <input type="text" className="input" placeholder="Nom Site" />
          <input type="text" className="input" placeholder="Nom Sport" />
          <input type="text" className="input" placeholder="Capacité Max" />
          <input type="text" className="input" placeholder="Adresse" />
          <button className="btn">Rechercher</button>
        </form>
      </div>
    </div>
  );
}
