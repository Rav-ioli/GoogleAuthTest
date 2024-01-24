import React from 'react';
import { useState,useEffect } from "react";
import GoogleLogin from './GoogleLogin';
import styles from  '../Styles/GedetialeerdOnderzoekMOD.module.css';
import GuestBar from './Bars/GuestBar';
import UserBar from './Bars/UserBar';
import ContactGegevens from './Bars/ContactGegevensBar';


export default function GedetaileerdOnderzoek() {

  useEffect(() => {
    fetchOnderzoeken();    
  }, []);

  // Maak dit opgehaald van de onderzoeken page ipv hardcoded
  const onderzoekId = localStorage.getItem("onderzoekIdMod");
  // const id = 'fromsoft';
  const [BedrijfsNaam,setBedrijfsNaam] = useState("FromSoft Games");
  const [onderzoekTitel,setOnderzoekTitel] = useState("Elden Ring");
  const [volleBeschrijving,setVolleBeschrijving] = useState('Elden Ring is an upcoming action role-playing game developed by FromSoftware and published by Bandai Namco Entertainment. The game is a collaborative effort between game director Hidetaka Miyazaki and fantasy novelist George R. R. Martin. It is scheduled for release for Microsoft Windows, PlayStation 4, PlayStation 5, Xbox One, and Xbox Series X/S on 21 January 2022.');
  const [locatie,setLocatie] = useState('Tokyo, Japan');
  const [link,setLink] = useState('');
  const [beloning,setBeloning] = useState('€ 50,-');
  const [doelgroep,setDoelgroep] = useState('Onbekend');

  const fetchOnderzoeken = async () => {
    const response = await fetch("https://localhost:7225/api/Onderzoek/GetOnderzoekByID/" + onderzoekId);
    const data = await response.json();
    setBedrijfsNaam(data.uitvoerendBedrijfNaam)
    setOnderzoekTitel(data.titel)
    setVolleBeschrijving(data.korteBeschrijving)
    setLocatie(data.soortOnderzoek === "Enquete" ? "Online" : data.soortOnderzoek);
    setBeloning(data.beloning)
    setLink("https://www.google.com/search?q="+data.titel)
 }

  return (
    <div>
      <UserBar>
      </UserBar>
      <img id={styles.wachtkamer_img} src="/Images/wachtkamer_plant.png" alt="Wachtkamer Achtergrond"/>
      <div>
        <h1 id={styles.over_ons}>Onderzoek van {BedrijfsNaam}</h1>
        <div id={styles.blokken}>
          <div id={styles.blok_1} name="blok_1">
            <div id={styles.blok_2}>
              <p id={styles.text2_titel}>Titel: {onderzoekTitel}</p>
              <p id={styles.text3}>Locatie: {locatie}</p>
              <p id={styles.text3}>Beloning: {beloning}</p>
            </div>
            <div id={styles.blok_2}>
              <p id={styles.text4}>{volleBeschrijving}</p>
              <p id={styles.text5}>Doelgroep: {doelgroep}</p>
              <li id={styles.menuButton} key={onderzoekId} name={"Button" + onderzoekTitel} class={styles.navbar__item}>
                <a aria-label="Onderzoek bewerken" id={styles.aanmelden} href={link} class={styles.button}>Bewerken</a>
              </li>
              <li id={styles.menuButton2} key={BedrijfsNaam} name={"Button" + onderzoekTitel} class={styles.navbar__item}>
                <a aria-label="Onderzoek beeindigen" id={styles.beeindigen} href={link} class={styles.button}>Beeindigen</a>
              </li>
         
            </div>
          </div>
        </div>
      </div>
      <ContactGegevens>
      </ContactGegevens>
    </div>
  );
};