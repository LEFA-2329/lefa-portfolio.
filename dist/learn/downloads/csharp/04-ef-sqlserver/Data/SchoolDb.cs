// Follow the numbered teaching parts in order. The full file combines every part.
using Microsoft.EntityFrameworkCore;

// STUDY PART: Define SchoolDb
// Keep this type in this file or its own named file. Its members describe data or behaviour.
public class SchoolDb(DbContextOptions<SchoolDb> options) : DbContext(options)
{
    public DbSet<Student> Students => Set<Student>();
}
