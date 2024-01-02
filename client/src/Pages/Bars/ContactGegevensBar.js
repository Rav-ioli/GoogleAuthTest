import React from 'react';
import styles from '../../Styles/ContactGegevens.module.css'

export default function Home() {
  return (
    <div id={styles.contact_div} alt="Contact gegevens">
        <p id={styles.contact_email} alt="Contact email">Contact:<br></br>TestLogin@gmail.com</p>
        <p id={styles.participanten} alt="Website programmeurs">Projectleden:<br></br>Romano<br></br>Ravish<br></br>Bram<br></br>Adam</p>
    </div>
  );
};