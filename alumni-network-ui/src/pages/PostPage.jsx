import { useState } from 'react';
import { useUser } from '../context/UserContext';
import keycloak from '../keycloak';

function PostPage() {

    const { user, setUser } = useUser();
    const [title, setTitle] = useState();
    const [body, setBody] = useState();

    const handleNewPost = async (event) => {
        event.preventDefault();
        const response = await fetch(`https://localhost:7240/api/v1/Posts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${keycloak.token}`,
            },
            body: JSON.stringify({ title, body }),
        });
        if (response.ok) {
            const updatedUser = await response.json();
            setUser(updatedUser);
        } else {
            console.error();
        }
    };


    return (
        <div className="flex flex-col justify-center items-center pt-12 text-center">
            <h3 className="pb-12 font-bold text-xl">New Post</h3>
            <form onSubmit={handleNewPost}>
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label htmlFor="username" className="block mb-2 font-bold text-gray-900 dark:text-white">Title</label>
                        <input type="text" id="username" className="font-bold bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Hello World" onChange={(event) => setTitle(event.target.value)}></input>
                    </div>
                </div>
                <div className="mb-6">
                    <label htmlFor="bio" className="block mb-2 font-bold text-gray-900 dark:text-white">Body</label>
                    <textarea rows="4" id="bio" className="resize-none font-bold bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Bla bla..." onChange={(event) => setBody(event.target.value)}></textarea>
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Post</button>
            </form >
        </div >
    );
}
export default PostPage;