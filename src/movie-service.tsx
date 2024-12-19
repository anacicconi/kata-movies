import { Movie, MoviesList, Person } from "../../movies/src/data-movie";

const API_BASE_URL = "";

export async function fetchMovies(
    page: number,
    size: number
): Promise<MoviesList> {
    try {
        const response = await fetch(
            `${API_BASE_URL}/kata/movies?page=${page}&size=${size}`
        );
        if (!response.ok) throw new Error("Failed to fetch movies");
        return response.json();
    } catch (err) {
        throw new Error(
            err instanceof Error ? err.message : "An unknown error occurred"
        );
    }
}

export async function fetchMovie(id: string): Promise<Movie> {
    try {
        const response = await fetch(`${API_BASE_URL}/kata/movies/${id}`);
        if (!response.ok) throw new Error("Failed to fetch movie");
        return response.json();
    } catch (err) {
        throw new Error(
            err instanceof Error ? err.message : "An unknown error occurred"
        );
    }
}

export async function fetchPeopleById(ids: number[]): Promise<Person[]> {
    try {
        const results = await Promise.allSettled(
            ids.map(async (id) => {
                const response = await fetch(
                    `${API_BASE_URL}/kata/persons/${id}`
                );

                if (!response.ok) {
                    throw new Error(
                        `Failed to fetch person with id ${id}: ${response.statusText}`
                    );
                }
                return response.json();
            })
        );

        return results
            .filter(
                (result): result is PromiseFulfilledResult<Person> =>
                    result.status === "fulfilled"
            )
            .map((result) => result.value);
    } catch (err) {
        throw new Error(
            err instanceof Error ? err.message : "An unknown error occurred"
        );
    }
}
