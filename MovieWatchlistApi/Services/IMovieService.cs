
using MovieWatchlistApi.Models;
using MovieWatchlistApi.DTOs;

namespace MovieWatchlistApi.Services;

public interface IMovieService
{
    Task<IEnumerable<Movie>> GetAllAsync();
    Task<Movie?> GetByIdAsync(int id);
    Task<Movie> CreateAsync(MovieDto dto);
    Task<bool> UpdateAsync(int id, MovieDto dto);
    Task<bool> DeleteAsync(int id);
}
