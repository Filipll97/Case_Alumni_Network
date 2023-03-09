import keycloak from "../keycloak";
import React, { useState, useEffect } from 'react';
import { getUserInfo } from '../api/user';
import { saveUserToLocalStorage } from '../storage/userStorage';

function DashBoardPage() {
    const [user, setUser] = useState(null);

    if (!keycloak.authenticated) {
        keycloak.login()
    }

    useEffect(() => {
        const fetchData = async () => {
            const data = await getUserInfo();
            setUser(data);
            saveUserToLocalStorage(data); // Save the user to local storage
        };
        if (keycloak.authenticated) {
            fetchData();
        }
    }, []);

    // Store the user data in local storage
    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user));
    }, [user]);


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
