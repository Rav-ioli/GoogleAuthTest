import { useContext, useEffect } from "react";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import styles from '../Styles/GoogleLogin.module.css'
import GuestBar from './Bars/GuestBar';
import ContactGegevens from './Bars/ContactGegevensBar'
import Cookies from 'js-cookie';
import { useUser } from "../UserContext";
import { useNavigate } from "react-router-dom";

export default function GoogleLogin(){

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 const navigate = useNavigate();
  const userContext = useUser();
console.log(userContext.getRoles())
    function displayFallBackImage() {
        // Use document.querySelector to find the element with the class 'userImg'
        var userImgElement = document.querySelector(".userImg");
    
        // Check if the element is found before trying to modify its 'src' property
        if (userImgElement) {
          userImgElement.src = "client/847969.png";
        }
      }
    
      const [user, setUser] = useState({});
    
      function handleCallbackResponse(response) {
        console.log("Encoded JWT ID token: " + response.credential);
        var userObject = jwtDecode(response.credential);
        console.log(userObject);
        setUser(userObject);
        document.getElementById("signInDiv").hidden = true;
      }
    
      function handleSignOutEvent(event) {
        setUser({});
        document.getElementById("signInDiv").hidden = false;
      }
    
      useEffect(() => {
        /*global google*/
        google.accounts.id.initialize({
          client_id:
            "235973845509-5fddgbhrq2qs29am82tsr7unpch77gms.apps.googleusercontent.com",
          callback: handleCallbackResponse,
        });
        google.accounts.id.renderButton(document.getElementById("signInDiv"), {
          theme: "outline",
          width: 500,
        });
        /*global google*/
        google.accounts.id.prompt();
      }, []);
    

      const login = async(token)=>{
        await userContext.Login(token);
      navigate("/home");
      }

       async function LoginHandler(e){
       e.preventDefault();

       var result = await fetch("https://localhost:7225/api/User/login", {
        method: "POST",
        headers: { "Content-Type": "application/json"
        , "Authorization": "Bearer " + sessionStorage.getItem("token") 
      },
        body: JSON.stringify({
            email: email,
            password: password,
        }), 
    }).then(async response => {
        if (response.status === 405) {
            alert("This server does not support the POST method for the specified endpoint.");
        } else {
            
          if (response.ok) {
            const result = await response.json();
            await login(result.token)
          }else {
                  console.log('Unexpected format of response:', response);
              }
          } 
        }
    )


      }


      return (
        <>
        <GuestBar>
        </GuestBar>
        <img id={styles.wachtkamer_img} src="/Images/wachtkamer_plant.png" alt="Wachtkamer Achtergrond"/>
      <div>
        <h1 id={styles.login_title}>Login</h1>
        <div id={styles.blok_1}>


        <div id="google_login" className={styles.google_login}>
          <div id="signInDiv" alt="Google Login"></div>
          {Object.keys(user).length !== 0 && (
            <button onClick={(e) => handleSignOutEvent(e)}>log uit</button>
          )}
    
          {user && (
            <div>
              {/* <img
                className="userImg"
                src={user.picture}
                onError={displayFallBackImage()}
                alt="user-image"
              />
              <h3>{user.name}</h3> */}
            </div>
          )}
        </div>

        <hr id={styles.or_line}></hr>
        {/* <h3 id={styles.or_text}>OR</h3> */}
          <div id={styles.username_blok}>
            <h3 id={styles.username_text}>Email:</h3>
            <input type="text" id={styles.username_input} onChange={(e)=> setEmail(e.target.value)} autoFocus/>
          </div>
          <div id={styles.password_blok}>
            <h3 id={styles.password_text}>Password:</h3>
            <input type="password"  onChange={(e)=> setPassword(e.target.value)} id={styles.password_input}/>
          </div>
          <button onClick={LoginHandler} id={styles.login_button}>Login</button>
        </div>
      </div>
        <ContactGegevens>
        </ContactGegevens>
        </>
      );

}