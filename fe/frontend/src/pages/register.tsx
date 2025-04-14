import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Register: React.FC = () => {
  const [kullaniciAdi, setKullaniciAdi] = useState("");
  const [sifre, setSifre] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5047/api/Auth/register",
        {
          kullaniciAdi,
          sifre,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      login(response.data.token);
      setError(null);
      navigate("/");
    } catch (error) {
      setError(
        "Kayıt başarısız! Lütfen kullanıcı adı ve şifrenizi kontrol edin."
      );
    }
  };

  return (
    <div className="container mt-5">
      <h2>Kayıt Ol</h2>
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label htmlFor="kullaniciAdi">Kullanıcı Adı</label>
          <input
            type="text"
            className="form-control"
            id="kullaniciAdi"
            value={kullaniciAdi}
            onChange={(e) => setKullaniciAdi(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="sifre">Şifre</label>
          <input
            type="password"
            className="form-control"
            id="sifre"
            value={sifre}
            onChange={(e) => setSifre(e.target.value)}
            required
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-primary">
          Kayıt Ol
        </button>
      </form>
    </div>
  );
};

export default Register;
