import Home from './Pages/Home'
import GoogleLogin from './Pages/GoogleLogin'
import VoegVoorstellingToe from './Pages/VoegVoorstellingToe'
import Inloggen from './Pages/Login'

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
];

export default AppRoutes;
