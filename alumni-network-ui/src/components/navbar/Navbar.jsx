import { useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import keycloak from "../../keycloak";
import { storageDelete } from "../../utils/storage"
import { STORAGE_KEY_USER } from "../../utils/storageKeys"

function Navbar() {

    const { user, setUser } = useUser()
    const [navbar, setNavbar] = useState(false);

    const handleLogout = () => {
        storageDelete(STORAGE_KEY_USER)
        setUser(null)
        keycloak.clearToken();
        keycloak.logout();
    }

    if (keycloak.token && keycloak.isTokenExpired()) {
        keycloak.updateToken();
    }

    if (!user) {

        return <div>Loading...</div>;
    }

    return (
        // <nav class="flex items-center justify-between flex-wrap p-6">
        //     <div class="flex items-center flex-shrink-0 text-white mr-6">
        //         <svg class="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" /></svg>
        //         <span class="font-semibold text-xl tracking-tight">Alumni Network</span>
        //     </div>
        //     <div class="block lg:hidden">
        //         <button class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
        //             <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
        //         </button>
        //     </div>
        //     <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        //         <div class="text-sm lg:flex-grow">
        //             {user && keycloak.authenticated && (
        //                 <>
        //                     <Link to="/calendar" className="font-semibold block mt-4 lg:inline-block lg:mt-0 mr-4 dark:text-gray-400 md:dark:hover:text-white">Calendar</Link>
        //                     <Link to="/createEvent" className="font-semibold block mt-4 lg:inline-block lg:mt-0 mr-4 dark:text-gray-400 md:dark:hover:text-white">New Event</Link>
        //                 </>
        //             )}
        //         </div>
        //         <div>
        //             <a href="#" class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">Download</a>
        //             {/* <img src={user.picture} className="h-12" alt="" /> */}

        //         </div>
        //     </div>
        // </nav>
        // <nav className="w-full shadow">
        //     <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
        //         <div>
        //             <div className="flex items-center justify-between py-3 md:py-5 md:block">
        //                 <a href="javascript:void(0)">
        //                     <h2 className="text-2xl font-bold text-white"></h2>
        //                 </a>
        //                 <div className="md:hidden">
        //                     <button
        //                         className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
        //                         onClick={() => setNavbar(!navbar)}
        //                     >
        //                         {navbar ? (
        //                             <svg
        //                                 xmlns="http://www.w3.org/2000/svg"
        //                                 className="w-6 h-6 text-white"
        //                                 viewBox="0 0 20 20"
        //                                 fill="currentColor"
        //                             >
        //                                 <path
        //                                     fillRule="evenodd"
        //                                     d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
        //                                     clipRule="evenodd"
        //                                 />
        //                             </svg>
        //                         ) : (
        //                             <svg
        //                                 xmlns="http://www.w3.org/2000/svg"
        //                                 className="w-6 h-6 text-white"
        //                                 fill="none"
        //                                 viewBox="0 0 24 24"
        //                                 stroke="currentColor"
        //                                 strokeWidth={2}
        //                             >
        //                                 <path
        //                                     strokeLinecap="round"
        //                                     strokeLinejoin="round"
        //                                     d="M4 6h16M4 12h16M4 18h16"
        //                                 />
        //                             </svg>
        //                         )}
        //                     </button>
        //                 </div>
        //             </div>
        //         </div>
        //         <div>
        //             <div
        //                 className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${navbar ? "block" : "hidden"
        //                     }`}
        //             >
        //                 <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
        //                     <li className="text-white hover:text-indigo-200">
        //                         <a href="javascript:void(0)">Home</a>
        //                     </li>
        //                     <li className="text-white hover:text-indigo-200">
        //                         <a href="javascript:void(0)">Blog</a>
        //                     </li>
        //                     <li className="text-white hover:text-indigo-200">
        //                         <a href="javascript:void(0)">About US</a>
        //                     </li>
        //                     <li className="text-white hover:text-indigo-200">
        //                         <a href="javascript:void(0)">Contact US</a>
        //                     </li>
        //                 </ul>

        //                 <div className="mt-3 space-y-2 lg:hidden md:inline-block">
        //                     <a
        //                         href="javascript:void(0)"
        //                         className="inline-block w-full px-4 py-2 text-center text-white bg-gray-600 rounded-md shadow hover:bg-gray-800"
        //                     >
        //                         Sign in
        //                     </a>

        //                     <a
        //                         href="javascript:void(0)"
        //                         className="inline-block w-full px-4 py-2 text-center text-gray-800 bg-white rounded-md shadow hover:bg-gray-100"
        //                     >
        //                         Sign up
        //                     </a>
        //                 </div>
        //             </div>
        //         </div>
        //         <div className="hidden space-x-2 md:inline-block">
        //             <a
        //                 href="javascript:void(0)"
        //                 className="px-4 py-2 text-white bg-gray-600 rounded-md shadow hover:bg-gray-800"
        //             >
        //                 Sign in
        //             </a>
        //             <a
        //                 href="javascript:void(0)"
        //                 className="px-4 py-2 text-gray-800 bg-white rounded-md shadow hover:bg-gray-100"
        //             >
        //                 Sign up
        //             </a>
        //         </div>
        //     </div>
        // </nav>
        <nav className="border-gray-800 border-b-2 px-2 sm:px-4 py-2.5 rounded">
            <div className="container flex flex-wrap items-center justify-between mx-auto">
                <Link to="/" className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Alumni Network</Link>
                {/* <a href="https://flowbite.com/" className="flex items-center">
                </a> */}
                <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                </button>
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul className="flex flex-col p-1 mt-4 rounded-lg md:flex-row md:space-x-8 md:mt-0 text-md md:text-sm">
                        {user && keycloak.authenticated && (
                            <>
                                <li>
                                    <Link to="/calendar" className="font-semibold py-2 pl-3 pr-4 rounded md:p-0 dark:text-gray-400 md:dark:hover:text-white">Calendar</Link>
                                </li>
                                <li>
                                    <Link to="/createEvent" className="font-semibold block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">New Event</Link>
                                </li>
                                <li>
                                    <Link to="/profile" className="font-semibold block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">{user.username}</Link>
                                    <img src={user.picture} className="h-12 pl-4 pt-3 sm:h-14 z-10" alt="" />
                                </li>
                                <li>
                                    <button onClick={handleLogout} className="font-semibold block py-2 pl-3 pr-4 text-red-800 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-red-800 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Logout</button>
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
