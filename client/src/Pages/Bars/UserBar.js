import React from 'react';
import styles from '../../Styles/UserBar.module.css'

export default function UserBar() {
  return (
    <nav class={styles.navbar}>
        <div class={styles.navbar__container}>
        <a aria-label="Logo met link naar homepage" href="/UserHome" id={styles.navbar__logo}><img src="/Images/logo_accessibility.png " alt="Accessibility Logo"/></a>
            <div class={styles.navbar__toggle} id={styles.mobile_menu}>
                <span class={styles.bar}></span>
                <span class={styles.bar}></span>
                <span class={styles.bar}></span>
            </div>
            <ul class={styles.navbar__menu}>
                <li class={styles.navbar__button}>
                <a aria-label="Pas lettergrootte aan" href="/" class={styles.navbar__links} id={styles.Lettergrotte}>Lettergrootte</a>
                </li>
                <li class={styles.navbar__button}>
                <a aria-label="Switch naar dark mode" href="/" class={styles.navbar__links} id={styles.Darkmode}>Darkmode</a>
                </li>
                <li class={styles.navbar__item}>
                <a aria-label="Login" href="/Googlelogin" class={styles.button}>Login</a>
                </li>
                <li class={styles.navbar__item}>
                <a aria-label="Registreer" href="/Register" class={styles.button}>Sign Up</a>
                </li>
            </ul>
        </div>
    </nav>
);
};