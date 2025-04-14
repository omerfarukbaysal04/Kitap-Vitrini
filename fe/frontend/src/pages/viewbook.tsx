import { useParams } from "react-router-dom";
import useSWR from "swr";
import { Book } from "../types";

export default function Viewbook() {
  const { bookId } = useParams();
  const { data: book, error } = useSWR<Book>(`/Kitap/${bookId}`);
  if (error) return <div>Hata oluştu!</div>;
  if (!book) return <div>Yükleniyor...</div>;
  return (
    <div
      className="mt-6 container"
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        height: "110vh",
        padding: "20px",
        backgroundColor: "#f5f5f5",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <img
        src={`http://localhost:5047/${book.resimUrl}`}
        alt={book.kitapAdi}
        style={{
          width: "300px",
          height: "auto",
          borderRadius: "10px",
          marginRight: "20px",
          marginTop: "80px",
        }}
      />
      <div style={{ flex: 1 }}>
        <h1
          style={{
            fontSize: "3.1rem",
            fontWeight: "bold",
            //marginBottom: "40px",
            marginTop: "20px",
          }}
        >
          {book.kitapAdi}
        </h1>
        <p
          style={{
            fontSize: "1.0rem",
            lineHeight: "1.6",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          {book.tanim}
        </p>
        <div style={{ fontSize: "1rem", color: "#555" }}>
          <p>
            <strong>Yazar:</strong> {book.yazar}
          </p>
          <p>
            <strong>Fiyat:</strong> {book.fiyat} TL
          </p>
        </div>
      </div>
    </div>
  );
}
