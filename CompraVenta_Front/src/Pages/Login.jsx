import { useState } from 'react';
import { LogInRequest } from '../Services/Session.js';
import { Navigate } from 'react-router-dom';

const Login = (props) => {
    const [formData, setFormData] = useState({});
    const [success, setSuccess] = useState(false);

    const submitHandler = async () => {
        
            let rsp = await LogInRequest(formData);
    
            if (rsp?.token) {
                localStorage.setItem('jwt', rsp.token);
                setSuccess(true);
                props.setIsLoged(true);
                return <Navigate to='/inicio' />;
            } else {
                window.alert('Error en las credenciales!');
            }
       
    }
    
    return (
        <section className="w-[100vw] h-[100vh] flex flex-col justify-center items-center">
            {success && (<Navigate to='/users' replace={true} />)}
            <label htmlFor="" className="text-sm text-gray-700">Nombre de usuario</label>
            <input type="text" className="border-double border-4 border-sky-500 text-center" onChange={e => setFormData({ ...formData, user_name: e.target.value })} />
            <label htmlFor="" className="text-sm text-gray-700 mt-[.6rem]">Contraseña</label>
            <input type="password" className="border-double border-4 border-sky-500 text-center" onChange={e => setFormData({ ...formData, password: e.target.value })} />
            <button className="text-sm text-white bg-sky-500 mt-[.7rem] py-[.3rem] px-[.6rem] rounded-sm" onClick={submitHandler}>Ingresar</button>
        </section>
    );
}

export default Login;
