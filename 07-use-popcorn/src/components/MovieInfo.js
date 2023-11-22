import { useEffect, useRef, useState } from "react";
import StarRating from "./StarRating";
import { useKey } from "../hooks/useKey";
import { API_KEY, Loader } from "./App";

export function MovieInfo({
    selectedId,
    onCloseMovie,
    onAddWatchedMovie,
    watchedMovies,
}) {
    const [movie, setMovie] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [userRating, setUserRating] = useState(0);

    const noOfRatingChangesRef = useRef(0);

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
            noOfRatingChanges: noOfRatingChangesRef.current,
        };

        onAddWatchedMovie(newWatchedMovie);
        onCloseMovie();
    }

    useEffect(
        function () {
            if (userRating) {
                noOfRatingChangesRef.current = noOfRatingChangesRef.current + 1;
            }
        },
        [userRating]
    );

    useKey("Escape", onCloseMovie);

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
            // console.log(`Inside the clean-up function - Movie: ${title}`);
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
