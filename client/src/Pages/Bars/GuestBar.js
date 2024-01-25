import React, { useState } from "react";
import styles from "../../Styles/GuestBar.module.css";
import { useUser } from "../../UserContext";
import { CardBody } from "react-bootstrap";
import { useTheme } from '../ThemeContext';


export default function GuestBar() {
  const userContext = useUser();
  const [clickCount, setClickCount] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);



  function logout() {
    userContext.Logout();
    alert("U bent uitgelogd");
  }

  function changefont() {
    setClickCount((prevCount) => prevCount + 1);

    // Vergroot lettergrotte tot 3x max
    if (clickCount < 3) {
      document.documentElement.style.fontSize = `${
        parseInt(getComputedStyle(document.documentElement).fontSize) + 3
      }px`;
    } else {
      // Op 4e click reset de grotte naar normaal
      document.documentElement.style.fontSize = "18px"; 
      setClickCount(0); 
    }
  }
    // const DarkMode = () => {
    //     const setDarkmode = () => {
    //         document.querySelector("body").setAttribute("data-theme", "dark")
    //     };
    //     const setLightmode = () => {
    //         document.querySelector("body").setAttribute("data-theme", "light")
    //     };
       
        


          const setDarkmode = () => {
            document.body.classList.add("dark-mode");
            document.body.classList.remove("light-mode");
        };
        
        const setLightmode = () => {
            document.body.classList.add("light-mode");
            document.body.classList.remove("dark-mode");
        };  

        


     
          const toggleTheme = () => {
            if (isDarkMode) {
                setLightmode();
            } else {
                setDarkmode();
            }
            setIsDarkMode(!isDarkMode); 
        };
    

  return (
    
    <nav className={styles.navbar}>
      <div className={styles.navbar__container}>
        <a href="/" id={styles.navbar__logo}>
          <img src="/Images/logo_accessibility.png" alt="Accessibility Logo" />
        </a>
        <div className={styles.navbar__toggle} id={styles.mobile_menu}>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </div>
        <ul className={styles.navbar__menu}>
          <li className={styles.navbar__button}>
            <button
              className={styles.navbar__links}
              id={styles.Lettergrotte}
              onClick={changefont}
              name="lettergrotteButton"
            >
              Lettergrotte
            </button>
          </li>
          <li className={styles.navbar__button}>
            <button
              className={styles.navbar__links}
              id={styles.Darkmode}
              onClick={toggleTheme}
              name="darkModeButton"
              >
                
              Darkmode
            </button>
          </li>
          <li className={styles.navbar__item}>
            <button
              className={styles.button}
              onClick={() => (window.location.href = "/Googlelogin")}
            >
              Login
            </button>
          </li>
          <li className={styles.navbar__item}>
            <button
              className={styles.button}
              onClick={() => (window.location.href = "/Register")}
            >
              Sign Up
            </button>
          </li>
          <li className={styles.navbar__item}>
            <button onClick={logout} className={styles.button}>
              Uitloggen
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
} 

