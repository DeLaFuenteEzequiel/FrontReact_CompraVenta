import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { obtenerInteresados } from '../Services/Interesados.js';

const Interesados = ({ userInfo }) => {
  const [interesados, setInteresados] = useState([]);

  useEffect(() => {
    const fetchInteresados = async () => {
      try {
        const response = await obtenerInteresados();

        if (Array.isArray(response)) {
          let interesadosFiltrados;

          if (userInfo.registro !== 0) {
            interesadosFiltrados = response.filter(
              (interesado) => Number(interesado.registro) === Number(userInfo.registro)
            );
          } else {
            interesadosFiltrados = response.filter(
              (interesado) => Number(interesado.registro) === Number(userInfo.dni)
            );
          }

          setInteresados(interesadosFiltrados);
        } else {
          console.error('Error al obtener interesados: El formato de los datos no es el esperado');
        }
      } catch (error) {
        console.error('Error al obtener interesados:', error);
      }
    };

    fetchInteresados();
  }, [userInfo]);

  return (
    <div className="container mt-4">
      {userInfo && (
        <div>
          {userInfo.registro !== 0 ? (
            <p>Numero de Registro: {userInfo.registro}</p>
          ) : (
            <p>Documento del Dueño Directo: {userInfo.dni}</p>
          )}
        </div>
      )}

      <h2 className="mb-4">Correos Recibidos</h2>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Correo Electrónico</th>
            <th>Publicación</th> 
          </tr>
        </thead>
        <tbody>
          {interesados.map((interesado, index) => (
            <tr key={index}>
              <td>{interesado.correoElectronico}</td>
              <td>{interesado.publicacion}</td> 
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Interesados;
