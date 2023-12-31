import { useState } from 'react';
import { Navigate } from 'react-router-dom';

import { Form, Button } from 'react-bootstrap';

import { LogInRequest } from '../Services/Session.js';
import { getUserById } from '../Services/Users.js';

const Login = (props) => {
    const [formData, setFormData] = useState({});
    const [success, setSuccess] = useState(false);

    const submitHandler = async () => {
        try {
            let rsp = await LogInRequest(formData);

            if (rsp?.token) {
                localStorage.setItem('jwt', rsp.token);
                localStorage.setItem('userId', rsp.userId);
                setSuccess(true);
                props.setIsLoged(true);

                try {
                    const userData = await getUserById(rsp.userId);
                    props.setUserInfo(userData);
                    return <Navigate to="/inicio" />;
                } catch (error) {
                    console.error('Error al obtener la información del usuario:', error);
                }
            } else {
                window.alert('Error en las credenciales!');
            }
        } catch (error) {
            console.error('Error en la autenticación:', error);
        }
    };

    return (
        <section className="w-100 h-100 d-flex align-items-center justify-content-center">
            {success && <Navigate to='/users' replace={true} />}
            <Form style={{ maxWidth: '300px' }}>
                <Form.Group controlId="formUsername">
                    <Form.Label>Nombre de usuario</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingresa tu nombre de usuario"
                        onChange={(e) => setFormData({ ...formData, user_name: e.target.value })}
                    />
                </Form.Group>

                <Form.Group controlId="formPassword">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Ingresa tu contraseña"
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                </Form.Group>

                <Button
                    variant="primary"
                    className="w-100 mt-3"
                    onClick={submitHandler}
                >
                Ingresar
                </Button>
            </Form>
        </section>
    );
}

export default Login;
