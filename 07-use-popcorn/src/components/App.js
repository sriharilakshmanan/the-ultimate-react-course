import { useState } from "react";
import { useMovies } from "../hooks/useMovies";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
import { Header } from "./Header";
import { NumOfResults } from "./NumOfResults";
import { Search } from "./Search";
import { Movies } from "./Movies";
import { ListOfMovies } from "./ListOfMovies";
import { MovieInfo } from "./MovieInfo";
import { SummaryOfWatchedMovies } from "./SummaryOfWatchedMovies";
import { ListOfWatchedMovies } from "./ListOfWatchedMovies";

// const average = (arr) =>
//     arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export const API_KEY = "80f75ba3";

export default function App() {
    const [query, setQuery] = useState("");
    const [selectedId, setSelectedId] = useState(null);
    // const [watchedMovies, setWatchedMovies] = useState([]);
    const [watchedMovies, setWatchedMovies] = useLocalStorageState(
        [],
        "watchedMovies"
    );

    const [movies, isLoading, error] = useMovies(query);

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

    function handleDeleteWatchedMovie(id) {
        setWatchedMovies((watchedMovie) =>
            watchedMovie.filter((movie) => movie.imdbID !== id)
        );
    }

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
                                onDelete={handleDeleteWatchedMovie}
                            />
                        </>
                    )}
                </Movies>
            </Main>
        </>
    );
}

function Main({ children }) {
    return <main className="main">{children}</main>;
}

export function Loader() {
    return <p className="loader">Loading...</p>;
}

function ErrorMessage({ message }) {
    return <p className="error">{message}</p>;
}
