import { Link } from 'react-router-dom';
import './header.scss';
import { usePosts } from '../../hooks/use.posts';

export function Header() {
  const { loggedUser, logout } = usePosts();

  return (
    <header className="header">
      <Link to="/" className="header__logo-link">
        <div className="header__desktop-logo">
          <img
            src="\logo.jpg"
            alt="Cleverpy Logo"
            className="header__logo-image"
            width={167}
            height={39}
          />
        </div>
      </Link>

      {loggedUser ? (
        <div className="header__logged-user">
          <p className="header__welcome">
            Welcome, <span className="header__name">{loggedUser}</span>
          </p>
          <Link to="/" className="header__login-link">
            <button onClick={logout} className="header__button">
              Logout
            </button>
          </Link>
        </div>
      ) : (
        <div className="header__login-buttons">
          <Link to="/register" className="header__login-link">
            <button className="header__button">Register</button>
          </Link>
          <Link to="/login" className="header__login-link">
            <button className="header__button">Login</button>
          </Link>
        </div>
      )}
    </header>
  );
}
