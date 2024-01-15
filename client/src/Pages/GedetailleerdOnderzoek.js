import React from 'react';
import { useState,useEffect } from "react";
import GoogleLogin from './GoogleLogin';
import styles from  '../Styles/GedetailleerdOnderzoek.module.css';
import GuestBar from './Bars/GuestBar';
import UserBar from './Bars/UserBar';
import ContactGegevens from './Bars/ContactGegevensBar';
import { useLocation } from 'react-router-dom';


export default function GedetaileerdOnderzoek() {

  // Maak dit opgehaald van de onderzoeken page ipv hardcoded
  const onderzoekId = localStorage.getItem("onderzoekId");
  const [BedrijfsNaam,setBedrijfsNaam] = useState("FromSoft Games");
  const [onderzoekTitel,setOnderzoekTitel] = useState("Elden Ring");
  // const korteBeschrijving = 'Test onze website op accessibility, alle feedback is gevraagd.';
  const [volleBeschrijving,setVolleBeschrijving] = useState('Elden Ring is an upcoming action role-playing game developed by FromSoftware and published by Bandai Namco Entertainment. The game is a collaborative effort between game director Hidetaka Miyazaki and fantasy novelist George R. R. Martin. It is scheduled for release for Microsoft Windows, PlayStation 4, PlayStation 5, Xbox One, and Xbox Series X/S on 21 January 2022.');
  const [locatie,setLocatie] = useState('Tokyo, Japan');
  const [link,setLink] = useState('https://www.google.com');
  const [beloning,setBeloning] = useState('€ 50,-');
  const [doelgroep,setDoelgroep] = useState('Gamers');

  // const onderzoekId = localStorage.getItem("onderzoekId");
  // const bedrijfsId = location.state.bedrijfsId;
  

  useEffect(() => {
    fetchOnderzoeken();
  }, []);

 const fetchOnderzoeken = async () => {
    const response = await fetch("https://localhost:7225/api/Onderzoek/GetOnderzoekByID/" + onderzoekId);
    const data = await response.json();
    console.log(data);
    setBedrijfsNaam(data.uitvoerendBedrijfNaam)
    setOnderzoekTitel(data.titel)
    setVolleBeschrijving(data.korteBeschrijving)
    setLocatie(data.soortOnderzoek === "Enquete" ? "Online" : data.soortOnderzoek);
    setBeloning(data.beloning)





    // const fetchOnderzoeken = async (e) => {
    //   const response = await fetch(
    //     "https://localhost:7225/api/Onderzoek/GetAllOnderzoeken"
    //   );
  
    //   const data = await response.json();
  
    //   const newMenuButtons = data.map((item, index) => ({
    //     id: item.onderzoekTitel,
    //     name: item.uitvoerendBedrijfNaam,
    //     link: "/UserHome/Onderzoek",
    //     onderzoekTitel: item.onderzoekTitel,
    //     beschrijving: item.korteBeschrijving,
    //     locatie: item.locatie || "N/A",
    //     onderzoekid: item.onderzoekId,
    //   }));
  
    //   setMenuButtons(newMenuButtons);
    // };



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
              <h1 id={styles.text2_titel}>{onderzoekTitel}</h1>
              {/* <p id={styles.text2}>Korte beschrijving: {korteBeschrijving}</p> */}
              <p id={styles.text3}>Locatie: {locatie}</p>
              <p id={styles.text3}>Uitkering: {beloning}</p>
            </div>
            <div id={styles.blok_2}>
              <p id={styles.text4}>{volleBeschrijving}</p>
              <p id={styles.text5}>Doelgroep: {doelgroep}</p>
              <li id={styles.menuButton} key={onderzoekId} name={"Button" + BedrijfsNaam} class={styles.navbar__item}>
                <a id={styles.aanmelden} href={link} class={styles.button}>Aanmelden</a>
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