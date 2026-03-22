
# Movie Watchlist - Fullstack Project

## Description
A fullstack application built with:
- .NET Web API
- Entity Framework Core
- SQL Server (LocalDB)
- HTML, CSS, JavaScript (DOM + fetch)

Users can:
- Add movies
- View movies
- Delete movies
- Update movies via API

## How to Run

1. Navigate to MovieWatchlistApi
2. Run:
   dotnet ef migrations add InitialCreate
   dotnet ef database update
   dotnet run

3. Open Frontend/index.html in browser

## API Endpoints

GET /api/movies  
GET /api/movies/{id}  
POST /api/movies  
PUT /api/movies/{id}  
DELETE /api/movies/{id}  

## Reflection

The project demonstrates fullstack flow from frontend to database.
Services keep business logic separated from controllers.
Validation and error handling improve reliability.
