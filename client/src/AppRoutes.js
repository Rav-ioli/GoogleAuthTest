import Home from './Pages/Home'
import GoogleLogin from './Pages/GoogleLogin'
import VoegVoorstellingToe from './Pages/VoegVoorstellingToe'

const AppRoutes = [
  {
    index: true,
    element: <Home />,
  },
  {
    path: "/Login",
    element: <GoogleLogin />,
    path: "/Voorstellingen",
    element: <VoegVoorstellingToe />,
  },
];

export default AppRoutes;
