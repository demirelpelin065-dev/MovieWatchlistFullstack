
const apiUrl = "https://localhost:5001/api/movies";

const movieList = document.getElementById("movieList");
const form = document.getElementById("movieForm");

async function loadMovies() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Failed to fetch movies");

        const movies = await response.json();
        movieList.innerHTML = "";

        movies.forEach(movie => {
            const li = document.createElement("li");
            li.textContent = `${movie.title} (${movie.genre}) - ${movie.isWatched ? "Watched" : "Not watched"}`;

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.onclick = () => deleteMovie(movie.id);

            li.appendChild(deleteBtn);
            movieList.appendChild(li);
        });
    } catch (error) {
        alert(error.message);
    }
}

async function deleteMovie(id) {
    await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
    loadMovies();
}

form.addEventListener("submit", async e => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const genre = document.getElementById("genre").value;

    await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, genre, isWatched: false })
    });

    form.reset();
    loadMovies();
});

loadMovies();
