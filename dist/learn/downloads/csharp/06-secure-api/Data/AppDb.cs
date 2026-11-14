using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

public class AppDb(DbContextOptions<AppDb> options) : IdentityDbContext<IdentityUser>(options)
{
    public DbSet<Student> Students => Set<Student>();

    protected override void OnModelCreating(ModelBuilder b)
    {
        base.OnModelCreating(b);
        b.Entity<Student>().Property(s => s.Version).IsConcurrencyToken();
    }
}
