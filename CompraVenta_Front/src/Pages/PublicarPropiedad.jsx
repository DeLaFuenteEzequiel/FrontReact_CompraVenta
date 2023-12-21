import React, { useState } from 'react';
import { publicarPropiedad } from '../Services/PropiedadesService';

const PublicarPropiedad = ({ userInfo }) => {
    const [formData, setFormData] = useState({
        titulo: '',
        descripcion: '',
        metrosCuadrados: '',
        ambientes: '',
        valor: '',
        registro: userInfo && userInfo.registro !== 0 ? userInfo.registro : (userInfo ? userInfo.dni : ''),
      });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async () => {
    try {
      // Realiza la lógica para publicar la propiedad en tu backend
      await publicarPropiedad({ ...formData, registro: userInfo.registro });
      // Puedes redirigir o mostrar un mensaje de éxito aquí
      console.log('Propiedad publicada exitosamente');
    } catch (error) {
      console.error('Error al publicar la propiedad:', error);
      // Puedes mostrar un mensaje de error aquí
    }
  };

  return (
    <div className="container mt-5">
      <h1>Publicar Propiedad</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="titulo" className="form-label">
            Título
          </label>
          <input type="text" className="form-control" id="titulo" name="titulo" onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="descripcion" className="form-label">
            Descripción
          </label>
          <textarea className="form-control" id="descripcion" name="descripcion" onChange={handleChange}></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="metrosCuadrados" className="form-label">
            Metros Cuadrados
          </label>
          <input type="number" className="form-control" id="metrosCuadrados" name="metrosCuadrados" onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="ambientes" className="form-label">
            Ambientes
          </label>
          <input type="number" className="form-control" id="ambientes" name="ambientes" onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="valor" className="form-label">
            Valor
          </label>
          <input type="number" className="form-control" id="valor" name="valor" onChange={handleChange} />
        </div>
        <button type="button" className="btn btn-primary" onClick={submitHandler}>
          Publicar
        </button>
      </form>
    </div>
  );
};

export default PublicarPropiedad;