import { POST, GET, DELETE, PUT } from './Httpr.js';

export const agregarInteresado = async (interesadoData) => {
    try {
        const url = 'interesados';
        const response = await POST(url, interesadoData);
        return response;
    } catch (error) {
        console.error('Error al agregar interesado:', error);
        throw error;
    }
};

export const obtenerInteresados = async (searchParams) => {
    try {
        const url = 'interesados';
        const response = await GET(url, searchParams);
        return response;
    } catch (error) {
        console.error('Error al obtener interesados:', error);
        throw error;
    }
};

export const obtenerInteresadoPorId = async (interesadoId) => {
    const url = `interesados/${interesadoId}`;
    const response = await GET(url);
    return response;
};

export const eliminarInteresado = async (interesadoId) => {
    const url = `interesados/${interesadoId}`;
    const response = await DELETE(url);
    return response;
};

export const actualizarInteresado = async (interesadoId, updateInteresadoData) => {
    try {
        const url = `interesados/${interesadoId}`;
        const response = await PUT(url, updateInteresadoData);
        return response;
    } catch (error) {
        console.error('Error al actualizar el interesado:', error);
        throw error;
    }
};
