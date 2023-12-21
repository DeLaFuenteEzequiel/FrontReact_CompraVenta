import React, { useState, useEffect } from 'react';

import { Table, Button } from 'react-bootstrap';
import { FaEnvelope } from 'react-icons/fa';

import { obtenerPropiedades } from '../Services/PropiedadesService.js';
import { agregarInteresado } from '../Services/Interesados.js';

const Propiedades = ({ userInfo }) => {
  const [propiedades, setPropiedades] = useState([]);

  useEffect(() => {
    const fetchPropiedades = async () => {
      try {
        const response = await obtenerPropiedades();
        if (Array.isArray(response)) {
          setPropiedades(response);
        } else {
          console.error('Error al obtener propiedades: El formato de los datos no es el esperado');
        }
      } catch (error) {
        console.error('Error al obtener propiedades:', error);
      }
    };
    fetchPropiedades();
  }, []);

  const handleEnviarContacto = async (propiedadId) => {
    try {
        const response = await agregarInteresado({
            correoElectronico: userInfo.correo,
            registro: userInfo.registro,
            publicacion:"asd",
          });
          
          // Loguea la respuesta para obtener más detalles del error
          console.log('Respuesta del servidor:', response);
          
          // Loguea los errores específicos si existen
          if (response.errors && response.errors.interesado) {
            console.log('Errores de validación:', response.errors.interesado);
          }
    } catch (error) {
      console.error('Error al enviar el contacto:', error);
    }
  };
  return (
    <div className="container mt-4">
      <h2 className="mb-4">Propiedades Disponibles a la Venta</h2>
      {/* Tabla de Propiedades */}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Descripción</th>
            <th>Metros Cuadrados</th>
            <th>Ambientes</th>
            <th>Valor</th>
            <th>Enviar Contacto</th>
          </tr>
        </thead>
        <tbody>
          {propiedades.map((propiedad, index) => (
            <tr key={index}>
              <td>{propiedad.propiedadId}</td>
              <td>{propiedad.titulo}</td>
              <td>{propiedad.descripcion}</td>
              <td>{propiedad.metrosCuadrados}</td>
              <td>{propiedad.ambientes}</td>
              <td>{propiedad.valor}</td>
              <td>
                <Button onClick={() => handleEnviarContacto(propiedad.propiedadId)}>
                    <FaEnvelope /> 
                </Button>
            </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Propiedades;
