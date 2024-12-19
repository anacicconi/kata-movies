import { Movie } from "../../movies/src/data-movie";
import { useNavigate } from "react-router";
import MovieInfo from "./movie-info";

export default function MovieCard(movie: Movie) {
    const navigate = useNavigate();

    return (
        <div onClick={() => navigate(`/movies/${movie.id}`)}>
            <MovieInfo {...movie} />
        </div>
    );
}
