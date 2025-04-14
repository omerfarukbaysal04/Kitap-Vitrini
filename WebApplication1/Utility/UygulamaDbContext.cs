using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Models;

namespace WebApplication1.Utility

{//veritabanı ile bağlantı
    public class UygulamaDbContext : IdentityDbContext
    {
        public UygulamaDbContext(DbContextOptions<UygulamaDbContext> options) : base(options) { }
        public DbSet<KitapTuru> KitapTurleri { get; set; } //kitap türleri tablosu oluşturduk.
        public DbSet<Kitap> Kitaplar { get; set; } //kitaplar tablosu oluşturuldu.
        public DbSet<Yorum> Yorumlar { get; set; } //yorumlar tablosu oluşturuldu.
        public DbSet<Kullanici> Kullanicilar { get; set; }



    }


}