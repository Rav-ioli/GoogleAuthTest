import { useEffect } from "react";
import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";
import styles from "../Styles/OnderzoekOpstellen.module.css";
import UserBar from "./Bars/UserBar";
import ContactGegevens from "./Bars/ContactGegevensBar";
import { useUser } from "../UserContext";
import { useNavigate } from "react-router-dom";

export default function GoogleLogin() {
  const [titel, setTitel] = useState("");
  const [beschrijving, setBeschrijving] = useState("");
  const [beloning, setBeloning] = useState("");
  const [typeBeperking, setTypeBeperking] = useState(0);
  const [typeOnderzoek, setTypeOnderzoek] = useState("");
const [locatie, setLocatie] = useState("N/A");
const Navigate = useNavigate();
  // const [beperkingen, setBeperkingen] = useState([]);
  // const [hulpmiddelen, setHulpmiddelen] = useState([]);
  // const [inputValue, setInputValue] = useState("");
  // const [inputValue2, setInputValue2] = useState("");
  const [error, setError] = useState(null);
  const [beperkingenData, setBeperkingenData] = useState([]);
  const user = useUser();
  useEffect(() => {
    fetchBeperkingen();
  }, []);

  const fetchBeperkingen = async (e) => {
    const result = await fetch(
      "https://localhost:7225/api/BeperkingHulpmiddel/GetAllBeperkingen",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.jwt,
        },
      }
    );
    if (result.ok) {
      const data = await result.json();
      setBeperkingenData(data);
    } else {
      console.error(`Error: ${result.status}`);
    }
  };

  const createOnderzoek = async (e) => {
    if (
      titel === "" ||
      beschrijving === "" ||
      beloning === "" ||
      typeBeperking === "" ||
      typeOnderzoek === ""
    ) {
      setError(true);
      return;
    }
    console.log({
      titel: titel,
      korteBeschrijving: beschrijving,
      beloning: beloning.toString(),
      typebeperking:  parseInt(typeBeperking, 10),
      soortOnderzoek: typeOnderzoek,
      locatie: locatie,
      uitvoerendbedrijf: user.getEmail(),
    });
    await fetch("https://localhost:7225/api/Onderzoek/CreateOnderzoek", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify( {
        titel: titel,
        korteBeschrijving: beschrijving,
        beloning: beloning.toString(),
        typebeperking: parseInt(typeBeperking, 10),
        soortOnderzoek: typeOnderzoek,
        locatie: locatie,
        uitvoerendbedrijfemail: user.getEmail(),
        uitvoerendbedrijf:"",
        uitvoerendbedrijfnaam:"",
        datum: new Date(),
      }),
    }).then((response) => {
      if (response.ok){
Navigate("/BedrijfsHome");
      }
    })
    ;
  };

  const handleRadioChange = (event) => {
    setTypeOnderzoek(event.target.value);
  };

  return (
    <>
      <UserBar></UserBar>
      <img
        id={styles.wachtkamer_img}
        src="/Images/wachtkamer_plant.png"
        alt="Wachtkamer Achtergrond"
      />
      <div>
        <h1 id={styles.login_title}>Onderzoek Opstellen</h1>
        <div id={styles.blok_1}>
          {/* <div id="google_login" className={styles.google_login}>
          <div id="signInDiv" alt="Google Login"></div>
          {Object.keys(user).length !== 0 && (
            <button onClick={(e) => handleSignOutEvent(e)}>log uit</button>
          )}
    
          {user && (
            <div>
              <img
                className="userImg"
                src={user.picture}
                onError={displayFallBackImage()}
                alt="user-image"
              />
              <h3>{user.name}</h3>
            </div>
          )}
        </div> */}

          {/* <hr id={styles.or_line}></hr> */}
          {/* <h3 id={styles.or_text}>OR</h3> */}
          <div id={styles.voornaam_blok}>
            <label id={styles.voornaam_text} for={styles.voornaam_input}>
              Titel:<br></br>
              <input
                aria-label="Titel invoer"
                placeholder=""
                class={styles.input}
                type="text"
                onChange={(e) => setTitel(e.target.value)}
                id={styles.voornaam_input}
                autoFocus
              />
            </label>
          </div>
          <div id={styles.username_blok}>
            <label id={styles.username_text} for={styles.username_input}>
              Beschrijving:<br></br>
              <textarea
                aria-label="Beschrijving invoer"
                class={styles.input}
                placeholder=""
                id={styles.username_input}
                value={beschrijving}
                onChange={(e) => setBeschrijving(e.target.value)}
              />
            </label>
          </div>
          <div id={styles.email_blok}>
            <label id={styles.email_text} for={styles.email_input}>
              Beloning:<br></br>
              <input
                aria-label="Uitkering invoer in euro alleen nummers toegestaan"
                placeholder="In euro"
                class={styles.input}
                type="number"
                id={styles.email_input}
                onChange={(e) => setBeloning(e.target.value)}
              />
            </label>
          </div>
          <div id={styles.beperkinginvoerdiv}>
            <select
              id={styles.beperking_input}
              value={beperkingenData.beperkingId}
              onChange={(e) => setTypeBeperking(e.target.value)}
            >
              <option value="" disabled selected>
                Selecteer een beperking voor dit onderzoek
              </option>
              {beperkingenData.map((item, index) => (
                <option key={index} value={item.beperkingId}>
                  {item.beperkingNaam}
                </option>
              ))}
            </select>
          </div>
          <div>
            <h2 id={styles.checkboxTitle}>Type Onderzoek</h2>

            <label>
              <input
                aria-label="Checkbox voor Interview"
                id={styles.checkbox1}
                type="radio"
                name="typeOnderzoek"
                value="Interview"
                onChange={handleRadioChange}
              />
              Interview
            </label>
            <br />
            <label>
              <input
                aria-label="Checkbox voor Groepsgesprek"
                id={styles.checkbox2}
                type="radio"
                name="typeOnderzoek"
                value="Groepsgesprek"
                onChange={handleRadioChange}
              />
              Groepsgesprek
            </label>
            <br />
            <label>
              <input
                aria-label="Checkbox voor Online Onderzoek"
                id={styles.checkbox3}
                type="radio"
                name="typeOnderzoek"
                value="Online Onderzoek"
                onChange={handleRadioChange}
              />
              Online Onderzoek
            </label>
            <br />
            <label>
              <input
                aria-label="Checkbox voor Engelstalige Onderzoek"
                id={styles.checkbox4}
                type="radio"
                name="typeOnderzoek"
                value="Engelstalig Onderzoek"
                onChange={handleRadioChange}
              />
              Engelstalig Onderzoek
            </label>
          </div>
          {typeOnderzoek.includes("Interview") ||
          typeOnderzoek.includes("Groepsgesprek") ? (
            // Replace this comment with the JSX you want to render when typeOnderzoek includes "Interview"
            <div id={styles.telnr_blok}>
              <label id={styles.telnr_text} for={styles.telnr_input}>
                Onderzoek Locatie:<br></br>
                <input
                  aria-label="Onderzoek locatie invoer"
                  placeholder=""
                  class={styles.input}
                  type="text"
                  id={styles.telnr_input}
                  onChange={(e) => setLocatie(e.target.value)}
                />
              </label>
            </div>
          ) : null}
          <button
            aria-label="Onderzoek aanmaken knop"
            id={styles.register_button}
            onClick={createOnderzoek}
          >
            Onderzoek Aanmaken
          </button>
          {error ? (
            <div
              id={styles.warning_no_input}
              aria-label="Niet alle velden zijn ingevuld"
              className="your-class-name"
            >
              Alle velden moeten ingevuld zijn
            </div>
          ) : null}
        </div>
      </div>
      <ContactGegevens></ContactGegevens>
    </>
  );
}
