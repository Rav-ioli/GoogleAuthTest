import React from 'react';
import styles from '../../Styles/GuestBar.module.css'
import { useUser } from "../../UserContext";


// const Header = () => {
// const userContext = useUser();

// function logout() {
//   userContext.Logout();
// }
// }
export default function GuestBar() {
    const userContext = useUser();
    function logout() {
        userContext.Logout();
        alert("U bent uitgelogd");
      }
  return (
    <nav class={styles.navbar}>
        <div class={styles.navbar__container}>
            <a href="/" id={styles.navbar__logo}><img src="/Images/logo_accessibility.png " alt="Accessibility Logo"/></a>
            <div class={styles.navbar__toggle} id={styles.mobile_menu}>
                <span class={styles.bar}></span>
                <span class={styles.bar}></span>
                <span class={styles.bar}></span>
            </div>
            <ul class={styles.navbar__menu}>
                <li class={styles.navbar__button}>
                    <a href="/" class={styles.navbar__links} id={styles.Lettergrotte}>Lettergrootte</a>
                </li>
                <li class={styles.navbar__button}>
                    <a href="/" class={styles.navbar__links} id={styles.Darkmode}>Darkmode</a>
                </li>
                <li class={styles.navbar__item}>
                    <a href="/login" class={styles.button}>Inloggen</a>
                </li>
                <li class={styles.navbar__item}>
                    <a href="/Register" class={styles.button}>Registreren</a>
                </li>
                
                <li class={styles.navbar__item}>
                    <a onClick={()=> logout()} class={styles.button}>Uitloggen</a>
                </li>
            </ul>
        </div>
    </nav>
);
  }
