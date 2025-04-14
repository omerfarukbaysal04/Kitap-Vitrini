import React, { useState, useEffect } from "react";
import axios from "axios";
import "./home.css";

interface Comment {
  id: number;
  yorumcuAdi: string;
  yorumIcerik: string;
}

const Home: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:5047/api/Yorum")
      .then((response) => {
        console.log(response.data);
        if (Array.isArray(response.data)) {
          setComments(response.data);
        } else {
          setError("Beklenmeyen veri formatı alındı.");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Veri çekilirken bir hata oluştu!", error);
        setError("Veri çekilirken bir hata oluştu.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Yükleniyor...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mt-5 text-center">
      <h1 style={{ color: "#007bff" }} className="display-4"></h1>
      <p style={{ color: "black" }} className="lead mt-4">
        Kitap Vitrini, kitap severler için keyifli ve kolay erşilebilen
        platformdur.
        <br />
        Bu site, kullanıcıların çeşitli kategorideki kitaplar hakkında özetlere
        ve ortalama fiyat bilgisinin görülebilmesini sağlar.
      </p>

      <div className="row mt-5">
        <div className="col-md-4">
          <div className="card shadow hover-card">
            <div className="card-body">
              <h3 className="card-title" style={{ color: "#007bff" }}>
                Kitaplar
              </h3>
              <p className="card-text">
                En popüler kitapları keşfedin ve favorilerinizi bulun.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow hover-card">
            <div className="card-body">
              <h3 className="card-title" style={{ color: "#007bff" }}>
                Özetler
              </h3>
              <p className="card-text">
                Kitap özetlerini okuyarak o kitap hakkında bilgi edinin.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow hover-card">
            <div className="card-body">
              <h3 className="card-title" style={{ color: "#007bff" }}>
                Kategorize
              </h3>
              <p className="card-text">
                Kategorilerden kolay bir şekilde istediğiniz kategorideki kitaba
                erişin!
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-md-12">
          <h3 className="text-center mb-4">Kullanıcı Yorumları</h3>
          <div className="row">
            {comments.length > 0 ? (
              comments.slice(0, 3).map((comment) => (
                <div className="col-md-4 mb-3" key={comment.id}>
                  <div className="card h-100 hover-card">
                    <div className="card-body">
                      <h5 className="card-title">{comment.yorumcuAdi}</h5>
                      <p className="card-text">{comment.yorumIcerik}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>Henüz yorum bulunamadı.</p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-5">
        <h4 style={{ color: "black" }}>
          Kitap Vitrini ile kitap dünyasına adım atın, kitapları keşfedin ve
          okumayı daha kolay hale getirin!
        </h4>
      </div>
    </div>
  );
};

export default Home;
