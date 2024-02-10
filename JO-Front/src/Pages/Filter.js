import React from "react";
import {Navigate} from "react-router-dom";

export default function Filter(){
    return(
        <h1 onClick={Navigate("/Accueil")}>Filter</h1>
    )
}