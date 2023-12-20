import { Navigate } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

const BaseLayout = (props) => {
    const isAuthenticated = !!localStorage.getItem('jwt');
    
    if (!isAuthenticated) {
        return <Navigate to="/" />;
    }

    return (
        <div className="w-[100vw]">
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/inicio">Inicio</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/publicarPropiedad">Publicar Propiedad</Nav.Link>
                    <Nav.Link href="/propiedades">Propiedades a la Venta</Nav.Link>
                    <Nav.Link href="/misPropiedades">Mis Propiedades</Nav.Link>
                </Nav>
            </Navbar>

            <div className="mt-[4rem]">
                {props.children}
            </div>
        </div>
    );
}

export default BaseLayout;