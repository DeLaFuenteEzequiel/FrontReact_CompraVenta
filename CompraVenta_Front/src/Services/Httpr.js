const backendurl = "http://localhost:5059/api/";


export async function POST(url, request) {
    try {
        const requestOptions = {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        };

        // Agrega la autorización solo si hay un token almacenado
        const token = localStorage.getItem('jwt');
        if (token) {
            requestOptions.headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(`${backendurl}${url}`, requestOptions);

        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}


export async function GET(url, request = null) {
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

export async function PATCH(url, request) {
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

export async function DELETE(request) {
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
