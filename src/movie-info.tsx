import { Movie } from "../../movies/src/data-movie";

export default function MovieInfo(movie: Movie) {
    return (
        <>
            <h2>{movie.title}</h2>
            <p>{movie.year}</p>
            <h3>Genre</h3>
            <ul>
                <li key={movie.id}>{movie.genres.join(", ")}</li>
            </ul>
        </>
    );
}
