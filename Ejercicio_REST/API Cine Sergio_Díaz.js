const express = require('express');
const app = express();
app.use(express.json());

const database = {
    movies: [
        { id: 1, title: "Inception", duration: 148, rating: 8.8 },
        { id: 2, title: "Interstellar", duration: 169, rating: 8.6 }
    ],
    sessions: [
        { id: 1, movie_id: 1, time: "18:00", available_seats: 50 },
        { id: 2, movie_id: 2, time: "20:30", available_seats: 30 }
    ]
};

app.get('/movies', (req, res) => {
    res.status(200).json(database.movies);
});

app.get('/movies/:movie_id', (req, res) => {
    const movie = database.movies.find(m => m.id == req.params.movie_id);
    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(404).json({ error: "Movie not found" });
    }
});

app.get('/sessions', (req, res) => {
    res.status(200).json(database.sessions);
});

app.get('/movies/:movie_id/sessions', (req, res) => {
    const sessions = database.sessions.filter(s => s.movie_id == req.params.movie_id);
    res.status(200).json(sessions);
});

app.post('/movies', (req, res) => {
    const data = req.body;
    const newMovie = {
        id: database.movies.length + 1,
        title: data.title,
        duration: data.duration,
        rating: data.rating
    };
    database.movies.push(newMovie);
    res.status(201).json(newMovie);
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
