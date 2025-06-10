import React, { useMemo, useState } from 'react';

const letters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()-_=+[]{}|;:'\\,.<>?/`~";

function RegistrationForm() {
  const [fullName, setFullName] = useState('riccardi');
  const [username, setUsername] = useState('vfhbvjfhbdvjbdf');
  const [password, setPassword] = useState('kjbvkddkf?ò9');
  const [description, setDescription] = useState(''); 
  const [specialization, setSpecialization] = useState('');
  const [experience, setExperience] = useState(1);
  const [errors, setErrors] = useState({});


  const isUsernameValid = useMemo(() => {
    const caratteriValidi = username.split("").every(char =>letters.includes(char.toLowerCase()) || numbers.includes(char))
    return caratteriValidi && username.trim().length >= 6;

  },[username])

  const isPasswordValid = useMemo(() => {
    return(
      password.trim().length >= 8 &&
      password.split("").some(char => letters.includes(char)) &&
      password.split("").some(char => numbers.includes(char)) &&
      password.split("").some(char => symbols.includes(char)) 
    )

  },[password])

  const isDescriptionValid = useMemo(() => {
    return description.trim().length >= 100 && description.trim() < 1000
  },[description])

  const handleFullNameChange = (e) => setFullName(e.target.value);
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleSpecializationChange = (e) => setSpecialization(e.target.value);
  const handleExperienceChange = (e) => setExperience(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);

  const validateForm = () => {
    const newErrors = {};
    if (!fullName.trim()) newErrors.fullName = 'Il nome completo è obbligatorio';
    if (!username.trim()) newErrors.username = 'Lo username è obbligatorio';
    if (!password.trim()) newErrors.password = 'La password è obbligatoria';
    if (!specialization) newErrors.specialization = 'Seleziona una specializzazione';
    if (!experience || experience <= 0) newErrors.experience = 'Inserisci un numero di anni valido (maggiore di 0)';
    if (!description.trim()) newErrors.description = 'La descrizione è obbligatoria';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const formData = { fullName, username, password, specialization, experience, description };
      console.log('Dati del form:', formData);
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label" htmlFor="fullName">Nome completo:</label>
        <input
          className="form-input"
          type="text"
          id="fullName"
          value={fullName}
          onChange={handleFullNameChange}
        />
        {errors.fullName && <span className="form-error">{errors.fullName}</span>}
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="username">Username:</label>
        <input
          className="form-input"
          type="text"
          id="username"
          value={username}
          onChange={handleUsernameChange}
        />
        {username.trim() && (
          <p style={{color: isUsernameValid ? 'green' : 'red'}}>{isUsernameValid ? "username valido" : "deve avere almeno 6 caratteri"}</p>
        )}
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="password">Password:</label>
        <input
          className="form-input"
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
        {password.trim() && (
          <p style={{color: isPasswordValid ? 'green' : 'red'}}>{isPasswordValid ? "password valida" : "deve avere almeno 8 caratteri: lettera numero simbolo "}</p>
        )}
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="specialization">Specializzazione:</label>
        <select
          className="form-select"
          id="specialization"
          value={specialization}
          onChange={handleSpecializationChange}
        >
          <option value="">Seleziona...</option>
          <option value="Full Stack">Full Stack</option>
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
        </select>
        {errors.specialization && <span className="form-error">{errors.specialization}</span>}
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="experience">Anni di esperienza:</label>
        <input
          className="form-input"
          type="number"
          id="experience"
          value={experience}
          onChange={handleExperienceChange}
        />
        {errors.experience && <span className="form-error">{errors.experience}</span>}
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="description">Descrizione:</label>
        <textarea
          className="form-textarea"
          id="description"
          value={description}
          onChange={handleDescriptionChange}
        />
        {description.trim() && (
          <p style={{color: isDescriptionValid ? 'green' : 'red'}}>{isDescriptionValid ? "descrizione valida" : `deve avere almeno 100 caratteri ${description.trim().length}`}</p>
        )}
      </div>

      <button className="form-button" type="submit">Invia</button>
    </form>
  );
}

export default RegistrationForm;