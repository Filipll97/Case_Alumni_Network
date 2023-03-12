import { useState } from "react";
import keycloak from "../keycloak";
import { getUserFromLocalStorage, saveUserToLocalStorage } from "../utils/storage";

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
            <h1>Profile Page</h1>
            {keycloak.tokenParsed && (
                <form onSubmit={handleUpdateProfile}>
                    <h4>User</h4>
                    <p>
                        Name: {keycloak.tokenParsed.name}
                    </p>
                    <label>
                        Username:
                        <input type="text" value={username} placeholder={storedUser?.username ?? keycloak.tokenParsed.preferred_username} onChange={(event) => setUsername(event.target.value)} />
                    </label>
                    <label>
                        Picture:
                        <input type="text" value={picture} placeholder={storedUser?.picture ?? ""} onChange={(event) => setPicture(event.target.value)} />
                    </label>
                    <label>
                        Status:
                        <input type="text" value={status} placeholder={storedUser?.status ?? ""} onChange={(event) => setStatus(event.target.value)} />
                    </label>
                    <label>
                        Bio:
                        <textarea value={bio} placeholder={storedUser?.bio ?? ""} onChange={(event) => setBio(event.target.value)} />
                    </label>
                    <label>
                        Fun Fact:
                        <input type="text" value={funFact} placeholder={storedUser?.funFact ?? ""} onChange={(event) => setFunFact(event.target.value)} />
                    </label>
                    <button type="submit">Save</button>
                </form>
            )}
        </div>
    );
}

export default ProfilePage;
