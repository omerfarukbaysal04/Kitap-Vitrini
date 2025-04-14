using WebApplication1.Models;
using WebApplication1.Utility;

namespace WebApplication1.Repositories
{
    public class KullaniciRepository : IKullaniciRepository
    {
        private readonly UygulamaDbContext _context;

        public KullaniciRepository(UygulamaDbContext context)
        {
            _context = context;
        }

        public Kullanici GetKullaniciByUsername(string kullaniciAdi)
        {
            return _context.Kullanicilar.SingleOrDefault(k => k.KullaniciAdi == kullaniciAdi);
        }

        public void Ekle(Kullanici kullanici)
        {
            _context.Kullanicilar.Add(kullanici);
        }

        public void Kaydet()
        {
            _context.SaveChanges();
        }

        public Kullanici GetKullanici(string kullaniciAdi, string sifre)
        {
            throw new NotImplementedException();
        }
    }
}