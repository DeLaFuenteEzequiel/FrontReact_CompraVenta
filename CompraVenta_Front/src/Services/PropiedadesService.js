import { POST, GET, DELETE, PUT } from './Httpr.js';

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
        throw error;
    }
};

export const obtenerPropiedadPorId = async (propiedadId) => {
    let url = `propiedades/${propiedadId}`;
    let response = await GET(url);
    return response;
};

export const eliminarPropiedad = async (propiedadId) => {
    let url = `propiedades/${propiedadId}`;
    let response = await DELETE(url);
    return response;
};

export const actualizarPropiedad = async (propiedadId, updatePropiedadData) => {
    try {
      const url = `propiedades/${propiedadId}`;
      const response = await PUT(url, updatePropiedadData);
      return response;
    } catch (error) {
      console.error('Error al actualizar la propiedad:', error);
      throw error;
    }
  };
  