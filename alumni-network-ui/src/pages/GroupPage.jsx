import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGroupById } from "../api/group";
import PostList from "../components/Post/PostList";
import { useUser } from "../context/UserContext";


function GroupPage() {

    const { user, setUser } = useUser()
    const { groupId } = useParams();
    const [group, setGroup] = useState();

    useEffect(() => {
        if (user) {
            const fetchData = async () => {
                try {
                    const groupData = await getGroupById(groupId);
                    if (groupData) {
                        setGroup(groupData[0]);
                    }
                } catch (error) {
                    console.log(error);
                }

            };
            fetchData()
        }
    }, []);


    const handleJoin = async (event) => {
        event.preventDefault();

        if (isMember() == "Join") {
            console.log(user, group)
        }
    }

    function isMember() {
        return group.users.some((u) => u.id === user.userId) ? "Leave" : "Join";
    }

    if (!group) {
        return <div>Loading Group...</div>;
    }

    return (
        <div className="grid grid-rows-3 grid-flow-col gap-4">
            <PostList posts={group.posts} />
            <div className="row-span-2 rounded-lg m-2 mr-12 ml-12 mt-16 bg-gray-800">
                <div className="text-center">
                    <p className="mb-2 mt-2 text-lg font-semibold text-gray-200">{group.name}</p>
                </div>
                <p className="text-sm m-6 text-gray-400">{group.description}</p>
                <form className="text-center" onSubmit={handleJoin}>
                    <button className="bg-blue-600 pl-4 pr-4 p-1 rounded mt-6 mb-6 text-sm hover:bg-blue-800">{isMember()}</button>
                </form>
            </div>
        </div>
    );

}

export default GroupPage