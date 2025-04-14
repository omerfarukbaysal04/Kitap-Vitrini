using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Models;
using WebApplication1.Utility;

namespace WebApplication1.Repositories
{
    public class KitapRepository : IKitapRepository
    {
        private readonly UygulamaDbContext _context;

        public KitapRepository(UygulamaDbContext context)
        {
            _context = context;
        }

        public IEnumerable<Kitap> GetAll(string? includeProperties = null)
        {
            IQueryable<Kitap> query = _context.Kitaplar;
            if (includeProperties != null)
            {
                foreach (var includeProperty in includeProperties.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
                {
                    query = query.Include(includeProperty);
                }
            }
            return query.AsNoTracking().ToList();
        }

        public Kitap Get(Expression<Func<Kitap, bool>> filter, string? includeProperties = null)
        {
            IQueryable<Kitap> query = _context.Kitaplar;
            if (includeProperties != null)
            {
                foreach (var includeProperty in includeProperties.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
                {
                    query = query.Include(includeProperty);
                }
            }
            return query.AsNoTracking().SingleOrDefault(filter);
        }

        public void Ekle(Kitap entity)
        {
            _context.Kitaplar.Add(entity);
        }

        public void Guncelle(Kitap kitap)
        {
            var mevcutKitap = _context.Kitaplar.FirstOrDefault(k => k.Id == kitap.Id);
            if (mevcutKitap != null)
            {
                mevcutKitap.KitapAdi = kitap.KitapAdi;
                mevcutKitap.Tanim = kitap.Tanim;
                mevcutKitap.Yazar = kitap.Yazar;
                mevcutKitap.Fiyat = kitap.Fiyat;
                mevcutKitap.KitapTürüId = kitap.KitapTürüId;
                mevcutKitap.ResimUrl = kitap.ResimUrl;

                _context.Update(mevcutKitap);
            }
        }

        public void Sil(Kitap entity)
        {
            _context.Kitaplar.Remove(entity);
        }

        public void Kaydet()
        {
            _context.SaveChanges();
        }

        public IEnumerable<Kitap> GetAll(Func<Kitap, bool> predicate)
        {
            throw new NotImplementedException();
        }
    }
}