import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { obtenerPropiedades, eliminarPropiedad} from '../Services/PropiedadesService.js';
import { FaTrash, FaEdit } from 'react-icons/fa'; 


const MisPropiedades = ({ userInfo }) => {
  const [propiedades, setPropiedades] = useState([]);

  const fetchPropiedades = async () => {
    try {
      const response = await obtenerPropiedades();
      if (Array.isArray(response)) {
        const propiedadesFiltradas = response.filter(
          (propiedad) => Number(propiedad.registro) === Number(userInfo.registro)
        );
        setPropiedades(propiedadesFiltradas);
      } else {
        console.error('Error al obtener propiedades: El formato de los datos no es el esperado');
      }
    } catch (error) {
      console.error('Error al obtener propiedades:', error);
    }
  };

  useEffect(() => {
    fetchPropiedades();
  }, [userInfo]);

  const handleEliminar = async (propiedadId) => {
    const isConfirmed = window.confirm('¿Está seguro de eliminar su propiedad?');

    if (isConfirmed) {
      try {
        await eliminarPropiedad(propiedadId);
        fetchPropiedades(); // Ahora fetchPropiedades está definido en este alcance
      } catch (error) {
        console.error('Error al eliminar la propiedad:', error);
      }
    }
  };

  const handleModificar = (propiedadId) => {
    console.log(`Modificar propiedad con ID: ${propiedadId}`);
  };
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
      <h2 className="mb-4">Mis Propiedades</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Descripción</th>
            <th>Metros Cuadrados</th>
            <th>Ambientes</th>
            <th>Valor</th>
            <th>Acciones</th>
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
                <FaTrash
                  style={{ cursor: 'pointer', color: 'red' }}
                  onClick={() => handleEliminar(propiedad.propiedadId)}
                />
                {' '}
                <FaEdit
                  style={{ cursor: 'pointer', color: 'blue' }}
                  onClick={() => handleModificar(propiedad.propiedadId)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default MisPropiedades;
