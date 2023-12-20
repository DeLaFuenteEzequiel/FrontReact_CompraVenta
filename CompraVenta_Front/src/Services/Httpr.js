const backendurl = "http://localhost:5059/api/";


export async function POST(url, request) {
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
