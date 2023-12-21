import React, { useState, useEffect } from 'react';
import { Table, Modal, Form, Button } from 'react-bootstrap';
import { obtenerPropiedades, eliminarPropiedad, actualizarPropiedad } from '../Services/PropiedadesService.js';
import { FaTrash, FaEdit } from 'react-icons/fa';

const MisPropiedades = ({ userInfo }) => {
  const [propiedades, setPropiedades] = useState([]);
  const [propiedadEditada, setPropiedadEditada] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchPropiedades = async () => {
    try {
      const response = await obtenerPropiedades();
      if (Array.isArray(response)) {
        let propiedadesFiltradas;

        if (userInfo.registro !== 0) {
          // Si el registro no es 0, filtrar por registro
          propiedadesFiltradas = response.filter(
            (propiedad) => Number(propiedad.registro) === Number(userInfo.registro)
          );
        } else {
          // Si el registro es 0, filtrar por dni
          propiedadesFiltradas = response.filter(
            (propiedad) => Number(propiedad.registro) === Number(userInfo.dni)
          );
        }

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
        fetchPropiedades();
      } catch (error) {
        console.error('Error al eliminar la propiedad:', error);
      }
    }
  };

  const handleModificar = (propiedadId) => {
    const propiedadParaEditar = propiedades.find((propiedad) => propiedad.propiedadId === propiedadId);
    setPropiedadEditada(propiedadParaEditar);
    setShowModal(true);
  };

  const handleGuardarCambios = async () => {
    try {
      await actualizarPropiedad(propiedadEditada.propiedadId, propiedadEditada);
      fetchPropiedades();
      setPropiedadEditada(null);
    } catch (error) {
      console.error('Error al actualizar la propiedad:', error);
    } finally {
      setShowModal(false);
    }
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

      {/* Modal de Edición */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        onExited={fetchPropiedades}   // Recargar la página después de que el modal se cierra
      >
        <Modal.Header closeButton>
          <Modal.Title>Editar Propiedad</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Formulario con campos prellenados */}
          <Form>
            <Form.Group controlId="formTitulo">
              <Form.Label>Título</Form.Label>
              <Form.Control
                type="text"
                value={propiedadEditada ? propiedadEditada.titulo : ''}
                onChange={(e) => setPropiedadEditada({ ...propiedadEditada, titulo: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formDescripcion">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                value={propiedadEditada ? propiedadEditada.descripcion : ''}
                onChange={(e) => setPropiedadEditada({ ...propiedadEditada, descripcion: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formValor">
              <Form.Label>Valor</Form.Label>
              <Form.Control
                type="number"
                value={propiedadEditada ? propiedadEditada.valor : ''}
                onChange={(e) => setPropiedadEditada({ ...propiedadEditada, valor: e.target.value })}
              />
            </Form.Group>
            {/* Agrega más campos según sea necesario */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleGuardarCambios}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MisPropiedades;
