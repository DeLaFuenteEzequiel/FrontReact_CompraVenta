import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Login from "./Pages/Login.jsx";
import { useEffect, useState } from "react";
import BaseLayout from './Layouts/BaseLayout.jsx';
import Users from "./Pages/Users.jsx";

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
                    element={isLoged ? <Navigate to="/users" /> : <Login setIsLoged={setIsLoged} />}
                />
                {isLoged && (
                    <Route
                        path="/users"
                        element={<BaseLayout children={<Users />} />}
                    />
                )}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
