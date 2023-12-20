const backendurl = "http://192.168.0.194:5059/api/";

export async function postUser(file) {
    try {
        let data = new FormData();
        data.append('file', file);

        const response = await fetch(`${backendurl}Usuarios`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}` || ''
            },
            body: data
        });

        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export async function post(url, request) {
    try {
        const response = await fetch(`${backendurl}${url}`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('jwt')}` || ''
            },
            body: JSON.stringify(request)
        });

        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export async function get(url, request = null) {
    try {
        const uri = request ? '?' + new URLSearchParams(request).toString() : '';
        const response = await fetch(`${backendurl}${url}${uri}`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}` || ''
            }
        });

        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export async function patch(url, request) {
    try {
        const response = await fetch(`${backendurl}${url}`, {
            method: 'PATCH',
            mode: 'cors',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}` || '',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request)
        });

        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export async function deleteUser(request) {
    try {
        const uri = request ? '?' + new URLSearchParams(request).toString() : '';
        const response = await fetch(`${backendurl}Usuarios${uri}`, {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}` || ''
            }
        });

        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
