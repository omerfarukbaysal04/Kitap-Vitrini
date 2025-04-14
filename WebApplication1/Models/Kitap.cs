
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;

namespace WebApplication1.Models
{
    public class Kitap
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string KitapAdi { get; set; }
        public string Tanim { get; set; }
        [Required]
        public string Yazar { get; set; }
        [Required]
        [Range(10, 5000)]
        public double Fiyat { get; set; }
        [ValidateNever]
        public int KitapTürüId { get; set; }
        [ForeignKey("KitapTürüId")]
        [ValidateNever]
        public KitapTuru KitapTuru { get; set; }
        [ValidateNever]
        public string ResimUrl { get; set; }

    }
}