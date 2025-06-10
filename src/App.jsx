import React, { useMemo, useRef, useState } from 'react';

const letters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()-_=+[]{}|;:'\\,.<>?/`~";

function RegistrationForm() {
  // Stati per gli input controllati
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({}); // Stato per gli errori

  // Riferimenti per gli input non controllati
  const fullNameRef = useRef();
  const specializationRef = useRef();
  const experienceRef = useRef();

  // Validazioni con useMemo
  const isUsernameValid = useMemo(() => {
    const caratteriValidi = username.split("").every(
      char => letters.includes(char.toLowerCase()) || numbers.includes(char)
    );
    return caratteriValidi && username.trim().length >= 6;
  }, [username]);

  const isPasswordValid = useMemo(() => {
    return (
      password.trim().length >= 8 &&
      password.split("").some(char => letters.includes(char)) &&
      password.split("").some(char => numbers.includes(char)) &&
      password.split("").some(char => symbols.includes(char))
    );
  }, [password]);

  const isDescriptionValid = useMemo(() => {
    return description.trim().length >= 100 && description.trim().length < 1000;
  }, [description]);

  // Handler per gli input controllati
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);

  // Funzione di validazione (esatta come la tua)
  const validateForm = () => {
    const newErrors = {};
    const fullName = fullNameRef.current?.value || '';
    if (!fullName.trim()) newErrors.fullName = 'Il nome completo è obbligatorio';
    if (!username.trim()) newErrors.username = 'Lo username è obbligatorio';
    if (!password.trim()) newErrors.password = 'La password è obbligatoria';
    const specialization = specializationRef.current?.value || '';
    if (!specialization) newErrors.specialization = 'Seleziona una specializzazione';
    const experience = experienceRef.current?.value || '';
    if (!experience || experience <= 0) newErrors.experience = 'Inserisci un numero di anni valido (maggiore di 0)';
    if (!description.trim()) newErrors.description = 'La descrizione è obbligatoria';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Gestione dell'invio del form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const formData = {
        fullName: fullNameRef.current.value,
        username,
        password,
        specialization: specializationRef.current.value,
        experience: experienceRef.current.value,
        description,
      };
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
          ref={fullNameRef}
        />
        {errors.fullName && <p style={{ color: 'red' }}>{errors.fullName}</p>}
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
          <p style={{ color: isUsernameValid ? 'green' : 'red' }}>
            {isUsernameValid ? "username valido" : "deve avere almeno 6 caratteri"}
          </p>
        )}
        {errors.username && <p style={{ color: 'red' }}>{errors.username}</p>}
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
          <p style={{ color: isPasswordValid ? 'green' : 'red' }}>
            {isPasswordValid ? "password valida" : "deve avere almeno 8 caratteri: lettera numero simbolo "}
          </p>
        )}
        {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="specialization">Specializzazione:</label>
        <select
          className="form-select"
          id="specialization"
          ref={specializationRef}
        >
          <option value="">Seleziona...</option>
          <option value="Full Stack">Full Stack</option>
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
        </select>
        {errors.specialization && <p style={{ color: 'red' }}>{errors.specialization}</p>}
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="experience">Anni di esperienza:</label>
        <input
          className="form-input"
          type="number"
          id="experience"
          ref={experienceRef}
        />
        {errors.experience && <p style={{ color: 'red' }}>{errors.experience}</p>}
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
          <p style={{ color: isDescriptionValid ? 'green' : 'red' }}>
            {isDescriptionValid ? "descrizione valida" : `deve avere almeno 100 caratteri ${description.trim().length}`}
          </p>
        )}
        {errors.description && <p style={{ color: 'red' }}>{errors.description}</p>}
      </div>

      <button className="form-button" type="submit">Invia</button>
    </form>
  );
}

export default RegistrationForm;