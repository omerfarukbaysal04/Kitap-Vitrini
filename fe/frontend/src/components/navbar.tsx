import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const handleLogoutClick = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark  fixed-top"
      style={{ backgroundColor: "#007BFF" }}
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Kitap Vitrini
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Ana Sayfa
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/bookcategory">
                Kitap Kategorileri
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/booklist">
                Kitaplar
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                İletişim
              </Link>
            </li>
          </ul>
          <div className="d-flex ms-auto">
            {isAuthenticated ? (
              <button
                className="btn btn-light me-2"
                onClick={handleLogoutClick}
              >
                Çıkış Yap
              </button>
            ) : (
              <>
                <button
                  className="btn btn-light me-2"
                  onClick={handleLoginClick}
                >
                  Giriş Yap
                </button>
                <button
                  className="btn btn-outline-light"
                  onClick={handleRegisterClick}
                >
                  Kayıt Ol
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
