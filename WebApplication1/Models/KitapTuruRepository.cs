using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Utility;

namespace WebApplication1.Models
{
    public class KitapTuruRepository : IKitapTuruRepository
    {
        private readonly UygulamaDbContext _context;

        public KitapTuruRepository(UygulamaDbContext context)
        {
            _context = context;
        }

        public IEnumerable<KitapTuru> GetAll(string? includeProperties = null)
        {
            return _context.KitapTurleri.AsNoTracking().ToList();
        }

        public KitapTuru Get(Expression<Func<KitapTuru, bool>> filter, string? includeProperties = null)
        {
            return _context.KitapTurleri.AsNoTracking().SingleOrDefault(filter);
        }

        public void Ekle(KitapTuru entity)
        {

        }

        public void Guncelle(KitapTuru entity)
        {

        }

        public void Sil(KitapTuru entity)
        {

        }

        public void Kaydet()
        {

        }
    }
}