import { POST, GET, DELETE, PATCH } from './Httpr.js';

export const publicarPropiedad = async (propiedadData) => {
    let url = 'propiedades';
    let response = await POST(url, propiedadData);
    return response;
}

export const obtenerPropiedades = async (searchParams) => {
    try {
        let url = 'propiedades';
        let response = await GET(url, searchParams);
        return response;
    } catch (error) {
        console.error('Error al obtener propiedades:', error);
        // Maneja el error de alguna manera (lanzar una excepción, devolver un objeto de error, etc.)
        throw error;
    }
};

export const obtenerPropiedadPorId = async (propiedadId) => {
    let url = `/propiedades/${propiedadId}`;
    let response = await GET(url);
    return response;
};

export const eliminarPropiedad = async (propiedadId) => {
    let url = `/propiedades/${propiedadId}`;
    let response = await DELETE(url);
    return response;
};

export const actualizarPropiedad = async (propiedadId, updatePropiedadData) => {
    let url = `/propiedades/${propiedadId}`;
    let response = await PATCH(url, updatePropiedadData);
    return response;
};
