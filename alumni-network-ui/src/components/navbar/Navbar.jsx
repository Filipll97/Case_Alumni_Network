import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import keycloak from "../../keycloak";
import { storageDelete } from "../../utils/storage"
import { STORAGE_KEY_USER } from "../../utils/storageKeys"

function Navbar() {

    const { user, setUser } = useUser()

    const handleLogout = () => {
        storageDelete(STORAGE_KEY_USER)
        setUser(null)
        keycloak.clearToken();
        keycloak.logout();
    }

    if (!user) {
        return <div>Loading...</div>;
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

                    {user && keycloak.authenticated && (
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
