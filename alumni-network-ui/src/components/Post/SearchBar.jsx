import React, { useState } from 'react';

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
        <form onSubmit={handleSearch} className="w-full flex justify-center mb-8">
            <input
                type="text"
                value={searchInput}
                onChange={handleInputChange}
                placeholder="Search posts"
                className="w-2/3 px-4 py-2 border text-slate-700 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <button
                type="submit"
                className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg focus:outline-none hover:bg-blue-600"
            >
                Search
            </button>
        </form>
    );
}

export default SearchBar;