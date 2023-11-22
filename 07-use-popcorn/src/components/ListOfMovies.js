import { Movie } from "./Movie";

export function ListOfMovies({ movies, onSelectMovie }) {
    return (
        <ul className="list list-movies">
            {movies.map((movie) => (
                <Movie
                    key={movie.imdbID}
                    movie={movie}
                    onSelect={onSelectMovie}
                />
            ))}
        </ul>
    );
}
