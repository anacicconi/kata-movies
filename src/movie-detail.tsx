import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Movie, Person } from "./data-movie";
import { fetchMovie, fetchPeopleById } from "./movie-service";
import MovieInfo from "./movie-info";

export default function MovieDetail() {
    const navigate = useNavigate();
    const { movieId } = useParams();
    const [movie, setMovie] = useState<Movie | null>(null);
    const [actors, setActors] = useState<Person[]>([]);
    const [directors, setDirectors] = useState<Person[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadMovie = async () => {
            try {
                if (!movieId) {
                    setError("Not able to display a movie without a movie id");
                    return;
                }
                setLoading(true);
                const movie = await fetchMovie(movieId);
                const actors = await fetchPeopleById(movie.actors);
                const directors = await fetchPeopleById(movie.directors);
                setMovie(movie);
                setActors(actors);
                setDirectors(directors);
                setError(null);
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : "An unknown error occurred"
                );
            } finally {
                setLoading(false);
            }
        };

        loadMovie();
    }, [movieId]);

    if (loading) return "loading";
    if (error) return "error";

    return (
        <>
            <button onClick={() => navigate("/")}>Back</button>
            {movie && <MovieInfo {...movie} />}
            {actors.length > 0 && (
                <div>
                    <h2>Actors</h2>
                    {actors.map((actor) => (
                        <p key={actor.id}>
                            {actor.firstname} {actor.lastname}
                        </p>
                    ))}
                </div>
            )}
            {directors.length > 0 && (
                <div>
                    <h2>Directors</h2>
                    {directors.map((director) => (
                        <p key={director.id}>
                            {director.firstname} {director.lastname}
                        </p>
                    ))}
                </div>
            )}
        </>
    );
}
