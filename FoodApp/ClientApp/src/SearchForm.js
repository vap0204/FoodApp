import React, { useState } from "react";

const SearchForm = ({ onSearch }) => {
    const [query, setQuery] = useState("");

    const handleInputChange = (event) => {
        setQuery(event.target.value);
        onSearch(event.target.value);
    };

    return (
        <div>
        <hr/>
            <h2>Search for Food Items</h2>
            <input
                type="text"
                placeholder="Search..."
                value={query}
                onChange={handleInputChange}
            />
        </div>
    );
};

export default SearchForm;
