import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { http } from "../http";

const Login: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    try {
      const response = await http.post("/Auth/login", data);
      login(response.data.token);
      setError(null);
      navigate("/");
    } catch (error) {
      setError(
        "Giriş başarısız! Lütfen kullanıcı adı ve şifrenizi kontrol edin."
      );
    }
  };

  return (
    <div className="container mt-5">
      <h2>Giriş Yap</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="kullaniciAdi">Kullanıcı Adı</label>
          <input
            type="text"
            className="form-control"
            name="kullaniciAdi"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="sifre">Şifre</label>
          <input
            type="password"
            className="form-control"
            name="sifre"
            required
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-primary">
          Giriş Yap
        </button>
      </form>
    </div>
  );
};

export default Login;
