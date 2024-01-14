import React from 'react';
import { useState } from "react";
import GoogleLogin from './GoogleLogin';
import styles from  '../Styles/UserHome.module.css';
import GuestBar from './Bars/GuestBar';
import UserBar from './Bars/UserBar';
import ContactGegevens from './Bars/ContactGegevensBar';
import { useNavigate } from 'react-router-dom';

// const ProtectedComponent = () => {
  // if (authFails) {
  //   return <Redirect to='/login'  />
  // }
  // return <div> My Protected Component </div>
  // return <Redirect to='/'  />
// }

export default function UserHome() {
  const navigate = useNavigate();
  // function SwitchURL(url, object){
  //   console.log("\n\n\n\n\n\nButton Pressed: " + object.name)
  //   const navigate = useNavigate();
  //   navigate("" + url);
    // let history = useHistory();
    // history.push(url);
  // }

  const menuButtons = [
    {
      id: 'HomeButton',
      name: 'Home', 
      link: '/',
    },
    {
      id: 'OnderzoekenButton',
      name: 'Actieve Onderzoeken',
      link: '/UserHome/Onderzoeken'
    },
    {
      id: 'ChatsButton',
      name: 'Jouw Chats',
      link: '/chats',
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

  // const [user, setUser] = useState({});
  let username = "gebruiker";
  // username = GoogleLogin.
  return (
    <div>
      <UserBar>
      </UserBar>
      <img id={styles.wachtkamer_img} src="/Images/wachtkamer_plant.png" alt="Wachtkamer Achtergrond"/>
      <div>
        <h1 id={styles.over_ons}>Profielpagina</h1>
        <div id={styles.blokken}>
          <div id={styles.blok_1} name="blok_1">
            <p id={styles.text1}>Welkom {username}!</p>
            <div id={styles.menu} name="buttonMenu">
              <ul>
                {menuButtons.map((item) => (
                  // <button id={styles.menuButton} key={item.id} name={"Button" + item.name} onClick={SwitchURL(item.link, item)}>{item.name}</button>
                  <li onClick={()=>navigate(item.link)}id={styles.menuButton} key={item.id} name={"Button" + item.name} class={styles.navbar__item}>
                    <a href={item.link} class={styles.button}>{item.name}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div id={styles.blok_2}>
            <h1 id={styles.text2_titel}>Nieuws</h1>
            <p id={styles.text2}>Geen nieuws gevonden.</p>
          </div>
        </div>
      </div>
      <ContactGegevens>
      </ContactGegevens>
    </div>
  );
};