import { useRef, useState } from "react";
import { useUser } from "../../context/UserContext";
import keycloak from "../../keycloak";
import { storageSave } from "../../utils/storage";
import { STORAGE_KEY_USER } from "../../utils/storageKeys";
import { UpdateUser } from "../../api/user";
import updateTokenAndExecute from "../../utils/keycloakUtils";

function ProfilePage() {
    const { user, setUser } = useUser();
    const formRef = useRef();
    const [successMessage, setSuccessMessage] = useState("");

    const storedUser = user;
    const [username, setUsername] = useState(
        storedUser?.username ?? keycloak.tokenParsed.preferred_username
    );
    const [bio, setBio] = useState(storedUser?.bio ?? "");
    const [funFact, setFunFact] = useState(storedUser?.funFact ?? "");
    const [picture, setPicture] = useState(storedUser?.picture ?? "");
    const [status, setStatus] = useState(storedUser?.status ?? "");

    const handleUpdateProfile = async (event) => {
        event.preventDefault();
        try {
            await updateTokenAndExecute(async () => {
                const updatedUser = await UpdateUser(storedUser.id, {
                    username,
                    bio,
                    funFact,
                    picture,
                    status,
                });
                setUsername(updatedUser.username);
                setBio(updatedUser.bio);
                setFunFact(updatedUser.funFact);
                setPicture(updatedUser.picture);
                setStatus(updatedUser.status);
                storageSave(STORAGE_KEY_USER, updatedUser); // Update stored user data
                setUser(updatedUser);
                formRef.current.reset();
                setSuccessMessage("Profile successfully updated!");
            })
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center pt-12 text-center">
            <h3 className="pb-12 font-bold text-xl">Profile</h3>
            {successMessage && <p className="text-green-600 pb-4">{successMessage}</p>}
            <form ref={formRef} onSubmit={handleUpdateProfile}>
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label htmlFor="username" className="block mb-2 font-bold text-gray-900 dark:text-white">Username</label>
                        <input type="text" id="username" className="font-bold bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={storedUser?.username ?? keycloak.tokenParsed.preferred_username} onChange={(event) => setUsername(event.target.value)}></input>
                    </div>
                    <div>
                        <label htmlFor="last_name" className="block mb-2 font-bold text-gray-900 dark:text-white">Status</label>
                        <input type="text" id="last_name" className="font-bold bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={storedUser?.status ?? ""} onChange={(event) => setStatus(event.target.value)}></input>
                    </div>
                    <div>
                        <label htmlFor="company" className="block mb-2 font-bold text-gray-900 dark:text-white">Picture</label>
                        <input type="text" id="company" className="font-bold bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={storedUser?.picture ?? ""} onChange={(event) => setPicture(event.target.value)} ></input>
                    </div>
                    <div>
                        <label htmlFor="phone" className="block mb-2 font-bold text-gray-900 dark:text-white">Fun Fact</label>
                        <input type="tel" id="phone" className="font-bold bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={storedUser?.funFact ?? ""} onChange={(event) => setFunFact(event.target.value)} ></input>
                    </div>
                </div>
                <div className="mb-6">
                    <label htmlFor="bio" className="block mb-2 font-bold text-gray-900 dark:text-white">Bio</label>
                    <textarea rows="4" id="bio" className="resize-none font-bold bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={storedUser?.bio ?? ""} onChange={(event) => setBio(event.target.value)}></textarea>
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
            </form >
        </div >
    )
}
export default ProfilePage;