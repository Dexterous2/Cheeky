import React, { createContext, useContext, useState } from 'react';

// Create a context for search
const Context = createContext();

// Custom hook to use search context
export const useSearch = () => useContext(Context);

// SearchProvider component to wrap your app
export const SearchContext = ({ children }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const updateSearchQuery = (query) => {
        setSearchQuery(query);
    };

    return (
        <Context.Provider value={{ searchQuery, updateSearchQuery }}>
            {children}
        </Context.Provider>
    );
};
