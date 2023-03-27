import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import keycloak from "../../keycloak";
import { storageDelete, storageSave } from "../../utils/storage"
import { STORAGE_KEY_LAST_VISITED_PAGE, STORAGE_KEY_USER } from "../../utils/storageKeys"

function Navbar() {

    const { user, setUser } = useUser()
    const [navbar, setNavbar] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleLogout = () => {
        storageDelete(STORAGE_KEY_USER)
        setUser(null)
        storageSave(STORAGE_KEY_LAST_VISITED_PAGE, "/");
        keycloak.clearToken();
        keycloak.logout();
    }

    const dropdownRef = useRef(null);

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    if (!user) {

        return <div>Loading...</div>;
    }

    return (
        <nav className="shadow px-2 sm:px-4 py-2.5 rounded">
            <div className="container flex flex-wrap items-center justify-between mx-auto">
                <Link
                    to="/"
                    className="self-center text-xl font-semibold whitespace-nowrap text-white"
                >
                    Alumni Network
                </Link>
                <button
                    onClick={() => setNavbar(!navbar)}
                    className="inline-flex items-center p-2 ml-3 text-sm rounded-lg md:hidden focus:outline-none focus:ring-2 text-gray-400 hover:bg-gray-700 focus:ring-gray-600"
                    aria-controls="navbar-default"
                    aria-expanded="false"
                >
                    <span className="sr-only">Open main menu</span>
                    <svg
                        className="w-6 h-6"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                </button>
                <div
                    ref={dropdownRef}
                    className={`${dropdownOpen ? "block" : "hidden"} w-full md:block md:w-auto`}
                    id="navbar-default"
                >
                    <ul className="flex flex-col p-1 mt-4 rounded-lg md:flex-row md:space-x-8 md:mt-0 text-md md:text-sm items-center">
                        {user && keycloak.authenticated && (
                            <>
                                <li>
                                    <Link
                                        to="/calendar"
                                        className="font-semibold py-2 pl-3 pr-4 rounded md:p-0 text-gray-400 md:hover:text-white"
                                    >
                                        Calendar
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/newPost"
                                        className="font-semibold block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                    >
                                        <button className="bg-blue-600 text-white rounded p-2 shadow-lg hover:bg-blue-700">New Post</button>
                                    </Link>
                                </li>
                                <li className="relative">
                                    <button
                                        onClick={() => setDropdownOpen(!dropdownOpen)}
                                        className="flex items-center font-semibold py-2 pl-3 pr-4 text-slate-400 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent focus:outline-none"
                                    >
                                        <span className="mr-2">{user.username}</span>
                                        <img
                                            src={user.picture}
                                            className="h-8 w-8 rounded-full object-cover"
                                            alt=""
                                        />
                                    </button>
                                    {dropdownOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 text-gray-700 ring-1 ring-black ring-opacity-5 dark:bg-gray-800 dark:text-gray-200">
                                            <Link
                                                to={`/user/${user.id}`}
                                                className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                                            >
                                                Profile
                                            </Link>
                                            <Link
                                                to="/profile"
                                                className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                                            >
                                                Edit Profile
                                            </Link>
                                            <button
                                                onClick={handleLogout}
                                                className="block w-full text-left px-4 py-2 text-sm text-red-800 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-red-800"
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}
export default Navbar;
