using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace WebApplication1

{//veritabanı sınıf
    public class KitapTuru
    {
        [Key]  //primary key
        public int Id { get; set; }
        [Required(ErrorMessage = "Kitap Tür Adı boş bırakılamaz!")]
        [MaxLength(25)]
        [DisplayName("Kitap Türü Adı")]
        public string Ad { get; set; }

    }
}