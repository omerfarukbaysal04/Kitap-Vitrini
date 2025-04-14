import React, { useState, useEffect } from "react";
import axios from "axios";

interface Comment {
  id: number;
  yorumcuAdi: string;
  yorumIcerik: string;
}

const CommentList: React.FC = () => {
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
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h3 className="text-center mb-4">Kullanıcı Yorumları</h3>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div className="card mb-3" key={comment.id}>
                <div className="card-body">
                  <h5 className="card-title">{comment.yorumcuAdi}</h5>
                  <p className="card-text">{comment.yorumIcerik}</p>
                </div>
              </div>
            ))
          ) : (
            <p>Henüz yorum bulunamadı.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentList;
