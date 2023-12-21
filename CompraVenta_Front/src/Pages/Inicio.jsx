import React from 'react';

import { Button } from 'react-bootstrap';
import gif from '../assets/gif1.gif';


const Inicio = ({ userInfo }) => {
  const logout = () => {
    localStorage.removeItem('jwt');
    window.location.href = '/';
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <h1 className="display-4 font-weight-bold mb-4">Yucatan Propiedades</h1>
      {userInfo && (
        <div className="d-flex justify-content-between">
         
          <div className="d-flex flex-column text-left flex-grow-1">
            <p><strong>Nombre de Usuario:</strong> {userInfo.nombreUsuario}</p>
            <p><strong>Nombre Real:</strong> {userInfo.nombreReal}</p>
            <p><strong>Documento:</strong> {userInfo.dni}</p>
            <p><strong>Correo Electrónico:</strong> {userInfo.correoElectronico}</p>
            <p><strong>Localidad:</strong> {userInfo.localidad}</p>
            <p><strong>{userInfo.registro !== 0 ? 'Martillero Verificado' : 'Cliente'}</strong></p>
          </div>

          <div className="d-flex flex-column align-items-end">
            <div className="mt-4">
              <img src={gif} alt="GIF CompraVenta" style={{ maxWidth: '100%' }} />
            </div>
            
          </div>
        </div>
      )}

      
      <div className="mt-4">
        <Button variant="danger" onClick={logout}>
          Cerrar sesión
        </Button>
      </div>
    </div>
  );
}

export default Inicio;
