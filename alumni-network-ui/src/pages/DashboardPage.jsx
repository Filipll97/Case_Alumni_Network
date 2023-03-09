import keycloak from "../keycloak";
import React, { useState, useEffect } from 'react';
import { getUserInfo } from '../api/user';

function DashBoardPage() {
    const [user, setUser] = useState(null);

    if (!keycloak.authenticated) {
        keycloak.login()
    }

    useEffect(() => {
        const fetchData = async () => {
            const data = await getUserInfo();
            setUser(data);
        };
        if (keycloak.authenticated) {
            fetchData();
        }
    }, []);


    if (!user) {
        return <div>Loading...</div>;
    }

    return (

        <div>
            <div>
                <h2>User Information</h2>
                <p>Name: {user.username}</p>
                <p>Bio: {user.bio}</p>
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
