import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Login from "./Pages/Login.jsx";
import { useEffect, useState } from "react";
import Inicio from "./Pages/Inicio.jsx";
import Propiedades from "./Pages/Propiedades.jsx"; 
import BaseLayout from "./layouts/BaseLayout.jsx";
import PublicarPropiedad from "./Pages/PublicarPropiedad.jsx";
import { getUserById } from './Services/Users';

const App = () => {
    const [isLoged, setIsLoged] = useState(false);
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            if (localStorage.getItem('jwt')) {
              setIsLoged(true);
          
              // Obtener el ID del usuario almacenado en localStorage
              const userId = localStorage.getItem('userId');
              console.log('userId:', userId);
          
              if (userId) {
                try {
                  // Asegúrate de que esta llamada devuelve los datos del usuario correctamente
                  const userData = await getUserById(userId);
                  console.log('userData:', userData);
          
                  // Setear los datos del usuario en el estado
                  setUserInfo(userData);
          
                  // Agrega este console.log para verificar el userId antes de guardarlo en localStorage
                  console.log('Guardando userId en localStorage:', userId);
          
                  // Guardar userId en localStorage
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
                    element={isLoged ? ( <Navigate to="/inicio" />) : (
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
                            element={<BaseLayout children={<Propiedades />} />} // Agrega la ruta para /propiedades
                        />

                        <Route
                            path="/publicarPropiedad"
                            element={<BaseLayout children={<PublicarPropiedad />} />} // Agrega la ruta para /propiedades
                        />

                        
                    </>
                )}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
