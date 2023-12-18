import { useState } from "react"
import { jwtDecode } from "jwt-decode";
import { Link, NavLink } from "react-router-dom";
import '../Styles/VoegVoorstellingToe.css';


const VoorstellingAdding= ()=> {
    const [voorstellingNaam, setVoorstelllingNaam] = useState("");
    const [zaalnummer, setZaalnummer] = useState(0);
    const [datumTijd, setDatumTijd] = useState("");
    const [tijdsduur, setTijdsduur] = useState("");
    const [genre, setGenre] = useState("");
    const [artiest, setArtiest] = useState(0);
    const [prijs, setPrijs] = useState(0);

    const [zaalData, setZaalData] = useState([]);
    const [error, setError] = useState(false);
    const [invalidErrorZaal, setInvalidErrorZaal] = useState(false);
    const [invalidErrorPrijs, setInvalidErrorPrijs] = useState(false);
    const [invalidErrorZaal2, setInvalidErrorZaal2] = useState(false);

        async function submitHandler(e) {
             e.preventDefault();

            // if (voorstellingNaam.length === 0 || zaalnummer === 0 || prijs === 0 || artiest === 0 || datumTijd.length === 0 || tijdsduur.length === 0
            //     || tijdsduur.length !== 5 || datumTijd.length !== 10) {
            //     setError(true);
            // }
            // else if (isNaN(zaalnummer) || isNaN(prijs)) {
            //     await fetchZaalData();
            //     setInvalidErrorZaal(true);
            //     setInvalidErrorPrijs(true);
            //     zaalData.forEach(zaal => {
            //         if (zaal.id !== zaalnummer) {
            //             setInvalidErrorZaal2(true);
            //         }
            //     })
            // } else {


    console.log(voorstellingNaam, genre);
    //fetch aanmaken en de url meegeven body namen moet zelfde zijn als in de backend
   await fetch("https://localhost:7225/api/User/login", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": "Bearer " + sessionStorage.getItem("token") },
        body: JSON.stringify({
            email: voorstellingNaam,
            password: genre,
        }), 
    }).then(async (response) => {
        if (response.status === 405) {
            alert("This server does not support the POST method for the specified endpoint.");
        } else {
            if (response.ok) {
              //  alert("voorstelling toegevoegd");
              const result = await response.json();
                if (true) {
                    handleCallbackResponse(result.token);
                } else {
                    console.log('Unexpected format of response:', result);
                }
            } else {
                alert("poging mislukt");
            }
        }
        console.log(response.status);
    })

}
const [user, setUser] = useState({});
    
function handleCallbackResponse(token) {
    // console.log("Encoded JWT ID token: " + response);
    // var userObject = jwtDecode(response.stringify);
    // console.log(userObject);
    // setUser(userObject);
    // document.getElementById("signInDiv").hidden = true;
    localStorage.setItem("token", token);
    console.log("Token added to local storage");
    HandleToken();
  }
  function HandleToken() {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
        // Print the contents of the token to the console
        const decodedToken = jwtDecode(storedToken);
        console.log("Token contents:", decodedToken);
        const authenticationLevel = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/authentication"]
        console.log(authenticationLevel);
    } else {
        console.log("Token not found in localStorage");
    }
  }



    // async function fetchZaalData() {
    //     try {
    //         const response = await fetch("api/zaal");
    //         const responseJSON = await response.json();
    //         console.log(responseJSON);
    //         setZaalData(responseJSON);
    //     } catch {

    //     }
    // }

    return (
        <form>
            <div className="container" id="container">
                <h1>Voeg Een Voorstelling Toe</h1>
                <div className="row">
                    <div className="col-sm-8">
                        <div className="row my-3">
                            <div className="col-Voorstelling">
                                <label className="labelInput">voorstelling naam</label>
                                <label className="verplicht2">*</label>
                                <input type="text" id="voorstellingNaam" onChange={(e) => setVoorstelllingNaam(e.target.value)} name="naam" className="form-control" placeholder="naam" />
                                <div data-cy="input-naam" className="background-warning">{error && voorstellingNaam <= 0 ? <label className="warning-no-input">voorstelling naam mag niet leeg zijn</label> : ""}</div>
                                <label className="labelInput">zaalnummer</label>
                                <label className="verplicht2">*</label>
                                <input type="text" id="voorstellingZaalnummer" onChange={(e) => setZaalnummer(e.target.value)} name="zaalnummer" className="form-control" placeholder="zaalnummer" />
                                <div className="background-warning">{error && zaalnummer === 0 ? <label className="warning-no-input">zaalnummer mag niet leeg zijn</label> : ""}{invalidErrorZaal && (isNaN(zaalnummer)) ? <label className="label-invalidValue">ongeldige waarde</label> : ""}{invalidErrorZaal2 ? <label className="label-invalidValue">Zaal bestaat niet</label> : ""}</div>
                                <label className="labelInput">datum voorstelling</label>
                                <label className="verplicht2">*</label>
                                <input type="text" id="voorstellingDatum" onChange={(e) => setDatumTijd(e.target.value)} name="datum" className="form-control" placeholder="dd-mm-jjjj" />
                                <div className="background-warning">{error && datumTijd.length <= 0 ? <label className="warning-no-input">datum/tijd mag niet leeg zijn</label> : ""}</div>
                                <label className="labelInput">tijd</label>
                                <label className="verplicht2">*</label>
                                <input type="text" id="voorstellingTijd" onChange={(e) => setTijdsduur(e.target.value)} name="tijd" className="form-control" placeholder="uu:mm" />
                                <div className="background-warning">{error && tijdsduur.length <= 0 ? <label className="warning-no-input">tijdsduur mag niet leeg zijn</label> : ""}</div>
                                <label className="labelInput">genre</label>
                                <label className="optioneel1">	&#40;optioneel&#41;</label>
                                <input type="text" id="voorstellingGenre" onChange={(e) => setGenre(e.target.value)} name="genre" className="form-control" placeholder="genre" />
                                <label className="labelInput">artiest</label>
                                <label className="verplicht2">*</label>
                                <input type="text" id="voorstellingArtiest" onChange={(e) => setArtiest(e.target.value)} name="artiest" className="form-control" placeholder="artiest" />
                                <NavLink tag={Link} className="text-dark" to="/ArtiestList"><button className="button-artiestlijst">lijst artiesten</button></NavLink>
                                <div className="background-warning">{error && artiest === 0 ? <label className="warning-no-input">artiest mag niet leeg zijn</label> : ""}</div>
                                <label className="verplicht2">*</label>
                                <label className="labelInput">prijs</label>
                                <input type="text" id="voorstellingPrijs" onChange={(e) => setPrijs(e.target.value)} name="prijs" className="form-control" placeholder="00.00$" />
                                <div className="background-warning">{error && prijs === 0 ? <label className="warning-no-input">prijs mag niet leeg zijn</label> : ""}{invalidErrorPrijs && (isNaN(prijs)) ? <label className="label-invalidValue">ongeldige waarde</label> : ""}</div>
                                <div className="button-artiest-div"><label className="voeg-artiest-toe-indicator">Nieuwe artiest: </label> <NavLink tag={Link} className="text-dark" to="/AddArtiest">
                                    <button className="btn-Artiest-Add">&#43; artiest</button>
                                </NavLink></div>
                                <div className="button-save-div"><button className="btn-Save" onClick={submitHandler}>Save</button></div>
                                <h1><strong>Admin</strong></h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default VoorstellingAdding;