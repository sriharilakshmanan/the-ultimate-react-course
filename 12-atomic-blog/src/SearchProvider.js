import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

function SearchProvider({ children }) {
    const [searchQuery, setSearchQuery] = useState("");
    return (
        <SearchContext.Provider
            value={{
                searchQuery: searchQuery,
                setSearchQuery: setSearchQuery,
            }}
        >
            {children}
        </SearchContext.Provider>
    );
}

function useSearch() {
    return useContext(SearchContext);
}

export { SearchProvider as default, useSearch };
