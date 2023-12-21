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

export async function PUT(url, request) {
    try {
      const response = await fetch(`${backendurl}${url}`, {
        method: 'PUT',
        mode: 'cors',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwt')}` || '',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
      });
  
      // Verifica si la respuesta es un código de estado 204 (No Content)
      if (response.status === 204) {
        return null; // No hay contenido para analizar
      }
  
      // Si no es un código de estado 204, analiza el cuerpo de la respuesta
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
  
export async function DELETE(endpoint, request) {
    try {
      const uri = request ? '?' + new URLSearchParams(request).toString() : '';
      const response = await fetch(`${backendurl}${endpoint}${uri}`, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwt')}` || ''
        }
      });
  
      // Verifica si la respuesta es un código de estado 204 (No Content)
      if (response.status === 204) {
        return null; // No hay contenido para analizar
      }
  
      // Si no es un código de estado 204, analiza el cuerpo de la respuesta
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
  
