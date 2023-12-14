import Home from './Pages/Home'
import GoogleLogin from './Pages/GoogleLogin'
import VoegVoorstellingToe from './Pages/VoegVoorstellingToe'
import Inloggen from './Pages/Login'
import AdminPanel from './Pages/AdminPanel'

import { Navigate, useLocation } from 'react-router-dom';
import FetchData from './DataFetcher'


// function ProtectedRoute({ element, policy }) {
//   const location = useLocation();
//   const { user } = useAuth(); // replace with your actual authentication hook

//   if (!user) {
//     // If the user is not authenticated, redirect to the login page
//     return <Navigate to="/inloggen" state={{ from: location }} />;
//   } else if (policy === 'AdminOnly' && user.role !== 'admin') {
//     // If the user is not an admin, redirect to a 403 page or another appropriate page
//     return <Navigate to="/403" />;
//   } else {
//     // If the user is authenticated and has the correct role, render the element
//     return element;
//   }
// }


const AppRoutes = [
  {
    index: true,
    element: <Home />,
  },
    {
      path: "/Login",
      element: <GoogleLogin />,
    },
    {
      path: "/inloggen",
      element: <Inloggen />,
    },
    {
      path: "/Voorstellingen",
      element: <VoegVoorstellingToe />,
    },
    {
      path: "/adminpanel", // Define the path for the new route
      element: <AdminPanel />, // Specify the AdminPanel component
      policy: "AdminOnly", // Apply the "AdminOnly" policy to this route
    },
];

export default AppRoutes;
