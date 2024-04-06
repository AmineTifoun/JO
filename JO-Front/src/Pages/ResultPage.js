import React from 'react';
import DataDisp from '../Component/DataDisp';
import spr from '../Tools/PARIS-2024-VISUELS-PICTOGRAMMES-FOOTBALL-1080x1080-1.jpg'

const ResultPage = () => {
    const queryResults = {
        isIndividual: 2,
        nom_sport: "Football",
        nom_sport_eng: "Soccer",
        img:spr
    };
    const type = 'sprt'; // or 'sprt' or 'site', depending on your use case

    return (
        <div>
            <DataDisp Data={queryResults} type={type} />
        </div>
    );
};

export default ResultPage;
