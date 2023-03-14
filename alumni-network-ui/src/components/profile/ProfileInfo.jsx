import { useState } from "react";
import { useUser } from "../../context/UserContext";
import keycloak from "../../keycloak";
import { storageSave } from "../../utils/storage";
import { STORAGE_KEY_USER } from "../../utils/storageKeys";

function ProfilePage() {

    const { user, setUser } = useUser();

    const storedUser = user;
    const [username, setUsername] = useState(storedUser?.username ?? keycloak.tokenParsed.preferred_username);
    const [bio, setBio] = useState(storedUser?.bio ?? "");
    const [funFact, setFunFact] = useState(storedUser?.funFact ?? "");
    const [picture, setPicture] = useState(storedUser?.picture ?? "");
    const [status, setStatus] = useState(storedUser?.status ?? "");

    const handleUpdateProfile = async (event) => {
        event.preventDefault();
        const response = await fetch(`https://localhost:7240/api/v1/Users/${storedUser.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${keycloak.token}`,
            },
            body: JSON.stringify({ username, bio, funFact, picture, status }),
        });
        if (response.ok) {
            const updatedUser = await response.json();
            console.log(updatedUser);
            setUsername(updatedUser.username);
            setBio(updatedUser.bio);
            setFunFact(updatedUser.funFact);
            setPicture(updatedUser.picture);
            setStatus(updatedUser.status);
            storageSave(STORAGE_KEY_USER, updatedUser); // Update stored user data
            setUser(updatedUser);
        } else {
            // handle error
        }
    };

    return (
        <div>
            <form onSubmit={handleUpdateProfile}>
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label htmlFor="username" className="block mb-2 font-bold text-gray-900 dark:text-white text-sm">Username</label>
                        <input type="text" id="username" className="font-bold bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={storedUser?.username ?? keycloak.tokenParsed.preferred_username} onChange={(event) => setUsername(event.target.value)}></input>
                    </div>
                    <div>
                        <label htmlFor="last_name" className="block mb-2 font-bold text-gray-900 dark:text-white text-sm">Status</label>
                        <input type="text" id="last_name" className="font-bold bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={storedUser?.status ?? ""} onChange={(event) => setStatus(event.target.value)}></input>
                    </div>
                    <div>
                        <label htmlFor="company" className="block mb-2 font-bold text-gray-900 dark:text-white text-sm">Picture</label>
                        <input type="text" id="company" className="font-bold bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={storedUser?.picture ?? ""} onChange={(event) => setPicture(event.target.value)} ></input>
                    </div>
                    <div>
                        <label htmlFor="phone" className="block mb-2 font-bold text-gray-900 dark:text-white text-sm">Fun Fact</label>
                        <input type="tel" id="phone" className="font-bold bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={storedUser?.funFact ?? ""} onChange={(event) => setFunFact(event.target.value)} ></input>
                    </div>
                </div>
                <div className="mb-6">
                    <label htmlFor="bio" className="block mb-2 font-bold text-gray-900 dark:text-white text-sm">Bio</label>
                    <input type="text" id="bio" className="font-bold bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={storedUser?.bio ?? ""} onChange={(event) => setBio(event.target.value)}></input>
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
            </form >
            {/* <form onSubmit={handleUpdateProfile()} className="w-full max-w-lg">
             */
            /* <div className="p-6 card">
                        <p>
                            <span className="font-bold">Name: </span>
                            {keycloak.tokenParsed.name}
                        </p>
                        <div className="md:w-1/3">
                            <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="username">
                                Username
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <input id="username" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="text" value={username} placeholder={storedUser?.username ?? keycloak.tokenParsed.preferred_username} onChange={(event) => setUsername(event.target.value)} />
                        </div>
                        <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="picture">
                            Picture:
                            <input id="picture" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="text" value={picture} placeholder={storedUser?.picture ?? ""} onChange={(event) => setPicture(event.target.value)} />
                        </label>
                        <p>
                            <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="status">
                                Status
                            </label>
                            <input id="status" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="text" value={status} placeholder={storedUser?.status ?? ""} onChange={(event) => setStatus(event.target.value)} /></p>
                        <p>
                            <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="funFact">
                                Fun Fact
                            </label>
                            <input id="funFact" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="text" value={funFact} placeholder={storedUser?.funFact ?? ""} onChange={(event) => setFunFact(event.target.value)} /></p>
                        <p className="whitespace-normal">
                            <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="bio">
                                Bio
                            </label>
                            <textarea id="bio" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={bio} placeholder={storedUser?.bio ?? ""} onChange={(event) => setBio(event.target.value)} />
                        </p>
                        <button className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">Save</button>
                    </div> */}
        </div >

    )
}
export default ProfilePage;