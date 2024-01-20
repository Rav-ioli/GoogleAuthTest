import React from "react";
import { useState, useEffect } from "react";
import GoogleLogin from "./GoogleLogin";
import styles from "../Styles/Onderzoeken.module.css";
import GuestBar from "./Bars/GuestBar";
import UserBar from "./Bars/UserBar";
import ContactGegevens from "./Bars/ContactGegevensBar";
import { useUser } from "../UserContext";
import { Link } from "react-router-dom";
import GedetaileerdOnderzoek from "./GedetailleerdOnderzoek";

export default function Onderzoeken() {
  const user = useUser();
  const [searchInput, setSearchInput] = useState("");
  const [filterOpBeperkingen, setFilterOpBeperking] = useState(false);
  
  const [menuButtons, setMenuButtons] = useState([]);
  const onderzoekid = (id) => {
    localStorage.setItem("onderzoekId", id);
  };

  useEffect(() => {
    if(filterOpBeperkingen){
      fetchOnderzoekenOpBeperkingen();
    }else{ fetchOnderzoeken();}
   
  }, [filterOpBeperkingen]);
  let divheight = menuButtons.length * 10;
  let menudivheight = menuButtons.length * 10 + 10;
  document.getElementsByName("buttonMenu").height = divheight + "vh";
  document.getElementsByName("blok_1").height = menudivheight + "vh";

  const filteredMenuButtons = menuButtons.filter((item) => {
    const lowercasedSearchInput = searchInput.toLowerCase();

    return (
      (item.titel &&
        item.titel.toLowerCase().includes(lowercasedSearchInput)) ||
      (item.beschrijving &&
        item.beschrijving.toLowerCase().includes(lowercasedSearchInput)) ||
      (item.locatie &&
        item.locatie.toLowerCase().includes(lowercasedSearchInput))
    );
  });

  const fetchOnderzoekenOpBeperkingen = async (e) => {
    
    fetch('https://localhost:7225/api/Onderzoek/GetOnderzoekenByUserEmail', {
      method: 'GET',
      headers: {
        'Email': 'user4@gmail.com' 
      }
    })
    .then(response => {
      console.log(response);
      return response.json();
    })
    .then(data => {
      console.log(data.$values);

        const newMenuButtons = data.$values.map((item, index) => ({
      id: item.titel,
      name: item.uitvoerendBedrijfNaam,
      link: "/UserHome/Onderzoeken/Onderzoek",
      titel: item.titel,
      beschrijving: item.korteBeschrijving,
      locatie: item.soortOnderzoek === "Enquete" ? "Online" : item.soortOnderzoek,
      onderzoekid: item.onderzoekId,
    }));

    setMenuButtons(newMenuButtons);

    });
    

//    const respone= await fetch('https://localhost:7225/api/Onderzoek/GetOnderzoekenByUserEmail', {
//   method: 'GET',
//   headers: {
//     'Email': user.getEmail() // replace with the actual email
//   }
// })   
    
//     console.log(respone.$values);

    
    
    // const response = await fetch(
    //   "https://localhost:7225/api/Onderzoek/GetAllOnderzoeken"
    // );

    // const data = await response.json();
    // const newMenuButtons = data.$values.map((item, index) => ({
    //   id: item.titel,
    //   name: item.uitvoerendBedrijfNaam,
    //   link: "/UserHome/Onderzoeken/Onderzoek",
    //   titel: item.titel,
    //   beschrijving: item.korteBeschrijving,
    //   locatie: item.soortOnderzoek === "Enquete" ? "Online" : item.soortOnderzoek,
    //   onderzoekid: item.onderzoekId,
    // }));

    // setMenuButtons(newMenuButtons);
  };



  const fetchOnderzoeken = async (e) => {
    const response = await fetch(
      "https://localhost:7225/api/Onderzoek/GetAllOnderzoeken"
    );

    const data = await response.json();
    const newMenuButtons = data.$values.map((item, index) => ({
      id: item.titel,
      name: item.uitvoerendBedrijfNaam,
      link: "/UserHome/Onderzoeken/Onderzoek",
      titel: item.titel,
      beschrijving: item.korteBeschrijving,
      locatie: item.soortOnderzoek === "Enquete" ? "Online" : item.soortOnderzoek,
      onderzoekid: item.onderzoekId,
    }));

    setMenuButtons(newMenuButtons);
  };
  return (
    <div>
      <UserBar></UserBar>
      <img
        id={styles.wachtkamer_img}
        src="/Images/wachtkamer_plant.png"
        alt="Wachtkamer Achtergrond"
      />
      <div>
        <h1 id={styles.over_ons}>Onderzoeken</h1>
        <div id={styles.blokken}>
          <div id={styles.blok_1} name="blok_1">
          <label onClick={()=>setFilterOpBeperking(!filterOpBeperkingen)} id={styles.text_filter}htmlFor="switch">Wilt u filteren op uw beperkingen?</label>
<input id={styles.switch}  type="checkbox"
aria-label="Filter op uw beperkingen checkbox"
  checked={filterOpBeperkingen}
  onChange={() => setFilterOpBeperking(!filterOpBeperkingen)}
/>
            <input
              id={styles.searchbar}
              type="text"
              placeholder="Search..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <ul>
              {filteredMenuButtons.map((item) => (
                <div id={styles.blok_2}>
                  <h1 id={styles.text2_titel}>
                    {item.name + " - " + item.titel}
                  </h1>
                  <p id={styles.text2}>{item.beschrijving}</p>
                  <p id={styles.text3}>Locatie: {item.locatie}</p>
                  <li
                    id={styles.menuButton}
                    key={item.id}
                    name={"Button" + item.name}
                    class={styles.navbar__item}
                  >
                    <a
                      id={styles.leesmeer}
                      onClick={() => onderzoekid(item.onderzoekid)}
                      href={item.link}
                      class={styles.button}
                    >
                      Lees Meer
                    </a>
                  </li>
                </div>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <ContactGegevens></ContactGegevens>
    </div>
  );
}
