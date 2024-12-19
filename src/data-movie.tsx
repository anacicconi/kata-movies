export interface MoviesList {
    totalPages: number;
    totalElements: number;
    size: number;
    content: Movie[];
}

export interface Movie {
    id: number;
    title: string;
    actors: number[];
    directors: number[];
    genres: string[];
    year: number;
}

export interface Person {
    id: number;
    lastname: string;
    firstname: string;
}
