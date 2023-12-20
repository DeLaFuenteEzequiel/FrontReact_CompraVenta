    import React from 'react';

    const Inicio = () => {
        const logout = () => {
            localStorage.removeItem('jwt');
            window.location.href = '/';
        };

        return (
            <div className="flex flex-col justify-center items-center">
                <h1 className="text-4xl font-bold mb-8">Inicio</h1>
                <button onClick={logout}>Cerrar sesión</button>

            </div>
        );
    }

    export default Inicio;
