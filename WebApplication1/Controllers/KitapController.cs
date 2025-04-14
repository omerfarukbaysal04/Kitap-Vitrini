using Microsoft.AspNetCore.Mvc;
using WebApplication1.Models;
using WebApplication1.Repositories;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KitapController : ControllerBase
    {
        private readonly IKitapRepository _kitapRepository;

        public KitapController(IKitapRepository kitapRepository)
        {
            _kitapRepository = kitapRepository;
        }

        // GET: api/Kitap
        [HttpGet]
        public IActionResult GetAll()
        {
            var kitaplar = _kitapRepository.GetAll().ToList();
            return Ok(kitaplar); // JSON formatında tüm kitapları döner
        }

        // GET: api/Kitap/{id}
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var kitap = _kitapRepository.Get(k => k.Id == id);
            if (kitap == null)
            {
                return NotFound();
            }
            return Ok(kitap);
        }

        // GET: api/Kitap/Kategori/{kategoriId}
        [HttpGet("Kategori/{kategoriId}")]
        public IActionResult GetByKategoriId(int kategoriId)
        {
            var kitaplar = _kitapRepository.GetAll().Where(k => k.KitapTürüId == kategoriId).ToList();
            if (!kitaplar.Any())
            {
                return NotFound(new { message = "Bu kategoriye ait kitap bulunamadı!" });
            }
            return Ok(kitaplar);
        }
    }
}
