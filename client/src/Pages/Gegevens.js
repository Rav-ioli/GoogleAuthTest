import React from 'react';
import { useState } from "react";
import GoogleLogin from './GoogleLogin';
import styles from  '../Styles/Gegevens.module.css';
import GuestBar from './Bars/GuestBar';
import UserBar from './Bars/UserBar';
import ContactGegevens from './Bars/ContactGegevensBar';


export default function Gegevens() {

  // Maak dit opgehaald van de gebruiker ipv hardcoded
  const voornaam = 'Jan'
  const achternaam = 'Kaasmaker';
  const username = 'DeJan';
  const postcode = '8723GT';
  const telnr = '0685372153'
  const password = '*******';
  const beperkingen = ['Niet zo slim','Niet zo snel meer'];
  const hulpmiddelen = ['ChatGPT'];
  const deelnameonderzoeken = ['Online Onderzoeken', 'Groepsgesprekken'];
  const voorkeurbenadering = 'Alleen via Portal'
  const benarderingcommercieël = 'Nee';

  return (
    <div>
      <UserBar>
      </UserBar>
      <img id={styles.wachtkamer_img} src="/Images/wachtkamer_plant.png" alt="Wachtkamer Achtergrond"/>
      <div>
        <h1 id={styles.over_ons}>Uw Gegevens</h1>
        <div id={styles.blokken}>
          <div id={styles.blok_1} name="blok_1">
            <div id={styles.blok_2}>
              <p id={styles.text2}>Voornaam: {voornaam}</p>
              <p id={styles.text2}>Achternaam: {achternaam}</p>
              <p id={styles.text2}>Username: {username}</p>
              <p id={styles.text2}>Postcode: {postcode}</p>
              <p id={styles.text2}>Telefoonnummer: {telnr}</p>
              <p id={styles.text2}>Password: {password}</p>
              <br></br>
              <ul>
                <h1 id={styles.text3}>Beperkingen:</h1>
                <div aria-label="Beperkingen" id={styles.blok_2}>
                  {beperkingen.map((item) => (
                    <h1 id={styles.text5}>{item}</h1>
                  ))}
                </div>
              </ul>
              <br></br>
              <ul>
                <h1 id={styles.text3}>Hulpmiddelen:</h1>
                <div aria-label="Hulpmiddelen" id={styles.blok_2}>
                  {hulpmiddelen.map((item) => (
                    <h1 id={styles.text5}>{item}</h1>
                  ))}
                </div>
              </ul>
              <br></br>
              <ul>
                <h1 id={styles.text3}>Deelname Onderzoeken:</h1>
                <div aria-label="Deelname aan type onderzoeken" id={styles.blok_2}>
                  {deelnameonderzoeken.map((item) => (
                    <h1 id={styles.text5}>{item}</h1>
                  ))}
                </div>
              </ul>
              <br></br>
              <p id={styles.text2}>Voorkeur Benadering: <u>{voorkeurbenadering}</u></p>
              <p id={styles.text2}>Benaderd worden door commerciële partijen: <u>{benarderingcommercieël}</u></p>
              <br></br>
              <br></br>
            </div>
              <li id={styles.menuButton} key="gwk" name="gegevenswijzigenknop" class={styles.navbar__item}>
                <a aria-label="Gegevens Wijzigen" id={styles.aanmelden} href="/Register" class={styles.button}>Gegevens Wijzigen</a>
              </li>
          </div>
        </div>
      </div>
      <ContactGegevens>
      </ContactGegevens>
    </div>
  );
};