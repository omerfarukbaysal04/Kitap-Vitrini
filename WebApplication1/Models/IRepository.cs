using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace WebApplication1.Models
{
    public interface IRepository<T> where T : class
    {
        IEnumerable<T> GetAll(string? includeProperties = null);
        T Get(Expression<Func<T, bool>> filter, string? includeProperties = null);
        void Ekle(T entity);
        void Guncelle(T entity);
        void Sil(T entity);
        void Kaydet();
    }
}