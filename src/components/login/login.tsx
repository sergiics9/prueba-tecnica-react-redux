import { ChangeEvent, SyntheticEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Header } from '../header/header';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../redux/posts.slice';

import './login.scss';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Define un estado para almacenar los datos del formulario
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  // Define un estado para almacenar el mensaje de error
  const [loginError, setLoginError] = useState(false);

  // Define un manejador para el cambio de los datos del formulario
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    // Actualiza el estado con los datos del formulario
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Define un manejador para el envío del formulario de inicio de sesión con credenciales válidas o inválidas
  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    // Obtiene los usuarios registrados del localStorage
    const registeredUsersString = localStorage.getItem('registeredUsers');
    const registeredUsers = registeredUsersString
      ? JSON.parse(registeredUsersString)
      : [];

    // Busca el usuario en el array de usuarios registrados con las credenciales ingresadas
    const user = registeredUsers.find(
      (user: { username: string; password: string }) =>
        user.username === formData.username &&
        user.password === formData.password,
    );

    // Si el usuario existe, almacena el username en el estado y navega a la página principal
    if (user) {
      // Credenciales válidas
      dispatch(loginSuccess(formData.username));
      navigate('/');
      console.log('Inicio de sesión exitoso');
    } else {
      // Credenciales inválidas
      console.log('Inicio de sesión fallido');
      setLoginError(true);
    }

    // Limpia el formulario después de enviarlo
    setFormData({
      username: '',
      password: '',
    });
  };

  return (
    <>
      <Header />
      <h2 className="login__form__label">Login</h2>

      <form className="login__form" onSubmit={handleSubmit}>
        <label htmlFor="username" className="login__form__label">
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          className="login__form__input"
        />

        <label htmlFor="password" className="login__form__label">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          className="login__form__input"
        />

        <button type="submit" className="login__form__button">
          Login
        </button>
      </form>

      {/* Mostrar mensaje de error si las credenciales son inválidas */}
      {loginError && (
        <p className="login__form__error-message">
          Invalid username or password.
        </p>
      )}

      {/* Enlace para ir a la página de registro */}
      <Link to="/register" className="login__create-acc">
        <p className="login__create-acc">Don't have an account? Register</p>
      </Link>
    </>
  );
}
