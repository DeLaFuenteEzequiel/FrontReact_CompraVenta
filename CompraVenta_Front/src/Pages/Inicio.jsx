import React from 'react';
import { Button } from 'react-bootstrap';

const Inicio = ({ userInfo }) => {
  const logout = () => {
    localStorage.removeItem('jwt');
    window.location.href = '/';
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <h1 className="display-4 font-weight-bold mb-4">Inicio</h1>
      {userInfo && (
        <div>
          <p>Nombre de usuario: {userInfo.nombreUsuario}</p>
          <p>Correo Electrónico: {userInfo.correoElectronico}</p>
          <p>
            {userInfo.registro !== 0
              ? 'Martillero Verificado'
              : 'Cliente'}
          </p>

        </div>
      )}
      <Button variant="danger" onClick={logout}>
        Cerrar sesión
      </Button>
    </div>
  );
}

export default Inicio;
