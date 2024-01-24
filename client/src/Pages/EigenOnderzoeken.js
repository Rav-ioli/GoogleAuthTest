import React from "react";
import { useState,useEffect } from "react";
import GoogleLogin from "./GoogleLogin";
import styles from "../Styles/EigenOnderzoeken.module.css";
import GuestBar from "./Bars/GuestBar";
import UserBar from "./Bars/UserBar";
import ContactGegevens from "./Bars/ContactGegevensBar";
import { useUser } from "../UserContext";
import Cookies from "js-cookie";

export default function Onderzoeken() {
  const user = useUser();
  const [searchInput, setSearchInput] = useState("");
  const [menuButtons, setMenuButtons] = useState([]);
  const onderzoekidMod = (id) => {
    localStorage.setItem("onderzoekIdMod", id);
  }

useEffect(() => {
    fetchOnderzoekenVanBedrijf();
  },[]);
  let divheight = menuButtons.length * 10;
  let menudivheight = menuButtons.length * 10 + 10;
  document.getElementsByName("buttonMenu").height = divheight + "vh";
  document.getElementsByName("blok_1").height = menudivheight + "vh";

  async function fetchOnderzoekenVanBedrijf() {

    await fetch(
      "https://localhost:7225/api/Onderzoek/GetOnderzoekenFromBedrijf",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + Cookies.get("token"),
          Email:user.getEmail().toString(),
        },
      }
    ).then(async response => {
      console.log(response);
      const data = await response.json();
        const newMenuButtons = data.map((item, index) => ({
      id: item.titel,
      name: item.uitvoerendBedrijfNaam,
      link: "/Onderzoek",
      titel: item.titel,
      beschrijving: item.korteBeschrijving,
      locatie: item.soortOnderzoek === "Enquete" ? "Online" : item.soortOnderzoek,
      onderzoekid: item.onderzoekId,
    }));

    setMenuButtons(newMenuButtons);
    if (data.length === 0) {
      alert("Geen onderzoeken gevonden");
    }
    });
  }

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

  return (
    <div>
      <UserBar></UserBar>
      <img
        id={styles.wachtkamer_img}
        src="/Images/wachtkamer_plant.png"
        alt="Wachtkamer Achtergrond"
      />
      <div>
        <h1 id={styles.over_ons}>Eigen Onderzoeken</h1>
        <div id={styles.blokken}>
          <div id={styles.blok_1} name="blok_1">
            <input
              id={styles.searchbar}
              aria-label="Zoekbar"
              type="text"
              placeholder="Search..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <ul>
              {filteredMenuButtons.map((item) => (
                <div
                  aria-label={
                    "Onderzoek van " +
                    item.name +
                    ", die gaat over " +
                    item.titel
                  }
                  id={styles.blok_2}
                >
                  <p id={styles.text2_titel}>{item.titel}</p>
                  <p id={styles.text2}>{item.beschrijving}</p>
                  <p id={styles.text3}>Locatie: {item.locatie}</p>
                  <li
                    id={styles.menuButton}
                    key={item.id}
                    name={"Button" + item.name}
                    class={styles.navbar__item}
                  >
                    <a
                      aria-label={
                        "Lees meer over het onderzoek van " + item.name
                      }
                      id={styles.leesmeer}
                      onClick={() => onderzoekidMod(item.onderzoekid)}
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
