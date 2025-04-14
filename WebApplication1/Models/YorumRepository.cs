using System.Collections.Generic;
using System.Linq;
using WebApplication1.Models;
using WebApplication1.Utility;

namespace WebApplication1.Repositories
{
    public class YorumRepository : IYorumRepository
    {
        private readonly UygulamaDbContext _context;

        public YorumRepository(UygulamaDbContext context)
        {
            _context = context;
        }

        public IEnumerable<Yorum> GetAll()
        {
            return _context.Yorumlar.ToList();
        }

        public Yorum GetById(int id)
        {
            return _context.Yorumlar.Find(id);
        }

        public void Ekle(Yorum yorum)
        {
            _context.Yorumlar.Add(yorum);
        }

        public void Guncelle(Yorum yorum)
        {
            _context.Yorumlar.Update(yorum);
        }

        public void Sil(Yorum yorum)
        {
            _context.Yorumlar.Remove(yorum);
        }

        public void Kaydet()
        {
            _context.SaveChanges();
        }
    }
}