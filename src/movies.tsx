import { useState, useEffect } from "react";
import { Movie } from "../../movies/src/data-movie";
import { fetchMovies } from "./movie-service";
import MovieCard from "./movie-card";

export default function Movies() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadMovies = async () => {
        try {
            setLoading(true);
            const data = await fetchMovies(1, 3);
            setMovies(data.content);
            setError(null);
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "An unknown error occurred"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadMovies();
    }, []);

    if (loading) return "loading";
    if (error) return "error";

    return (
        <div>
            <div>
                <h1>Movies</h1>
                <div>
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} {...movie} />
                    ))}
                </div>
            </div>
        </div>
    );
}
