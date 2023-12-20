import React from 'react';
import { Button } from 'react-bootstrap';

const Inicio = ({ userInfo }) => {
  const logout = () => {
    localStorage.removeItem('jwt');
    window.location.href = '/';
  };

  console.log('userInfo:', userInfo);
  return (
    <div className="d-flex flex-column align-items-center">
      <h1 className="display-4 font-weight-bold mb-4">Inicio</h1>
      {/* Mostrar la información del usuario si está disponible */}
      {userInfo && (
        <div>
          <p>Nombre de usuario: {userInfo.nombreUsuario}</p>
          <p>Correo Electrónico: {userInfo.correoElectronico}</p>
          <p>Numero registro: {userInfo.registro}</p>
          {/* Agrega más campos según la estructura de tu objeto de usuario */}
        </div>
      )}
      <Button variant="danger" onClick={logout}>
        Cerrar sesión
      </Button>
    </div>
  );
}

export default Inicio;
