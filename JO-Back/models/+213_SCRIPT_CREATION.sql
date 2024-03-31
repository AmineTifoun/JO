DROP DATABASE IF EXISTS JO_PARIS_2024;
CREATE DATABASE JO_PARIS_2024;

USE JO_PARIS_2024;

CREATE TABLE Sport (
    sport_ID INT(6) PRIMARY KEY, -- Identifiant du sport
    nom_sport VARCHAR(40) NOT NULL, -- Nom du sport
    nom_sport_eng VARCHAR(40) NOT NULL, -- Nom du sport en anglais
    isIndividual INT(1), -- Indique si c'est un sport individuel (0 faux, 1 vrai)
    date_adhesion DATE, -- Date d'adhésion du sport
    date_creation DATE -- Date de création du sport
);

CREATE TABLE Athletes (
    ath_ID INT(6) PRIMARY KEY, -- Identifiant de l'athlète
    nom_ath VARCHAR(20) NOT NULL, -- Nom de l'athlète
    prenom_ath VARCHAR(20) NOT NULL, -- Prénom de l'athlète
    date_naissance DATE, -- Date de naissance de l'athlète
    nb_medailles INT(4), -- Nombre de médailles de l'athlète
    img VARCHAR(255) -- URL de l'image de l'athlète
);

CREATE TABLE Record (
    record_ID INT(6) PRIMARY KEY, -- Identifiant du record
    value VARCHAR(20), -- Valeur du record
    detenteur INT(6), -- Identifiant de l'athlète détenteur du record
    FOREIGN KEY (detenteur) REFERENCES Athletes(ath_ID) -- Clé étrangère vers la table Athletes
);

CREATE TABLE Competition (
    comp_ID INT(6) PRIMARY KEY, -- Identifiant de la compétition
    nom_comp VARCHAR(60) NOT NULL, -- Nom de la compétition
    categorie_comp VARCHAR(60), -- Catégorie de la compétition
    step_comp VARCHAR(10) NOT NULL -- Étape de la compétition
);

CREATE TABLE Calendrier (
    agenda_ID INT(6) PRIMARY KEY, -- Identifiant de l'agenda
    date_deroulement DATE, -- Date de déroulement de la compétition
    heure_deroulement TIME -- Heure de déroulement de la compétition
);

CREATE TABLE Sites (
    sites_ID INT(6) PRIMARY KEY, -- Identifiant du site
    nom_site VARCHAR(70) NOT NULL, -- Nom du site
    date_realisation DATE, -- Date de réalisation du site
    adresse VARCHAR(70) NOT NULL, -- Adresse du site
    gps VARCHAR(255), -- Coordonnées GPS du site
    capacite INT(6) NOT NULL, -- Capacité d'accueil du site
    photos VARCHAR(255) -- URL de l'image du site
);

CREATE TABLE Pays (
    code VARCHAR(5) PRIMARY KEY, -- Code du pays
    nom_pays VARCHAR(70), -- Nom du pays
    nom_pays_eng VARCHAR(70), -- Nom du pays en anglais
    drapeau VARCHAR(255) -- URL du drapeau du pays
);

CREATE TABLE Transport (
    arret_ID INT(6) PRIMARY KEY, -- Identifiant de l'arrêt de transport
    nom_arret VARCHAR(70) NOT NULL, -- Nom de l'arrêt de transport
    type_transport VARCHAR(20), -- Type de transport
    gps_arret VARCHAR(255), -- Coordonnées GPS de l'arrêt de transport
    num_ligne INT(4), -- Numéro de ligne de transport
    logo_ligne VARCHAR(255) -- URL du logo de la ligne de transport
);

CREATE TABLE participer (
    id_sport INT(6), -- Identifiant du sport
    athletes_id INT(6), -- Identifiant de l'athlète
    FOREIGN KEY (id_sport) REFERENCES Sport(sport_ID), -- Clé étrangère vers la table Sport
    FOREIGN KEY (athletes_id) REFERENCES Athletes(ath_ID) -- Clé étrangère vers la table Athletes
);

CREATE TABLE Programmer (
    agenda_id INT(6), -- Identifiant de l'agenda
    compete_id INT(6), -- Identifiant de la compétition
    FOREIGN KEY (agenda_id) REFERENCES Calendrier(agenda_ID), -- Clé étrangère vers la table Calendrier
    FOREIGN KEY (compete_id) REFERENCES Competition(comp_ID) -- Clé étrangère vers la table Competition
);

CREATE TABLE derouler (
    id_comp INT(6), -- Identifiant de la compétition
    id_site INT(6), -- Identifiant du site
    FOREIGN KEY (id_comp) REFERENCES Competition(comp_ID), -- Clé étrangère vers la table Competition
    FOREIGN KEY (id_site) REFERENCES Sites(sites_ID) -- Clé étrangère vers la table Sites
);

CREATE TABLE abriter (
    id_discipline INT(6), -- Identifiant de la discipline sportive
    id_compet INT(6), -- Identifiant de la compétition
    FOREIGN KEY (id_discipline) REFERENCES Sport(sport_ID), -- Clé étrangère vers la table DisciplineSportive
    FOREIGN KEY (id_compet) REFERENCES Competition(comp_ID) -- Clé étrangère vers la table Competition
);

CREATE TABLE concurrencer (
    id_athletes INT(6), -- Identifiant de l'athlète
    code_pays VARCHAR(5), -- Code du pays
    FOREIGN KEY (id_athletes) REFERENCES Athletes(ath_ID), -- Clé étrangère vers la table Athletes
    FOREIGN KEY (code_pays) REFERENCES Pays(code) -- Clé étrangère vers la table Pays
);

CREATE TABLE desservir (
    id_sites INT(6), -- Identifiant du site
    id_transport INT(6), -- Identifiant du transport
    FOREIGN KEY (id_sites) REFERENCES Sites(sites_ID), -- Clé étrangère vers la table Sites
    FOREIGN KEY (id_transport) REFERENCES Transport(arret_ID) -- Clé étrangère vers la table Transport
);
