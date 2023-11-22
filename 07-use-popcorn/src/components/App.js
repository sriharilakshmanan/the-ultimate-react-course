import { useEffect, useState } from "react";
import StarRating from "./StarRating";

const average = (arr) =>
    arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const API_KEY = "80f75ba3";

export default function App() {
    const [query, setQuery] = useState("Jigarthanda");
    const [movies, setMovies] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [watchedMovies, setWatchedMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    // useEffect(function () {
    //     console.log("B : After Initial Render (Mount)");
    // }, []);
    // useEffect(function () {
    //     console.log("C : After Each Render");
    // });
    // useEffect(
    //     function () {
    //         console.log("D : On Dependency Change");
    //     },
    //     [query]
    // );
    // console.log("A : Render Phase");

    function handleSelectMovie(id) {
        setSelectedId((selectedId) => (selectedId === id ? null : id));
    }

    function handleCloseMovie() {
        setSelectedId(null);
    }

    function handleAddWatchedMovie(movie) {
        setWatchedMovies((watchedMovies) => [...watchedMovies, movie]);
    }

    useEffect(
        function () {
            const controller = new AbortController();
            async function fetchMovies() {
                try {
                    setIsLoading(true);
                    setError("");
                    const response = await fetch(
                        `http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`,
                        { signal: controller.signal }
                    );
                    if (!response.ok) {
                        throw new Error(
                            "Something went wrong. Please try again later :("
                        );
                    }
                    const data = await response.json();
                    if (data.Response === "False") {
                        throw new Error("No movies found :(");
                    }
                    setMovies(data.Search);
                    setError("");
                } catch (error) {
                    console.error(error);
                    if (error.name !== "AbortError") {
                        setError(error.message);
                    }
                } finally {
                    setIsLoading(false);
                }
            }
            if (!query) {
                setMovies([]);
                setError("");
            }
            fetchMovies();
            return function () {
                controller.abort();
            };
        },
        [query]
    );

    return (
        <>
            <Header>
                <Search query={query} setQuery={setQuery} />
                <NumOfResults movies={movies} />
            </Header>
            <Main>
                {/* Composition of components (explicit prop) */}
                {/* <Movies element={<ListOfMovies movies={movies} />} />
                <Movies
                    element={
                        <>
                            <SummaryOfWatchedMovies watchedMovies={watchedMovies} />
                            <ListOfWatchedMovies watchedMovies={watchedMovies} />
                        </>
                    }
                /> */}
                <Movies>
                    {isLoading && <Loader />}
                    {error && <ErrorMessage message={error} />}
                    {!isLoading && !error && (
                        <ListOfMovies
                            movies={movies}
                            onSelectMovie={handleSelectMovie}
                        />
                    )}
                </Movies>
                <Movies>
                    {selectedId ? (
                        <MovieInfo
                            selectedId={selectedId}
                            onCloseMovie={handleCloseMovie}
                            onAddWatchedMovie={handleAddWatchedMovie}
                            watchedMovies={watchedMovies}
                        />
                    ) : (
                        <>
                            <SummaryOfWatchedMovies
                                watchedMovies={watchedMovies}
                            />
                            <ListOfWatchedMovies
                                watchedMovies={watchedMovies}
                            />
                        </>
                    )}
                </Movies>
            </Main>
        </>
    );
}

function Header({ children }) {
    return (
        <nav className="nav-bar">
            <Logo />
            {children}
        </nav>
    );
}

function NumOfResults({ movies }) {
    return (
        <p className="num-results">
            Found <strong>{movies.length}</strong> results
        </p>
    );
}

function Search({ query, setQuery }) {
    return (
        <input
            className="search"
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
        />
    );
}

function Logo() {
    return (
        <div className="logo">
            <span role="img">🍿</span>
            <h1>usePopcorn</h1>
        </div>
    );
}

function Main({ children }) {
    return <main className="main">{children}</main>;
}

// Composition of components (explicit prop)
// function Movies({ element }) {
//     const [isOpen, setIsOpen] = useState(true);
//     return (
//         <div className="box">
//             <button
//                 className="btn-toggle"
//                 onClick={() => setIsOpen((open) => !open)}
//             >
//                 {isOpen ? "–" : "+"}
//             </button>
//             {isOpen && element}
//         </div>
//     );
// }

function Movies({ children }) {
    const [isOpen, setIsOpen] = useState(true);
    return (
        <div className="box">
            <button
                className="btn-toggle"
                onClick={() => setIsOpen((open) => !open)}
            >
                {isOpen ? "–" : "+"}
            </button>
            {isOpen && children}
        </div>
    );
}

function Loader() {
    return <p className="loader">Loading...</p>;
}

function ErrorMessage({ message }) {
    return <p className="error">{message}</p>;
}

function ListOfMovies({ movies, onSelectMovie }) {
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

function Movie({ movie, onSelect }) {
    return (
        <li onClick={() => onSelect(movie.imdbID)}>
            <img src={movie.Poster} alt={`${movie.Title} poster`} />
            <h3>{movie.Title}</h3>
            <div>
                <p>
                    <span>🗓</span>
                    <span>{movie.Year}</span>
                </p>
            </div>
        </li>
    );
}

function MovieInfo({
    selectedId,
    onCloseMovie,
    onAddWatchedMovie,
    watchedMovies,
}) {
    const [movie, setMovie] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [userRating, setUserRating] = useState(0);

    const {
        Title: title,
        Year: year,
        Poster: poster,
        Runtime: runtime,
        imdbRating,
        Plot: plot,
        Released: released,
        Actors: actors,
        Director: director,
        Genre: genre,
    } = movie;

    const alreadyRated = watchedMovies.find(
        (movie) => movie.imdbID === selectedId
    )?.userRating;

    function handleAddWatchedMovie() {
        const newWatchedMovie = {
            imdbID: selectedId,
            title,
            year,
            poster,
            imdbRating: Number(imdbRating),
            runtime: Number(runtime.split(" ").at(0)),
            userRating,
        };

        onAddWatchedMovie(newWatchedMovie);
        onCloseMovie();
    }

    useEffect(
        function () {
            async function getMovieDetails() {
                setIsLoading(true);
                const res = await fetch(
                    `http://www.omdbapi.com/?apikey=${API_KEY}&i=${selectedId}`
                );
                const data = await res.json();
                setMovie(data);
                setIsLoading(false);
            }
            getMovieDetails();
        },
        [selectedId]
    );

    useEffect(() => {
        if (!title) {
            return;
        }
        document.title = title;
        return function () {
            document.title = "usePopcorn";
            console.log(`Inside the clean-up function - Movie: ${title}`);
        };
    }, [title]);

    return (
        <div className="details">
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <header>
                        <button className="btn-back" onClick={onCloseMovie}>
                            &larr;
                        </button>
                        <img src={poster} alt={`Poster of ${movie} movie`} />
                        <div className="details-overview">
                            <h2>{title}</h2>
                            <p>
                                {released} &bull; {runtime}
                            </p>
                            <p>{genre}</p>
                            <p>
                                <span>⭐️</span>
                                {imdbRating} IMDb rating
                            </p>
                        </div>
                    </header>

                    {/* <p>{avgRating}</p> */}

                    <section>
                        <div className="rating">
                            {alreadyRated ? (
                                <p>
                                    {`You have rated this movie ${alreadyRated} `}
                                    <span>✪</span>
                                </p>
                            ) : (
                                <>
                                    <StarRating
                                        maxRating={10}
                                        size={24}
                                        onRate={setUserRating}
                                    />
                                    <button
                                        className="btn-add"
                                        onClick={handleAddWatchedMovie}
                                        disabled={userRating < 1}
                                    >
                                        + Add to list
                                    </button>
                                </>
                            )}
                        </div>
                        <p>
                            <em>{plot}</em>
                        </p>
                        <p>Starring {actors}</p>
                        <p>Directed by {director}</p>
                    </section>
                </>
            )}
        </div>
    );
}

function SummaryOfWatchedMovies({ watchedMovies }) {
    const avgImdbRating = average(
        watchedMovies.map((movie) => movie.imdbRating)
    );
    const avgUserRating = average(
        watchedMovies.map((movie) => movie.userRating)
    );
    const avgRuntime = average(watchedMovies.map((movie) => movie.runtime));
    return (
        <div className="summary">
            <h2>Movies you've watched</h2>
            <div>
                <p>
                    <span>#️⃣</span>
                    <span>{watchedMovies.length} movies</span>
                </p>
                <p>
                    <span>⭐️</span>
                    <span>{avgImdbRating}</span>
                </p>
                <p>
                    <span>✪</span>
                    <span>{avgUserRating}</span>
                </p>
                <p>
                    <span>⏳</span>
                    <span>{avgRuntime} min</span>
                </p>
            </div>
        </div>
    );
}

function ListOfWatchedMovies({ watchedMovies }) {
    return (
        <ul className="list">
            {watchedMovies.map((movie) => (
                <WatchedMovie key={movie.imdbID} movie={movie} />
            ))}
        </ul>
    );
}

function WatchedMovie({ movie }) {
    return (
        <li>
            <img src={movie.poster} alt={`${movie.title} poster`} />
            <h3>{movie.title}</h3>
            <div>
                <p>
                    <span>⭐️</span>
                    <span>{movie.imdbRating}</span>
                </p>
                <p>
                    <span>✪</span>
                    <span>{movie.userRating}</span>
                </p>
                <p>
                    <span>⏳</span>
                    <span>{movie.runtime} min</span>
                </p>
            </div>
        </li>
    );
}
