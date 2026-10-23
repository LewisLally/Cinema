import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export const MovieDetail = () => {
  const { id } = useParams();
  const title = decodeURIComponent(id || '');

  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchMovieDetail = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://ahm7xmakki.com/api/msearch?q=${encodeURIComponent(title)}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error('Request failed');
        }

        const data = await response.json();
        const results = data.results || [];

        const matchingMovie =
          results.find(
            (item) => item.title?.toLowerCase() === title.toLowerCase()
          ) || results[0];

        if (matchingMovie) {
          setMovie(matchingMovie);
        } else {
          setError('Movie not found.');
        }
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Error fetching movie details:', err);
          setError('Could not load movie details. Please try again later.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    fetchMovieDetail();

    return () => controller.abort();
  }, [title]);

  if (isLoading) {
    return <p>Loading movie details...</p>;
  }

  if (error) {
    return (
      <div>
        <p className="error">{error}</p>
        <Link to="/">Back to movies</Link>
      </div>
    );
  }

  return (
    <div className="movie-detail-container">
      {movie?.poster && (
        <img
          src={movie.poster}
          alt={`${movie.title} poster`}
          className="movie-image"
        />
      )}

      <div className="card-detailsText">
        <h1>{movie?.title}</h1>
        {movie?.year && <p><strong>Year:</strong> {movie.year}</p>}
        {movie?.type && <p><strong>Type:</strong> {movie.type}</p>}
        {movie?.cast && <p><strong>Cast:</strong> {movie.cast}</p>}
      </div>

      <Link to="/">Back to movies</Link>
    </div>
  );
};

export default MovieDetail;