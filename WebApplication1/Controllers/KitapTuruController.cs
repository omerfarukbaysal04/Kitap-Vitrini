using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Models;
using WebApplication1.Utility;


namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KitapTuruController : ControllerBase
    {
        private readonly IKitapTuruRepository _kitapTuruRepository;

        public KitapTuruController(IKitapTuruRepository kitapTuruRepository)
        {
            _kitapTuruRepository = kitapTuruRepository;
        }

        // GET: api/KitapTuru
        [HttpGet]
        public IActionResult GetAll()
        {
            var kitapTurleri = _kitapTuruRepository.GetAll().AsQueryable().AsNoTracking().ToList();
            return Ok(kitapTurleri); // JSON formatında tüm kitap türlerini döner
        }

        // GET: api/KitapTuru/{id}
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var kitapTuru = _kitapTuruRepository.Get(u => u.Id == id);
            if (kitapTuru == null)
            {
                return NotFound();
            }
            return Ok(kitapTuru); // JSON formatında tek bir kitap türü döner
        }
    }
}