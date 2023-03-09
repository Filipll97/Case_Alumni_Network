import React, { useState, useEffect } from 'react';
import keycloak from '../keycloak';

function UserComponent() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://localhost:7240/api/v1/Users', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + keycloak.token
                    }
                });
                const data = await response.json();
                setUser(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>User Information</h2>
            <p>Name: {user.username}</p>
            <p>Bio: {user.bio}</p>
            <p>Fun Fact: {user.funFact}</p>
        </div>
    );
}

export default UserComponent;