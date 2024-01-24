import React from 'react';
import { useState,useEffect } from "react";
import GoogleLogin from './GoogleLogin';
import styles from  '../Styles/GedetailleerdOnderzoek.module.css';
import GuestBar from './Bars/GuestBar';
import UserBar from './Bars/UserBar';
import ContactGegevens from './Bars/ContactGegevensBar';
import { useLocation } from 'react-router-dom';
import { useUser } from "../UserContext";

export default function GedetaileerdOnderzoek() {
const user = useUser();
  // Maak dit opgehaald van de onderzoeken page ipv hardcoded
  const onderzoekId = localStorage.getItem("onderzoekId");
  const [BedrijfsNaam,setBedrijfsNaam] = useState("FromSoft Games");
  const [onderzoekTitel,setOnderzoekTitel] = useState("Elden Ring");
  // const korteBeschrijving = 'Test onze website op accessibility, alle feedback is gevraagd.';
  const [volleBeschrijving,setVolleBeschrijving] = useState('Elden Ring is an upcoming action role-playing game developed by FromSoftware and published by Bandai Namco Entertainment. The game is a collaborative effort between game director Hidetaka Miyazaki and fantasy novelist George R. R. Martin. It is scheduled for release for Microsoft Windows, PlayStation 4, PlayStation 5, Xbox One, and Xbox Series X/S on 21 January 2022.');
  const [locatie,setLocatie] = useState('Tokyo, Japan');
  const [link,setLink] = useState('');
  const [beloning,setBeloning] = useState('€ 50,-');
  const [doelgroep,setDoelgroep] = useState('Onbekend');
  const [countData, setCountData] = useState(null);
 const [changed, setChanged] = useState(0);
  // const onderzoekId = localStorage.getItem("onderzoekId");
  // const bedrijfsId = location.state.bedrijfsId;
  
  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://localhost:7225/api/Onderzoek/GetCountAanmeldingForEachOnderzoek"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      setCountData(data); // Bewaar de gegevens in de state
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };
  useEffect(() => {
    fetchOnderzoeken();
    fetchData();
    
  }, [changed]);

  const aantalDeelnames = countData?.find(
    (onderzoek) => onderzoek.onderzoekId === Number(onderzoekId)
  );


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

 const handleAanmelden = async (e) => {
  await fetch("https://localhost:7225/api/Onderzoek/JoinErvaringsdeskundigeToOnderzoek", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": "Bearer " + sessionStorage.getItem("token") },
    body: JSON.stringify({
        email: user.getEmail(),
        onderzoek: onderzoekId,
    }), 
}).then (async (response) => {
  if (response.status === 405) {
      alert("This server does not support the POST method for the specified endpoint.");
  } else {
      if (response.ok) {
        //  alert("voorstelling toegevoegd");
        alert("Aanmelding gelukt");
        setChanged(changed + 1);
      } 
      else if (response.status === 500) {alert("U bent al aangemeld voor dit onderzoek")}
      else {
          alert("Aanmelding mislukt");
      // if (response.status === 500) {alert("U bent al aangemeld voor dit onderzoek")}
      // else {
      //     alert("Aanmelding mislukt");
      }
  }
 
})
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
              {aantalDeelnames ? (
                  <p id={styles.text4}>Aantal deelnemers: {aantalDeelnames.count}</p>
                ) : (
                  <p>unknown</p>
                )}
                  {user.getRoles().includes("Admin") ? (
              <>
               
              </>
            ) : (
              <> <li id={styles.button} key={onderzoekId} name={"Button" + BedrijfsNaam} class={styles.navbar__item}></li>
              <button id={styles.register_button} onClick={()=>handleAanmelden()} target="_blank"
  rel="noopener noreferrer"class={styles.register_button}>Aanmelden</button></>
            )}
            </div>
          </div>
        </div>
      </div>
      <ContactGegevens>
      </ContactGegevens>
    </div>
  );
};