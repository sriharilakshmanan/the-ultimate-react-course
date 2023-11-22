import { useEffect, useState } from "react";
import StarRating from "./StarRating";

const tempMovieData = [
    {
        imdbID: "tt1375666",
        Title: "Inception",
        Year: "2010",
        Poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    },
    {
        imdbID: "tt0133093",
        Title: "The Matrix",
        Year: "1999",
        Poster: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
    },
    {
        imdbID: "tt6751668",
        Title: "Parasite",
        Year: "2019",
        Poster: "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
    },
];

const tempWatchedData = [
    {
        imdbID: "tt1375666",
        Title: "Inception",
        Year: "2010",
        Poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
        runtime: 148,
        imdbRating: 8.8,
        userRating: 10,
    },
    {
        imdbID: "tt0088763",
        Title: "Back to the Future",
        Year: "1985",
        Poster: "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
        runtime: 116,
        imdbRating: 8.5,
        userRating: 9,
    },
];

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

    useEffect(
        function () {
            async function fetchMovies() {
                try {
                    setIsLoading(true);
                    setError("");
                    const response = await fetch(
                        `http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`
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
                } catch (error) {
                    setError(error.message);
                } finally {
                    setIsLoading(false);
                }
            }
            if (!query) {
                setMovies([]);
                setIsLoading(false);
                setError("");
            }
            fetchMovies();
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

function MovieInfo({ selectedId, onCloseMovie }) {
    const [movie, setMovie] = useState({});
    const [isLoading, setIsLoading] = useState(false);

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
                            <StarRating maxRating={10} size={24} />
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
                    <span>😎</span>
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
            <img src={movie.Poster} alt={`${movie.Title} poster`} />
            <h3>{movie.Title}</h3>
            <div>
                <p>
                    <span>⭐️</span>
                    <span>{movie.imdbRating}</span>
                </p>
                <p>
                    <span>🌟</span>
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
