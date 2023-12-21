import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import BaseLayout from "./Layouts/BaseLayout.jsx";

import Login from "./Pages/Login.jsx";
import Inicio from "./Pages/Inicio.jsx";
import Propiedades from "./Pages/Propiedades.jsx";
import MisPropiedades from "./Pages/MisPropiedades.jsx"; 
import PublicarPropiedad from "./Pages/PublicarPropiedad.jsx";

import { getUserById } from './Services/Users';

const App = () => {
  const [isLoged, setIsLoged] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (localStorage.getItem('jwt')) {
        setIsLoged(true);
        const userId = localStorage.getItem('userId');

        if (userId) {
          try {
            const userData = await getUserById(userId);
            setUserInfo(userData);
            localStorage.setItem('userId', userId);
          } catch (error) {
            console.error('Error al obtener la información del usuario:', error);
          }
        } else {
          console.error('userId es undefined');
        }
      }
    };
fetchUser();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={isLoged ? (<Navigate to="/inicio" />) : (
            <Login setIsLoged={setIsLoged} setUserInfo={setUserInfo} />)
          }
        />
        {isLoged && (
          <>
            <Route
              path="/inicio"
              element={<BaseLayout children={<Inicio userInfo={userInfo} />} />}
            />
            <Route
              path="/propiedades"
              element={<BaseLayout children={<Propiedades />} />}
            />
            <Route
              path="/publicarPropiedad"
              element={<BaseLayout children={<PublicarPropiedad userInfo={userInfo} />} />}
            />
            {/* Nueva ruta para MisPropiedades */}
            <Route
              path="/misPropiedades"
              element={<BaseLayout children={<MisPropiedades userInfo={userInfo} />} />}
            />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
