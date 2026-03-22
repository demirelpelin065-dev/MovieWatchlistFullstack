
using Microsoft.EntityFrameworkCore;
using MovieWatchlistApi.Models;

namespace MovieWatchlistApi.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Movie> Movies => Set<Movie>();
}
