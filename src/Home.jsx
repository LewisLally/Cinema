import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const Home = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchMovies = async () => {
      try {
        const response = await fetch(
          'https://ahm7xmakki.com/api/msearch?q=batman',
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error('Request failed');
        }

        const data = await response.json();
        setMovies(data.results || []);
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Error fetching movies:', err);
          setError('Failed to fetch movies. Please try again later.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    fetchMovies();

    return () => controller.abort();
  }, []);

  if (isLoading) {
    return <p>Loading movies...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div>
      <h1>Movies</h1>
      <p>Welcome to the cinema page!</p>

      <div className="movie-container">
        {movies.length > 0 ? (
          movies.map((movie, index) => {
            const title = movie.title || 'Untitled movie';
            const key = movie.id || `${title}-${movie.year || index}`;

            return (
              <Link
                key={key}
                to={`/movie/${encodeURIComponent(title)}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div className="card-movies">
                  {movie.poster && (
                    <img src={movie.poster} alt={`${title} poster`} />
                  )}
                  <h2>{title}</h2>
                  {movie.year && <p>{movie.year}</p>}
                  {movie.type && <p>{movie.type}</p>}
                </div>
              </Link>
            );
          })
        ) : (
          <p>No movies found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;