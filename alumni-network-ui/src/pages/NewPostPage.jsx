import { useEffect, useState, useRef } from "react";
import { getGroups } from "../api/group";
import { createPost } from "../api/post";
import { useUser } from "../context/UserContext";

function NewPostPage() {
    const { user, setUser } = useUser();
    const [groups, setGroups] = useState([]);
    const [postData, setPostData] = useState({
        title: "",
        body: "",
        groupId: 0,
    });
    const [successMessage, setSuccessMessage] = useState("");
    const formRef = useRef();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getGroups();
                console.log(response)
                if (response) {
                    setGroups(response);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [user]);

    async function handleNewPost(event) {
        event.preventDefault();
        console.log(postData)
        try {
            const response = await createPost(postData);
            console.log("Response: ", response);

            formRef.current.reset();
            setPostData({
                title: "",
                body: "",
                groupId: 0,
            });
            setSuccessMessage("Post successfully created!");
        } catch (error) {
            console.error(error);
        }
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setPostData((prevData) => ({ ...prevData, [name]: value }));
    }

    return (
        <div className="flex flex-col justify-center items-center pt-12 text-center">
            <h3 className="pb-12 font-bold text-xl">New Post</h3>
            {successMessage && <p className="text-green-600 pb-4">{successMessage}</p>}
            <form ref={formRef} onSubmit={handleNewPost}>
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label htmlFor="title" className="block mb-2 font-bold text-gray-900 dark:text-white">Title</label>
                        <input onChange={handleChange} type="text" id="title" name="title" className="font-bold bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=""></input>
                    </div>
                    <div>
                        <label htmlFor="group" className="block mb-2 font-bold text-gray-900 dark:text-white">Group</label>
                        <select onChange={handleChange} id="group" name="groupId" className="font-bold bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            {groups && groups.map(group => (
                                <option key={group.id} value={group.id}>{group.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="mb-6">
                    <label htmlFor="body" className="block mb-2 font-bold text-gray-900 dark:text-white">Body</label>
                    <textarea onChange={handleChange} rows="4" id="body" name="body" className="resize-none font-bold bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=""></textarea>
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Post</button>
            </form>
        </div>
    );
}

export default NewPostPage