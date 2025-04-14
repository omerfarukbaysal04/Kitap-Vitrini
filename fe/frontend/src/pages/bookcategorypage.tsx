import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./bookcategorypage.css";

interface BookCategory {
  id: number;
  ad: string;
}

interface Book {
  id: number;
  kitapAdi: string;
  tanim: string;
  yazar: string;
  fiyat: number;
  resimUrl: string;
}

const BookCategoryPage: React.FC = () => {
  const [categories, setCategories] = useState<BookCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5047/api/KitapTuru")
      .then((response) => {
        setCategories(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Veri çekilirken bir hata oluştu!", error);
        setError("Veri çekilirken bir hata oluştu.");
        setLoading(false);
      });
  }, []);

  const fetchBooksByCategory = async (categoryId: number) => {
    try {
      const response = await axios.get(
        `http://localhost:5047/api/Kitap/Kategori/${categoryId}`
      );
      setBooks(response.data);
      console.log("Fetched books:", response.data);
    } catch (error) {
      console.error("Kitaplar alınırken bir hata oluştu!", error);
      setBooks([]);
    }
  };

  const handleCategoryClick = (categoryId: number) => {
    setSelectedCategory(categoryId);
    fetchBooksByCategory(categoryId);
  };

  const handleBookClick = (bookId: number) => {
    // Kitap detay sayfasına yönlendirme
    navigate(`/booklist/${bookId}`);
  };

  if (loading) {
    return <div>Yükleniyor...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mt-5" style={{ marginTop: "70px" }}>
      <div className="row">
        {/* Soldaki kategori navbar */}
        <div
          className="col-md-3"
          style={{
            position: "fixed",
            left: "0",
            top: "55px",
            height: "calc(100vh - 70px)",
            overflowY: "auto",
            backgroundColor: "#f7f7f7",
            padding: "20px",
          }}
        >
          <h2>Kategoriler</h2>
          <div className="list-group">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`list-group-item list-group-item-action ${
                  selectedCategory === category.id ? "active" : ""
                }`}
                onClick={() => handleCategoryClick(category.id)}
              >
                {category.ad}
              </button>
            ))}
          </div>
        </div>

        {/* Sağdaki içerik */}
        <div className="col-md-9 offset-md-3" style={{ marginTop: "0px" }}>
          {selectedCategory ? (
            <div>
              <h2>
                Seçilen Kategori:{" "}
                {categories.find((cat) => cat.id === selectedCategory)?.ad}
              </h2>
              {books.length > 0 ? (
                <div className="row">
                  {books.map((book) => (
                    <div
                      className="col-md-4 mb-4 card h-100 hover-card"
                      key={book.id}
                      style={{ cursor: "pointer" }}
                      onClick={() => handleBookClick(book.id)}
                    >
                      <div className="card h-100">
                        <img
                          src={`http://localhost:5047/${book.resimUrl}`}
                          alt="Kitap Resmi"
                          style={{
                            borderTopLeftRadius: "15px",
                            borderTopRightRadius: "15px",
                          }}
                        />
                        <div className="card-body">
                          <h5
                            className="card-title"
                            style={{ color: "#007bff" }}
                          >
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
              ) : (
                <p>Bu kategoriye ait kitap bulunamadı.</p>
              )}
            </div>
          ) : (
            <div>
              <h2>Kategori Seçin</h2>
              <p>Bir kategori seçerek kitapları görüntüleyin.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookCategoryPage;
