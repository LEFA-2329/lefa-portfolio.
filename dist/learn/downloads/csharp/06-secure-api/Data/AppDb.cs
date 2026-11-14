// Follow the numbered teaching parts in order. The full file combines every part.
using Microsoft.AspNetCore.Identity;
// Import names from this library.
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
// Import names from this library.
using Microsoft.EntityFrameworkCore;

// STUDY PART: Define AppDb
// Keep this type in this file or its own named file. Its members describe data or behaviour.
public class AppDb(DbContextOptions<AppDb> options) : IdentityDbContext<IdentityUser>(options)
{
    public DbSet<Student> Students => Set<Student>();

    // STUDY PART: Configure database mappings
    // Describe entity rules, including concurrency, before EF builds its model.
    protected override void OnModelCreating(ModelBuilder b)
    {
        base.OnModelCreating(b);
        b.Entity<Student>().Property(s => s.Version).IsConcurrencyToken();
    }
}
