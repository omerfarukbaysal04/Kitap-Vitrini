using Microsoft.AspNetCore.Mvc;
using WebApplication1.Models;
using WebApplication1.Repositories;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class YorumController : ControllerBase
    {
        private readonly IYorumRepository _yorumRepository;

        public YorumController(IYorumRepository yorumRepository)
        {
            _yorumRepository = yorumRepository;
        }

        // GET: api/Yorum
        [HttpGet]
        public IActionResult GetAll()
        {
            var yorumlar = _yorumRepository.GetAll();
            return Ok(yorumlar); // JSON formatında tüm yorumları döner
        }

        // POST: api/Yorum
        [HttpPost]
        public IActionResult Create([FromBody] Yorum yorum)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _yorumRepository.Ekle(yorum);
            _yorumRepository.Kaydet();

            return CreatedAtAction(nameof(GetById), new { id = yorum.Id }, yorum);
        }

        // GET: api/Yorum/{id}
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var yorum = _yorumRepository.GetById(id);
            if (yorum == null)
            {
                return NotFound();
            }
            return Ok(yorum);
        }
    }
}
