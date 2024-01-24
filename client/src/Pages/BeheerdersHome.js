import React from 'react';
import { useState } from "react";
import GoogleLogin from './GoogleLogin';
import styles from  '../Styles/BeheerdersHome.module.css';
import GuestBar from './Bars/GuestBar';
import UserBar from './Bars/UserBar';
import ContactGegevens from './Bars/ContactGegevensBar';
// import  { useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// const ProtectedComponent = () => {
  // if (authFails) {
  //   return <Redirect to='/login'  />
  // }
  // return <div> My Protected Component </div>
  // return <Redirect to='/'  />
// }

export default function BedrijfsHome() {
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
      id: 'OnderzoekOpstellenButton',
      name: 'Onderzoeken Inzien',
      link: '/UserHome/Onderzoeken'
    },
    {
      id: 'ChatsButton',
      name: 'Chat',
      link: '/Chat',
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
  let beheerder = "beheerder";
  // username = GoogleLogin.
  return (
    <div>
      <UserBar>
      </UserBar>
      <img id={styles.wachtkamer_img} src="/Images/wachtkamer_plant.png" alt="Wachtkamer Achtergrond"/>
      <div>
        <h1 id={styles.over_ons}>Beheerdersportaal</h1>
        <div id={styles.blokken}>
          <div id={styles.blok_1} name="blok_1">
            <p id={styles.text1}>Welkom {beheerder}!</p>
            <div id={styles.menu} name="buttonMenu">
              <ul>
                {menuButtons.map((item) => (
                  // <button id={styles.menuButton} key={item.id} name={"Button" + item.name} onClick={SwitchURL(item.link, item)}>{item.name}</button>
                  <li id={styles.menuButton} onClick={()=>navigate(item.link)} key={item.id} name={"Button" + item.name} class={styles.navbar__item}>
                    <a aria-label={"Menuknop voor " + item.name} href={item.link} class={styles.button}>{item.name}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div id={styles.blok_2}>
            <p id={styles.text2_titel}>Nieuws</p>
            <p id={styles.text2}>Geen nieuws gevonden.</p>
          </div>
        </div>
      </div>
      <ContactGegevens>
      </ContactGegevens>
    </div>
  );
};