import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Login from "./Pages/Login.jsx";
import { useEffect, useState } from "react";
import Inicio from "./Pages/Inicio.jsx";
import Propiedades from "./Pages/Propiedades.jsx"; 
import BaseLayout from "./layouts/BaseLayout.jsx";
import PublicarPropiedad from "./Pages/PublicarPropiedad.jsx";

const App = () => {
    const [isLoged, setIsLoged] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('jwt')) {
            setIsLoged(true);
        }
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={isLoged ? <Navigate to="/inicio" /> : <Login setIsLoged={setIsLoged} />}
                />
                {isLoged && (
                    <>
                        <Route
                            path="/inicio"
                            element={<BaseLayout children={<Inicio />} />}
                        />
                        <Route
                            path="/propiedades"
                            element={<BaseLayout children={<Propiedades />} />} // Agrega la ruta para /propiedades
                        />

                         <Route
                            path="/publicarPropiedad"
                            element={<BaseLayout children={<PublicarPropiedad />} />} // Agrega la ruta para /publicarPropiedad
                        />
                    </>
                )}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
