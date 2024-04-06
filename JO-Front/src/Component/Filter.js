import React from "react";
import './../Styles/Filter.css'

export default function Filter() {
  
  return (
    <div className="Grnd">
      <div className="filtre">
        <h4 className="Titre">Athletes</h4>
        <form className="form">
          <input type="text" className="input" placeholder="NomSport"></input>
          <input type="text" className="input" placeholder="Nom Athletes"></input>
          <input type="text" className="input" placeholder="Prenom Athletes"></input>
          <input type="text" className="input" placeholder="Pays"></input>
          <button className="btn" >Rechercher</button>
        </form>
      </div>
      <div className="filtre">
        <h4 className="Titre">Sport</h4>
        <form className="form">
          <input type="text" className="input" placeholder="Nom Sport (Fr)"></input>
          <input type="text" className="input" placeholder="Nom Sport (ENG)"></input>
          <label className="label">
            <input type="checkbox" className="check" value="Individuel" />
            Individuel
          </label>
          <label className="label">
            <input type="checkbox" className="check" value="Collectif  ." />
            Collectif           ..
          </label>
          <button className="btn">Rechercher</button>
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
