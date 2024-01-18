import React from 'react';
import { useState } from "react";
import GoogleLogin from './GoogleLogin';
import styles from  '../Styles/Onderzoeken.module.css';
import GuestBar from './Bars/GuestBar';
import UserBar from './Bars/UserBar';
import ContactGegevens from './Bars/ContactGegevensBar';

export default function Onderzoeken() {

  const [searchInput, setSearchInput] = useState('');

  const menuButtons = [
    {
      id: 'fromsoft',
      name: 'fromsoft', 
      link: 'Onderzoek',
      titel: 'FromSoft Games website accessibility',
      beschrijving: 'Test onze website op accessibility, alle feedback is gevraagd.',
      locatie: 'Online'
    },
    {
      id: 'puzzelbv',
      name: 'puzzelbv', 
      link: 'Onderzoek',
      titel: 'PuzzelmakersBV Gebouw Toegankelijkheid',
      beschrijving: 'Graag langskomen om alle doorgangen en gangen te testen. Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum',
      locatie: 'Steelweg 38, Zuid Holland'
    },
    {
      id: 'ChatsButton',
      name: 'Jouw Chats',
      link: '/Chats',
    },
    {
      id: 'GegevensButton',
      name: 'Gegevens (Wijzigen)',
      link: '/gegevens',
    },
    {
      id: 'LogoutButton',
      name: 'Log Uit',
      link: '/logout'
    }
  ];
  let divheight = menuButtons.length * 10;
  let menudivheight = menuButtons.length * 10 + 10;
  document.getElementsByName("buttonMenu").height = divheight + "vh";
  document.getElementsByName("blok_1").height = menudivheight + "vh";

  const filteredMenuButtons = menuButtons.filter(item => {
    const lowercasedSearchInput = searchInput.toLowerCase();

    return (
      (item.titel && item.titel.toLowerCase().includes(lowercasedSearchInput)) ||
      (item.beschrijving && item.beschrijving.toLowerCase().includes(lowercasedSearchInput)) ||
      (item.locatie && item.locatie.toLowerCase().includes(lowercasedSearchInput))
    );
  });

  return (
    <div>
      <UserBar>
      </UserBar>
      <img id={styles.wachtkamer_img} src="/Images/wachtkamer_plant.png" alt="Wachtkamer Achtergrond"/>
      <div>
        <h1 id={styles.over_ons}>Onderzoeken</h1>
        <div id={styles.blokken}>
          <div id={styles.blok_1} name="blok_1">
            <input id={styles.searchbar} type="text" placeholder="Search..." value={searchInput} onChange={(e) => setSearchInput(e.target.value)}/>
              <ul>
                {filteredMenuButtons.map((item) => (
                  <div aria-label={"Onderzoek van " + item.name + ", die gaat over " + item.titel} id={styles.blok_2}>
                    <h1 id={styles.text2_titel}>{item.titel}</h1>
                    <p id={styles.text2}>{item.beschrijving}</p>
                    <p id={styles.text3}>Locatie: {item.locatie}</p>
                    <li id={styles.menuButton} key={item.id} name={"Button" + item.name} class={styles.navbar__item}>
                    <a aria-label={"Lees meer over het onderzoek van " + item.name} id={styles.leesmeer} href={item.link} class={styles.button}>Lees Meer</a>
                    </li>
                  </div>
                ))}
              </ul>
          </div>
        </div>
      </div>
      <ContactGegevens>
      </ContactGegevens>
    </div>
  );
};