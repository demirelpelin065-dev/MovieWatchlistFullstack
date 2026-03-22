
using System.ComponentModel.DataAnnotations;

namespace MovieWatchlistApi.DTOs;

public class MovieDto
{
    [Required]
    [MaxLength(100)]
    public string Title { get; set; } = string.Empty;

    [Required]
    public string Genre { get; set; } = string.Empty;

    public bool IsWatched { get; set; }
}
