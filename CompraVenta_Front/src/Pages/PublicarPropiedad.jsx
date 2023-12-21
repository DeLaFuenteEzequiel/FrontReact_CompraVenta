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
  const [mensajeExito, setMensajeExito] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const limpiarFormulario = () => {
    setFormData({
      titulo: '',
      descripcion: '',
      metrosCuadrados: '',
      ambientes: '',
      valor: '',
      registro: userInfo && userInfo.registro !== 0 ? userInfo.registro : (userInfo ? userInfo.dni : ''),
    });
  };

  const submitHandler = async () => {
    // Validaciones
    if (
      !formData.titulo ||
      !formData.descripcion ||
      formData.metrosCuadrados <= 0 ||
      formData.ambientes <= 0 ||
      formData.ambientes > 12 ||
      formData.valor <= 0
    ) {
      alert('Por favor, complete todos los campos y asegúrese de ingresar valores válidos.');
      return;
    }

    try {
      const registro = userInfo && userInfo.registro !== 0 ? userInfo.registro : (userInfo ? userInfo.dni : '');
      await publicarPropiedad({ ...formData, registro });
      console.log('Propiedad publicada exitosamente');
      setMensajeExito('Propiedad publicada exitosamente');
      // Limpiar el formulario después de la publicación exitosa
      limpiarFormulario();
    } catch (error) {
      console.error('Error al publicar la propiedad:', error);
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
          <input type="text" className="form-control" id="titulo" name="titulo" value={formData.titulo} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="descripcion" className="form-label">
            Descripción
          </label>
          <textarea className="form-control" id="descripcion" name="descripcion" value={formData.descripcion} onChange={handleChange}></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="metrosCuadrados" className="form-label">
            Metros Cuadrados
          </label>
          <input
            type="number"
            className="form-control"
            id="metrosCuadrados"
            name="metrosCuadrados"
            value={formData.metrosCuadrados}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="ambientes" className="form-label">
            Ambientes
          </label>
          <input type="number" className="form-control" id="ambientes" name="ambientes" value={formData.ambientes} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="valor" className="form-label">
            Valor
          </label>
          <input type="number" className="form-control" id="valor" name="valor" value={formData.valor} onChange={handleChange} />
        </div>
        <button type="button" className="btn btn-primary" onClick={submitHandler}>
          Publicar
        </button>
      </form>

      {/* Mostrar el mensaje de éxito */}
      {mensajeExito && (
        <div className="mt-3 alert alert-success">
          {mensajeExito}
        </div>
      )}
    </div>
  );
};

export default PublicarPropiedad;
