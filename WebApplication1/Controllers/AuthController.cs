using Microsoft.AspNetCore.Mvc;
using WebApplication1.Models;
using WebApplication1.Repositories;
using WebApplication1.Services;
using BCrypt.Net;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IKullaniciRepository _kullaniciRepository;
        private readonly JwtTokenService _jwtTokenService;

        public AuthController(IKullaniciRepository kullaniciRepository, JwtTokenService jwtTokenService)
        {
            _kullaniciRepository = kullaniciRepository;
            _jwtTokenService = jwtTokenService;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginModel model)
        {
            var kullanici = _kullaniciRepository.GetKullaniciByUsername(model.KullaniciAdi);
            if (kullanici != null && BCrypt.Net.BCrypt.Verify(model.Sifre, kullanici.Sifre))
            {
                var token = _jwtTokenService.GenerateToken(kullanici.Id.ToString(), kullanici.KullaniciAdi, kullanici.Rol);
                return Ok(new { Token = token });
            }

            return Unauthorized();
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] RegisterModel model)
        {
            if (_kullaniciRepository.GetKullaniciByUsername(model.KullaniciAdi) != null)
            {
                return BadRequest("Kullanıcı zaten mevcut.");
            }

            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(model.Sifre);

            var yeniKullanici = new Kullanici
            {
                KullaniciAdi = model.KullaniciAdi,
                Sifre = hashedPassword,
                Rol = "User"
            };

            _kullaniciRepository.Ekle(yeniKullanici);
            _kullaniciRepository.Kaydet();

            return Ok("Kayıt başarılı.");
        }
    }

    public class RegisterModel
    {
        public string KullaniciAdi { get; set; }
        public string Sifre { get; set; }
    }

    public class LoginModel
    {
        public string KullaniciAdi { get; set; }
        public string Sifre { get; set; }
    }
}