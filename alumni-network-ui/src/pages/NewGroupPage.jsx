import { useEffect, useRef, useState } from "react";
import { CreateGroup } from "../api/group";
import { GetUserByName } from "../api/user";
import { useUser } from "../context/UserContext";
import updateTokenAndExecute from "../utils/keycloakUtils";

function NewPostPage() {
    const { user, setUser } = useUser();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [groupData, setGroupData] = useState({
        Name: "",
        Description: "",
        IsPrivate: false,
        "users": [
            {
                "id": user.id
            }
        ]
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                await updateTokenAndExecute(async () => {
                    const response = await GetUserByName();
                    if (response) {
                        setUsers(response);
                        setLoading(false);
                    }
                })
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [user]);

    const [successMessage, setSuccessMessage] = useState("");
    const formRef = useRef();
    async function handleNewGroup(group) {
        group.preventDefault();
        try {
            await updateTokenAndExecute(async () => {
                const response = await CreateGroup(groupData);
                console.log("Response: ", response);

                formRef.current.reset();
                setGroupData({
                    Name: "",
                    Description: "",
                    IsPrivate: false,
                    "users": [
                        {
                            "id": user.id
                        }
                    ]
                });
            })
            setSuccessMessage("Group successfully created!");
        } catch (error) {
            console.error(error);
        }
    }

    function handleChange(event) {
        const { name, value, type, checked } = event.target;

        if (name === "users") {
            if (type === "checkbox" && checked) {
                setGroupData((prevData) => ({ ...prevData, users: [...prevData.users, { id: parseInt(value) }] }));
            } else if (type === "checkbox" && !checked) {
                setGroupData((prevData) => ({ ...prevData, users: prevData.users.filter(user => user.id !== parseInt(value)) }));
            }
        } else if (name === "IsPrivate") {
            setGroupData((prevData) => ({ ...prevData, [name]: checked }));
        } else {
            setGroupData((prevData) => ({ ...prevData, [name]: value }));
        }
    }

    return (
        <div className="flex flex-col justify-center items-center pt-12 text-center">
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <h3 className="pb-12 font-bold text-xl">New group</h3>
                    {successMessage && <p className="text-green-600 pb-4">{successMessage}</p>}
                    <form ref={formRef} onSubmit={handleNewGroup}>
                        <div className="grid gap-6 mb-6 md:grid-cols-2">
                            <div>
                                <label htmlFor="Name" className="block mb-2 font-bold text-gray-900 dark:text-white">Name</label>
                                <input onChange={handleChange} type="text" id="Name" name="Name" className="font-bold bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=""></input>
                                <div className="mt-4 flex items-center">
                                    <input onChange={handleChange} type="checkbox" id="IsPrivate" name="IsPrivate" className="mr-2" style={{ width: '20px', height: '20px' }} />
                                    <label htmlFor="IsPrivate" className="font-bold text-gray-900 dark:text-white">Private</label>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="users" className="block mb-2 font-bold text-gray-900 dark:text-white">Users</label>
                                <div className="font-bold bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" style={{ maxHeight: '6rem', overflowY: 'auto', paddingRight: '8px' }}>
                                    {users && users.map(userI => (
                                        <div key={userI.username} className="flex items-center">
                                            <input onChange={handleChange} type="checkbox" id={`user-${userI.id}`} name="users" value={userI.id} className="mr-2" />
                                            <label htmlFor={`user-${userI.id}`}>{userI.username}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="mb-6">
                            <label htmlFor="Description" className="block mb-2 font-bold text-gray-900 dark:text-white">Body</label>
                            <textarea onChange={handleChange} rows="4" id="Description" name="Description" className="resize-none font-bold bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=""></textarea>
                        </div>
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Post</button>
                    </form>
                </>)}
        </div>
    );
}

export default NewPostPage




// function handleChange(group) {
//     const { name, value } = group.target;
//     setGroupData((prevData) => ({ ...prevData, [name]: value }));
// }

// return (
//     <div className="flex flex-col justify-center items-center pt-12 text-center">
//         <h3 className="pb-12 font-bold text-xl">New group</h3>
//         <form onSubmit={handleNewGroup}>
//             <div className="grid gap-6 mb-6 md:grid-cols-2">
//                 <div>
//                     <label htmlFor="Name" className="block mb-2 font-bold text-gray-900 dark:text-white">Name</label>
//                     <input onChange={handleChange} type="text" id="Name" name="Name" className="font-bold bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=""></input>
//                 </div>
//                 <div>
//                     <label htmlFor="users" className="block mb-2 font-bold text-gray-900 dark:text-white">Users</label>
//                     <select onChange={handleChange} id="users" name="users" className="font-bold bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
//                         {users && users.map(userI => (
//                             <option key={userI.username} value={userI.username}>{userI.username}</option>
//                         ))}
//                     </select>
//                 </div>
//             </div>
//             <div className="mb-6">
//                 <label htmlFor="Description" className="block mb-2 font-bold text-gray-900 dark:text-white">Body</label>
//                 <textarea onChange={handleChange} rows="4" id="Description" name="Description" className="resize-none font-bold bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=""></textarea>
//             </div>
//             <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Post</button>
//         </form>
//     </div>
// );
// }

// export default NewPostPage