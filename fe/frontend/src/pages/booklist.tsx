import React, { useState, useEffect } from "react";
import axios from "axios";
import "./booklist.css";
import { Book } from "../types";

const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:5047/api/Kitap")
      .then((response) => {
        setBooks(response.data);
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
    <div className="container mt-5">
      <h1>İstediğin kitabı seç ve daha detaylı bilgilere eriş!</h1>
      <div className="row">
        {books.map((book) => (
          <div
            onClick={() => location.replace(`/booklist/${book.id}`)}
            className="col-md-4 mb-4"
            key={book.id}
          >
            <div className="card h-100 hover-card">
              <img
                src={`http://localhost:5047/${book.resimUrl}`}
                alt="Kitap Resmi"
                style={{
                  borderTopLeftRadius: "15px",
                  borderTopRightRadius: "15px",
                }}
              />
              <div className="card-body">
                <h5 className="card-title" style={{ color: "#007bff" }}>
                  {book.kitapAdi}
                </h5>
              </div>
              <div
                className="card-footer"
                style={{
                  backgroundColor: "#f7f7f7",
                  borderBottomLeftRadius: "15px",
                  borderBottomRightRadius: "15px",
                }}
              >
                <p className="card-text">
                  <strong>Yazar:</strong> {book.yazar}
                </p>
                <p className="card-text">
                  <strong>Fiyat:</strong> {book.fiyat}₺
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;
