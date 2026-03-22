
using Microsoft.EntityFrameworkCore;
using MovieWatchlistApi.Data;
using MovieWatchlistApi.Models;
using MovieWatchlistApi.DTOs;

namespace MovieWatchlistApi.Services;

public class MovieService : IMovieService
{
    private readonly AppDbContext _context;

    public MovieService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Movie>> GetAllAsync()
        => await _context.Movies.ToListAsync();

    public async Task<Movie?> GetByIdAsync(int id)
        => await _context.Movies.FindAsync(id);

    public async Task<Movie> CreateAsync(MovieDto dto)
    {
        var movie = new Movie
        {
            Title = dto.Title,
            Genre = dto.Genre,
            IsWatched = dto.IsWatched
        };

        _context.Movies.Add(movie);
        await _context.SaveChangesAsync();
        return movie;
    }

    public async Task<bool> UpdateAsync(int id, MovieDto dto)
    {
        var movie = await _context.Movies.FindAsync(id);
        if (movie == null) return false;

        movie.Title = dto.Title;
        movie.Genre = dto.Genre;
        movie.IsWatched = dto.IsWatched;

        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var movie = await _context.Movies.FindAsync(id);
        if (movie == null) return false;

        _context.Movies.Remove(movie);
        await _context.SaveChangesAsync();
        return true;
    }
}
