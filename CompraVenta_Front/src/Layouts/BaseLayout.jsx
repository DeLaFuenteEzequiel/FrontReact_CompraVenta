import { Link, Navigate } from "react-router-dom";

const BaseLayout = (props) => {
    // Verificar si el usuario está autenticado
    const isAuthenticated = !!localStorage.getItem('jwt');

    // Redirigir al componente de inicio de sesión si no está autenticado
    if (!isAuthenticated) {
        return <Navigate to="/" />;
    }

    return (
        <section className="w-[100vw] flex justify-center">
            <menu className="w-[100vw] h-[3rem] absolute bg-slate-500 shadow-sm flex justify-evenly items-center text-white">
                {/* Mostrar enlaces solo si el usuario está autenticado */}
                {isAuthenticated && (
                    <>
                         <Link to='/publicarPropiedad' replace={true}>Publicar Propiedad</Link>
                        <Link to='/propiedades' replace={true}>Propiedades a la Venta</Link>
                        <Link to='/propiedades' replace={true}>Mis Propiedades</Link>
                    </>
                )}
            </menu>
            <div className="mt-[4rem]">
                {props.children}
            </div>
        </section>
    );
}

export default BaseLayout;
