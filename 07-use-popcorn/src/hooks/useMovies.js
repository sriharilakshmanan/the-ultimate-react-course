import { useEffect, useState } from "react";

const API_KEY = "80f75ba3";

function useMovies(query) {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    useEffect(
        function () {
            // fn?.();
            if (!query) {
                setMovies([]);
                setError("");
                return;
            }

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
                    if (error.name !== "AbortError") {
                        console.error(error.message);
                        setError(error.message);
                    }
                } finally {
                    setIsLoading(false);
                }
            }
            fetchMovies();

            return function () {
                controller.abort();
            };
        },
        [query]
    );
    return [movies, isLoading, error];
}
export { useMovies };
