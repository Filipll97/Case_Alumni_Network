import React, { useState, useEffect } from 'react';
import { getUserFromLocalStorage } from '../storage/userStorage';

function PostPage() {

    const [user, setUser] = useState({});

    useEffect(() => {
        const storedUser = getUserFromLocalStorage(); // Retrieve the user from local storage
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    // const dataToSend = {};
    // const response = await postPostInfo(dataToSend);
    // console.log(response)

    return (

        <div className="p-2">
            <div>
                <p>{user.username}</p>
            </div>
        </div>
    );
}
export default PostPage;