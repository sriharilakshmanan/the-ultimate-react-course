export function SummaryOfWatchedMovies({ watchedMovies }) {
    const totalRuntime = watchedMovies.reduce(
        (totalRuntime, movie) => totalRuntime + movie.runtime,
        0
    );
    return (
        <div className="summary">
            <h2>Movies you've watched</h2>
            <div>
                <p>
                    <span>#️⃣</span>
                    <span>{watchedMovies.length} movies</span>
                </p>
                <p>
                    <span>⏳</span>
                    <span>{totalRuntime} min</span>
                </p>
            </div>
        </div>
    );
}
