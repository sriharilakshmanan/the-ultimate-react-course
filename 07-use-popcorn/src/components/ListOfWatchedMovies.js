import { WatchedMovie } from "./WatchedMovie";

export function ListOfWatchedMovies({ watchedMovies, onDelete }) {
    return (
        <ul className="list">
            {watchedMovies.map((movie) => (
                <WatchedMovie
                    key={movie.imdbID}
                    movie={movie}
                    onDelete={onDelete}
                />
            ))}
        </ul>
    );
}
