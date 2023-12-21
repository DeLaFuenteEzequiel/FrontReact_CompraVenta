
import { POST, GET, DELETE, PUT } from '../Services/Httpr.js';

export const createUser = async (newUserData) => {
    let url = 'usuarios';
    let response = await POST(url, newUserData);
    return response;
}

export const searchUsers = async (searchParams) => {
    let url = 'usuarios';
    let response = await GET(url, searchParams);
    return response;
}


export const getUserById = async (userId) => {
    let url = `usuarios/${userId}`;
    let response = await GET(url);
    return response;
  };



export const deleteUser = async (userId) => {
    let url = `usuarios/${userId}`;
    let response = await DELETE(url);
    return response;
};

export const updateUserData = async (userId, updateUserData) => {
    let url = `usuarios/${userId}`;
    let response = await PATCH(url, updateUserData);
    return response;
};

export const login = async (loginData) => {
    let url = 'usuarios/login';
    let response = await POST(url, loginData);
    return response;
};
