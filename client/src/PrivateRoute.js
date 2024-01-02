import { useState } from "react";
import { useUser } from "./UserContext";
import { Navigate } from "react-router-dom";


const PrivateRoute = (props) => {
  const user = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [isValid, setIsValid] = useState(null);

  const { children } = props;

  if (user && user.jwt) {
    fetch("https://localhost:7225/api/User/Validate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + user.jwt, 
      },
      body: JSON.stringify(props.roles), 
    }).then((isValid) => {
      setIsValid(isValid.status === 200);
      setIsLoading(false);
    });
  } else {
    return <Navigate to="/login" />;
  }

  return isLoading ? (
    <div>Loading...</div>
  ) : isValid ? (
    children
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;