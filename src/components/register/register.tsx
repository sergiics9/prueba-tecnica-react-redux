import { ChangeEvent, SyntheticEvent, useState } from 'react';
import { Header } from '../header/header';
import { Link, useNavigate } from 'react-router-dom';

import './register.scss';

export default function Register() {
  const navigate = useNavigate();
  // Define un estado para almacenar los datos del formulario
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    // Actualiza el estado con los datos del formulario
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    // Guarda los datos del formulario en localStorage
    const registeredUsers = JSON.parse(
      localStorage.getItem('registeredUsers') || '[]',
    );
    registeredUsers.push(formData);
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
    // Limpia el formulario después de enviarlo
    setFormData({
      username: '',
      email: '',
      password: '',
    });
    navigate('/login');
  };

  return (
    <>
      <Header />
      <h2 className="register__form__label">Register</h2>

      <form className="register__form" onSubmit={handleSubmit}>
        <label htmlFor="username" className="register__form__label">
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          className="register__form__input"
        />

        <label htmlFor="email" className="register__form__label">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="register__form__input"
        />

        <label htmlFor="password" className="register__form__label">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          className="register__form__input"
        />

        <button type="submit" className="register__form__button">
          Register
        </button>
      </form>
      <Link to="/login" className="register__already-have-acc">
        <p className="register__already-have-acc">
          Already have an account? Login
        </p>
      </Link>
    </>
  );
}
