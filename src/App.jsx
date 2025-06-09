import React, { useState } from 'react';


function RegistrationForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    password: '',
    specialization: '',
    experience: '',
    description: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Il nome completo è obbligatorio';
    if (!formData.username.trim()) newErrors.username = "L'username è obbligatorio";
    if (!formData.password.trim()) newErrors.password = 'La password è obbligatoria';
    if (!formData.specialization) newErrors.specialization = 'Seleziona una specializzazione';
    if (!formData.experience) newErrors.experience = 'Gli anni di esperienza sono obbligatori';
    else if (formData.experience < 0) newErrors.experience = 'Gli anni di esperienza devono essere un numero positivo';
    if (!formData.description.trim()) newErrors.description = 'La descrizione è obbligatoria';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Dati del form:', formData);
      setFormData({
        fullName: '',
        username: '',
        password: '',
        specialization: '',
        experience: '',
        description: ''
      });
      setErrors({});
    }
  };

  return (
    <div className="registration-form-container">
      <h2>Form di Registrazione</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fullName">Nome completo:</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />
          {errors.fullName && <p className="error-message">{errors.fullName}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && <p className="error-message">{errors.username}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="specialization">Specializzazione:</label>
          <select
            id="specialization"
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
          >
            <option value="">Seleziona...</option>
            <option value="Full Stack">Full Stack</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
          </select>
          {errors.specialization && <p className="error-message">{errors.specialization}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="experience">Anni di esperienza:</label>
          <input
            type="number"
            id="experience"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
          />
          {errors.experience && <p className="error-message">{errors.experience}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="description">Descrizione:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          {errors.description && <p className="error-message">{errors.description}</p>}
        </div>

        <button type="submit" className="submit-button">
          Invia
        </button>
      </form>
    </div>
  );
}

export default RegistrationForm;