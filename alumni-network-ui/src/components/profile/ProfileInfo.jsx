import { useState } from "react";
import keycloak from "../../keycloak";
import { getUserFromLocalStorage, saveUserToLocalStorage } from "../../utils/storage";

function ProfilePage() {
    const storedUser = getUserFromLocalStorage();
    console.log(storedUser.id);
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
            saveUserToLocalStorage(updatedUser); // Update stored user data
        } else {
            // handle error
        }
    };

    return (
        <div>
            <form onSubmit={handleUpdateProfile}>
                <div className="flex items-center flex-col mb-4 mt-4">
                    <div className="h-14 w-14 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl"></div>
                </div>
                <div className="flex items-center flex-col">
                    <div className="p-6 card">
                        <p><span className="font-bold">Name: </span>{keycloak.tokenParsed.name}</p>
                        <p><input className="font-semibold text-black" type="text" value={username} placeholder={storedUser?.username ?? keycloak.tokenParsed.preferred_username} onChange={(event) => setUsername(event.target.value)} /></p>
                        <p><input className="font-semibold text-black" type="text" value={status} placeholder={storedUser?.status ?? ""} onChange={(event) => setStatus(event.target.value)} /></p>
                        <p><input className="font-semibold text-black" type="text" value={funFact} placeholder={storedUser?.funFact ?? ""} onChange={(event) => setFunFact(event.target.value)} /></p>
                        <p className="whitespace-normal"><textarea className="font-semibold text-black" value={bio} placeholder={storedUser?.bio ?? ""} onChange={(event) => setBio(event.target.value)} />
                        </p>
                    </div>
                    <button type="submit">Save</button>
                </div>
            </form>
        </div >
        //             <label>
        //                 Picture:
        //                 <input type="text" value={picture} placeholder={storedUser?.picture ?? ""} onChange={(event) => setPicture(event.target.value)} />
        //             </label>
    )
}
export default ProfilePage;