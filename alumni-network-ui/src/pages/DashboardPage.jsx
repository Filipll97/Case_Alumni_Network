import keycloak from "../keycloak";
import { useUser } from "../context/UserContext";

function DashBoardPage() {

    const { user, setUser } = useUser()

    if (!user) {
        return <div>Loading...</div>;
    }

    return (

        <div>
            <div>
                <h2>User Information</h2>
                <p>Username: {user.username}</p>
                <p>Id: {user.id}</p>
                <p>Fun Fact: {user.funFact}</p>
            </div>
            <h1>Start Page</h1>

            {keycloak.token && (
                <div>
                    <h4>Token</h4>
                    <pre>{keycloak.token}</pre>
                </div>
            )}
        </div>
    );
}
export default DashBoardPage;
