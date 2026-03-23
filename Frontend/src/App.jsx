import { useState, useEffect } from 'react';
import { Button, TextField, Card, CardContent, CardActions, Typography } from '@mui/material';

function App() {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');

  useEffect(() => { fetchMovies(); }, []);

  const fetchMovies = () => {
    fetch('http://localhost:5000/api/movies')
      .then(res => res.json())
      .then(data => setMovies(data));
  };

  const addMovie = async () => {
    if (!title || !year) return;
    await fetch('http://localhost:5000/api/movies', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, year: parseInt(year) }),
    });
    setTitle(''); setYear('');
    fetchMovies();
  };

  const deleteMovie = async (id) => {
    await fetch(\http://localhost:5000/api/movies/\\, { method: 'DELETE' });
    fetchMovies();
  };

  return (
    <div className='p-8 min-h-screen'>
      <header className='text-4xl font-bold text-center mb-8'>🎬 My Movie Watchlist</header>
      <div className='flex justify-center gap-4 mb-6'>
        <TextField label='Title' value={title} onChange={e=>setTitle(e.target.value)} size='small'/>
        <TextField label='Year' value={year} onChange={e=>setYear(e.target.value)} size='small' type='number'/>
        <Button variant='contained' onClick={addMovie}>Add Movie</Button>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {movies.map(movie=>(
          <Card key={movie.id} className='shadow-lg hover:shadow-2xl transition-all duration-300'>
            <CardContent>
              <Typography variant='h6'>{movie.title}</Typography>
              <Typography color='textSecondary'>{movie.year}</Typography>
            </CardContent>
            <CardActions className='justify-end'>
              <Button size='small' color='error' onClick={()=>deleteMovie(movie.id)}>Delete</Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default App;
