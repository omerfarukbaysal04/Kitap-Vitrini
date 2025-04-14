using WebApplication1.Models;

namespace WebApplication1.Repositories
{
    public interface IKullaniciRepository
    {
        Kullanici GetKullaniciByUsername(string kullaniciAdi);
        void Ekle(Kullanici kullanici);
        void Kaydet();
    }
}