import React, { useState, useEffect } from 'react';

import { Table } from 'react-bootstrap';

import { obtenerPropiedades } from '../Services/PropiedadesService.js';

const Propiedades = () => {
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
        }; fetchPropiedades();
     }, 
    []);
    
    
    return (
        <div className="container mt-4">
            <h2 className="mb-4">Propiedades Disponibles a la Venta</h2>
            {/*Tabla de Propiedades*/}
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Título</th>
                        <th>Descripción</th>
                        <th>Metros Cuadrados</th>
                        <th>Ambientes</th>
                        <th>Valor</th>
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
                        </tr>
                    ))}
                </tbody>
            </Table>

        </div>
    );
};

export default Propiedades;
