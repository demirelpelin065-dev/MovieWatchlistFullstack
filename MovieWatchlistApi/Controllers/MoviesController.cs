
using Microsoft.AspNetCore.Mvc;
using MovieWatchlistApi.Services;
using MovieWatchlistApi.DTOs;

namespace MovieWatchlistApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MoviesController : ControllerBase
{
    private readonly IMovieService _service;

    public MoviesController(IMovieService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
        => Ok(await _service.GetAllAsync());

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var movie = await _service.GetByIdAsync(id);
        return movie == null ? NotFound() : Ok(movie);
    }

    [HttpPost]
    public async Task<IActionResult> Create(MovieDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        return Ok(await _service.CreateAsync(dto));
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, MovieDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        return await _service.UpdateAsync(id, dto)
            ? NoContent()
            : NotFound();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
        => await _service.DeleteAsync(id)
            ? NoContent()
            : NotFound();
}
