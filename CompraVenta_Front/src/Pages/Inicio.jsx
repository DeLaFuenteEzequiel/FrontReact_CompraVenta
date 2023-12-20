import React from 'react';
import { Button } from 'react-bootstrap';

const Inicio = () => {
    const logout = () => {
        localStorage.removeItem('jwt');
        window.location.href = '/';
    };

    return (
        <div className="d-flex flex-column align-items-center">
            <h1 className="display-4 font-weight-bold mb-4">Inicio</h1>
            <Button variant="danger" onClick={logout}>
                Cerrar sesión
            </Button>
        </div>
    );
}

export default Inicio;
