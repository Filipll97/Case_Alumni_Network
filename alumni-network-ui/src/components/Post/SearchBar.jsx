import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function SearchBar({ onSearch }) {
    const [searchInput, setSearchInput] = useState("");

    const handleInputChange = (e) => {
        setSearchInput(e.target.value);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(searchInput);
    };

    return (
        <form onSubmit={handleSearch} className="lg:w-2/6 lg:mr-64 w-full mb-4 relative">
            <input
                type="text"
                value={searchInput}
                onChange={handleInputChange}
                placeholder="Search posts"
                className="w-full pl-4 pr-12 py-2 rounded-lg border border-gray-600 card focus:outline-none focus:border-blue-500 font-medium"
            />
            <button
                type="submit"
                className="absolute inset-y-0 right-4 px-4 py-2 text-gray-500 rounded-lg focus:outline-none"
            >
                <FontAwesomeIcon icon={faSearch} />
            </button>
        </form>
    );
}

export default SearchBar;