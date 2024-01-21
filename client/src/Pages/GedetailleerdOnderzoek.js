import React from 'react';
import { useState } from "react";
import GoogleLogin from './GoogleLogin';
import styles from  '../Styles/GedetailleerdOnderzoek.module.css';
import GuestBar from './Bars/GuestBar';
import UserBar from './Bars/UserBar';
import ContactGegevens from './Bars/ContactGegevensBar';


export default function GedetailleerdOnderzoek() {

  // Maak dit opgehaald van de onderzoeken page ipv hardcoded
  const id = 'fromsoft';
  const naam = 'FromSoft Games';
  const titel = 'FromSoft Games website accessibility';
  const beschrijving = 'Test onze website op accessibility, alle feedback is gevraagd.';
  const volle_beschrijving = 'Test onze website op accessibility zoals met tab werken en hoe gemakkelijk u kan navigeren, alle feedback is gevraagd.'
  const locatie = 'Online';
  const link = '/';
  const uitkering = 'A free copy of Elden Ring';
  const doelgroep = 'slechtzienden'

  return (
    <div>
      <UserBar>
      </UserBar>
      <img id={styles.wachtkamer_img} src="/Images/wachtkamer_plant.png" alt="Wachtkamer Achtergrond"/>
      <div>
        <h1 id={styles.over_ons}>Onderzoek van {naam}</h1>
        <div id={styles.blokken}>
          <div id={styles.blok_1} name="blok_1">
            <div id={styles.blok_2}>
              <h1 id={styles.text2_titel}>Titel: {titel}</h1>
              <p id={styles.text2}>Korte beschrijving: {beschrijving}</p>
              <p id={styles.text3}>Locatie: {locatie}</p>
              <p id={styles.text3}>Uitkering: {uitkering}</p>
            </div>
            <div id={styles.blok_2}>
              <p id={styles.text4}>Volle beschrijving: {volle_beschrijving}</p>
              <p id={styles.text5}>Doelgroep: {doelgroep}</p>
              <li id={styles.button}  class={styles.navbar__item}></li>
              <button aria-label="Aanmelden bij onderzoek" id={styles.register_button}  target="_blank"
  rel="noopener noreferrer"class={styles.register_button}>Aanmelden</button>
            </div>
          </div>
        </div>
      </div>
      <ContactGegevens>
      </ContactGegevens>
    </div>
  );
};