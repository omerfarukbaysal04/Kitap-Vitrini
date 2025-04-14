using System.Collections.Generic;
using WebApplication1.Models;

namespace WebApplication1.Repositories
{
    public interface IYorumRepository
    {
        IEnumerable<Yorum> GetAll();
        Yorum GetById(int id);
        void Ekle(Yorum yorum);
        void Guncelle(Yorum yorum);
        void Sil(Yorum yorum);
        void Kaydet();
    }
}