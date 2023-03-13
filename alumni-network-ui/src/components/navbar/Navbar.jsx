import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import keycloak from "../../keycloak";
import { getUserFromLocalStorage } from "../../utils/storage";
import { removeItemFromLocalStorage } from "../../utils/storage"

function Navbar() {

    // SOLVE WITH REDUX OR CONTEXT!

    const [user, setUser] = useState({});

    useEffect(() => {
        const storedUser = getUserFromLocalStorage(); // Retrieve the user from local storage
        if (storedUser) {
            setUser(storedUser);
        } else if (keycloak.authenticated) {
            keycloak.loadUserInfo().then(userInfo => {
                setUser({
                    username: userInfo.username,
                });
            });
        }
    }, [keycloak.authenticated]);

    const handleLogout = async () => {
        removeItemFromLocalStorage("user");
        keycloak.clearToken();
        keycloak.logout();
        localStorage.removeItem('kc_token');
        localStorage.removeItem(`kc-callback-${keycloak.sub}`)
    }

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
                                <button onClick={handleLogout}>Logout</button>
                            </li>
                        </ul>
                    )}
                </div>
            </div>
        </nav>
    );
}
export default Navbar;
