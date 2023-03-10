import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import keycloak from "../../keycloak";
import { getUserFromLocalStorage } from "../../storage/userStorage";

function Navbar() {

    const [user, setUser] = useState({});

    useEffect(() => {
        const storedUser = getUserFromLocalStorage(); // Retrieve the user from local storage
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    return (
        <nav>
            <div className="container">
                <div className="navbar">
                    <ul>
                        <li>
                            <Link to="/">Start</Link>
                        </li>
                        {keycloak.authenticated && (
                            <>
                                <li>
                                    <Link to="/post">New Post</Link>
                                </li>
                                <li>
                                    <Link to="/profile">Profile</Link>
                                </li>
                                <li>
                                    <Link to="/createEvent">CreateEventPage</Link>
                                </li>
                            </>

                        )}
                    </ul>

                    {keycloak.authenticated && (
                        <ul>
                            <li>
                                {user.username}
                            </li>
                            <li>
                                <button onClick={() => keycloak.logout()}>Logout</button>
                            </li>
                        </ul>
                    )}
                </div>
            </div>
        </nav>
    );
}
export default Navbar;
