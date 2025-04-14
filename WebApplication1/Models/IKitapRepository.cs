using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using WebApplication1.Models;

namespace WebApplication1.Repositories
{
    public interface IKitapRepository
    {
        IEnumerable<Kitap> GetAll(string? includeProperties = null);
        Kitap Get(Expression<Func<Kitap, bool>> filter, string? includeProperties = null);
        void Ekle(Kitap entity);
        void Guncelle(Kitap kitap);
        void Sil(Kitap entity);
        void Kaydet();
    }
}
