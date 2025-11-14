using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LoginAPI.Data;
using LoginAPI.Models;
using LoginAPI.Services;

namespace LoginAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly TokenService _tokenService;
        private readonly ILogger<AuthController> _logger;

        public AuthController(AppDbContext context, TokenService tokenService, ILogger<AuthController> logger)
        {
            _context = context;
            _tokenService = tokenService;
            _logger = logger;
        }

        [HttpPost("login")]
        public async Task<ActionResult<LoginResponse>> Login([FromBody] LoginRequest request)
        {
            try
            {
                // Validate input
                if (!ModelState.IsValid)
                {
                    return BadRequest(new LoginResponse
                    {
                        Success = false,
                        Message = "Invalid input data"
                    });
                }

                // Find user by email
                var user = await _context.Users
                    .FirstOrDefaultAsync(u => u.Email.ToLower() == request.Email.ToLower());

                if (user == null)
                {
                    return Unauthorized(new LoginResponse
                    {
                        Success = false,
                        Message = "Invalid email or password"
                    });
                }

                // Verify password
                bool isPasswordValid = BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash);

                if (!isPasswordValid)
                {
                    return Unauthorized(new LoginResponse
                    {
                        Success = false,
                        Message = "Invalid email or password"
                    });
                }

                // Generate JWT token
                var token = _tokenService.GenerateToken(user);

                return Ok(new LoginResponse
                {
                    Success = true,
                    Message = "Login successful",
                    Token = token,
                    Email = user.Email
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error during login");
                return StatusCode(500, new LoginResponse
                {
                    Success = false,
                    Message = "An error occurred during login"
                });
            }
        }

        [HttpGet("health")]
        public IActionResult Health()
        {
            return Ok(new { status = "API is running", timestamp = DateTime.UtcNow });
        }
    }
}