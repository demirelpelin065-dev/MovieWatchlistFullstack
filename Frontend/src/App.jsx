import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');

  const fetchMovies = () => {
    fetch('http://localhost:5000/api/movies')
      .then(res => res.json())
      .then(data => setMovies(data));
  };

  useEffect(() => { fetchMovies(); }, []);

  const addMovie = async () => {
    if(!title || !year) return alert('Title and year required');
    await fetch('http://localhost:5000/api/movies', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, year: parseInt(year) })
    });
    setTitle(''); setYear('');
    fetchMovies();
  };

  const deleteMovie = async (id) => {
    await fetch(`http://localhost:5000/api/movies/${id}`, { method: 'DELETE' });
    fetchMovies();
  };

  const updateMovie = async (id) => {
    const newTitle = prompt('New title:');
    const newYear = prompt('New year:');
    if(!newTitle || !newYear) return;
    await fetch(`http://localhost:5000/api/movies/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTitle, year: parseInt(newYear) })
    });
    fetchMovies();
  };

  return (
    <div className="container">
      <h1>🎬 Movie Watchlist</h1>
      <div className="add-movie">
        <input placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
        <input placeholder="Year" value={year} onChange={e=>setYear(e.target.value)} />
        <button onClick={addMovie}>Add Movie</button>
      </div>
      <ul className="movie-list">
        {movies.map(movie => (
          <li key={movie.id}>
            {movie.title} ({movie.year})
            <button onClick={()=>updateMovie(movie.id)}>Edit</button>
            <button onClick={()=>deleteMovie(movie.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;