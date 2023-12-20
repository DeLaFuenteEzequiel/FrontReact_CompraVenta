
import { POST } from './Httpr.js';

export const LogInRequest = async ({ user_name, password }) => {
    let url = 'usuarios/login';
    let rsp = await POST(url, { Username: user_name, Password: password });

    return rsp;
};
