import { createContext, useContext, useMemo, useState } from "react";

const SearchContext = createContext();

function SearchProvider({ children }) {
    const [searchQuery, setSearchQuery] = useState("");
    const value = useMemo(
        function () {
            return {
                searchQuery: searchQuery,
                setSearchQuery: setSearchQuery,
            };
        },
        [searchQuery, setSearchQuery]
    );
    return (
        <SearchContext.Provider value={value}>
            {children}
        </SearchContext.Provider>
    );
}

function useSearch() {
    return useContext(SearchContext);
}

export { SearchProvider as default, useSearch };
