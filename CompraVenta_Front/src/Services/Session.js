import { POST } from './Httpr.js';

export const LogInRequest = async (user_data) => {
    let url = 'auth/login';
    let rsp = await POST(url, user_data);

    return rsp;
}