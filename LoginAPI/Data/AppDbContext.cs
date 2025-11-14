using Microsoft.EntityFrameworkCore;
using LoginAPI.Models;

namespace LoginAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Seed a test user
            // Email: test@example.com
            // Password: Test123!
            modelBuilder.Entity<User>().HasData(
                new User
                {
                    Id = 1,
                    Email = "test@example.com",
                    // This is the hashed version of "Test123!"
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("Test123!"),
                    CreatedAt = DateTime.UtcNow
                }
            );
        }
    }
}