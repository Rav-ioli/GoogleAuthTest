import { useEffect } from "react";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";

export default function GoogleLogin(){

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
          size: "large",
        });
        /*global google*/
        google.accounts.id.prompt();
      }, []);
    
      return (
        <div className="App">
          <div id="signInDiv"></div>
          {Object.keys(user).length != 0 && (
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
        </div>
      );

}