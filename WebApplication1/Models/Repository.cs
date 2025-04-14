using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Utility;

namespace WebApplication1.Models
{
    public class Repository<T> : IRepository<T> where T : class
    {
        private readonly UygulamaDbContext _context;
        private readonly DbSet<T> _dbSet;

        public Repository(UygulamaDbContext context)
        {
            _context = context;
            _dbSet = _context.Set<T>();
        }

        public IEnumerable<T> GetAll(string? includeProperties = null)
        {
            IQueryable<T> query = _dbSet;
            if (includeProperties != null)
            {
                foreach (var includeProperty in includeProperties.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
                {
                    query = query.Include(includeProperty);
                }
            }
            return query.AsNoTracking().ToList();
        }

        public T Get(Expression<Func<T, bool>> filter, string? includeProperties = null)
        {
            IQueryable<T> query = _dbSet;
            if (includeProperties != null)
            {
                foreach (var includeProperty in includeProperties.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
                {
                    query = query.Include(includeProperty);
                }
            }
            return query.AsNoTracking().SingleOrDefault(filter);
        }

        public void Ekle(T entity)
        {
            // Bu metod boş bırakılacak
        }

        public void Guncelle(T entity)
        {
            // Bu metod boş bırakılacak
        }

        public void Sil(T entity)
        {
            // Bu metod boş bırakılacak
        }

        public void Kaydet()
        {
            // Bu metod boş bırakılacak
        }
    }
}