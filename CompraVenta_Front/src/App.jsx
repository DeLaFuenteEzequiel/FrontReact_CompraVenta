import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Login from "./Pages/Login.jsx";
import { useEffect, useState } from "react";
import Inicio from "./Pages/Inicio.jsx";
import BaseLayout from "./layouts/BaseLayout.jsx";

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
                    <Route
                        path="/inicio"
                        element={<BaseLayout children={<Inicio />} />}
                    />
                )}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
