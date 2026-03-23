const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('?? Movie backend is running! Gå till /api/movies för JSON.');
});

// Dummy movie data
let movies = [
  { id: 1, title: 'Inception', year: 2010 },
  { id: 2, title: 'Interstellar', year: 2014 },
  { id: 3, title: 'The Dark Knight', year: 2008 }
];

// CRUD Routes
app.get('/api/movies', (req, res) => res.json(movies));
app.get('/api/movies/:id', (req, res) => {
  const movie = movies.find(m => m.id === parseInt(req.params.id));
  if(!movie) return res.status(404).json({ message: 'Movie not found' });
  res.json(movie);
});
app.post('/api/movies', (req, res) => {
  const { title, year } = req.body;
  if(!title || !year) return res.status(400).json({ message: 'Title and year required' });
  const movie = { id: movies.length + 1, title, year };
  movies.push(movie);
  res.status(201).json(movie);
});
app.put('/api/movies/:id', (req, res) => {
  const movie = movies.find(m => m.id === parseInt(req.params.id));
  if(!movie) return res.status(404).json({ message: 'Movie not found' });
  const { title, year } = req.body;
  if(title) movie.title = title;
  if(year) movie.year = year;
  res.json(movie);
});
app.delete('/api/movies/:id', (req, res) => {
  const index = movies.findIndex(m => m.id === parseInt(req.params.id));
  if(index === -1) return res.status(404).json({ message: 'Movie not found' });
  const deleted = movies.splice(index, 1);
  res.json(deleted[0]);
});

app.listen(PORT, () => console.log(\?? Server running on http://localhost:\\));
