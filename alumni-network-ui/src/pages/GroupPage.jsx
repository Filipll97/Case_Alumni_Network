import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getGroupById, AddUserToGroup } from "../api/group";
import GroupPosts from "../components/Group/GroupPosts";
import { useUser } from "../context/UserContext";


function GroupPage() {

    const { user, setUser } = useUser()
    const { groupId } = useParams();
    const [group, setGroup] = useState();
    const [updateGroups, setUpdateGroups] = useState(false);

    useEffect(() => {
        if (user) {
            const fetchData = async () => {
                try {
                    const groupData = await getGroupById(groupId);
                    if (groupData) {
                        setGroup(groupData[0]);
                    }
                    if (updateGroups) {
                        setUpdateGroups(false);
                    }
                } catch (error) {
                    console.log(error);
                }

            };
            fetchData()

        }
    }, [user, updateGroups]);


    const handleJoin = async (event) => {
        event.preventDefault();
        try {
            const response = await AddUserToGroup(groupId);
            console.log(response)
            setUpdateGroups(true);
        }
        catch (error) {
            console.error(error);
        }
    }


    function isMember() {
        if (!group) {
            return false;
        }
        return group.users.some((u) => u.id === user.id);
    }

    if (!group) {
        return <div>Loading Group...</div>;
    }


    return (
        <div className="container mx-auto">
            <div className="text-center">
                <h1 className="text-3xl font-bold mb-6 mt-6">{group.name}</h1>
            </div>
            <div className="grid grid-cols-6 gap-4 lg:px-4">
                <div className="col-span-1 lg:block hidden">
                    <div className="h-full overflow-y-auto">
                        <p className="text-gray-400 mt-4 mb-2">Members</p>
                        <ul className="space-y-2">
                            {group.users &&
                                group.users.map((member) => (
                                    <li key={member.id}>
                                        <Link to={`/user/${member.id}`} className="flex items-center text-base font-normal rounded-lg text-white hover:bg-gray-700">
                                            <small className="flex flex-shrink justify-between text-md">
                                                <span className="font-medium p-2">{member.username}</span>
                                            </small>
                                        </Link>
                                    </li>
                                ))}
                        </ul>
                    </div>
                </div>
                {/* Group information 1 */}
                <div className="order-first lg:hidden lg:order-none col-span-6">
                    <div className="lg:hidden text-center rounded-lg m-2 mr-12 ml-12 mt-16 card">
                        <div className="text-center pt-2">
                            <p className="mt-2 font-medium">Description</p>
                        </div>
                        <p className="text-sm mx-6 mt-4 text-gray-400">{group.description}</p>
                        {isMember() ? (
                            <div className="text-center mt-6 mb-6 pb-6 text-sm text-green-600">Joined ✔</div>
                        ) : (
                            <form className="text-center" onSubmit={handleJoin}>
                                <button className="bg-blue-600 pl-4 pr-4 p-1 rounded mt-6 mb-6 text-sm hover:bg-blue-800">Join</button>
                            </form>
                        )}
                    </div>
                </div>
                <div className="lg:col-span-3 xl:col-span-3 lg:mx-0 col-span-6">
                    <GroupPosts group={group} />
                </div>
                {/* Group information 2 */}
                <div className="col-span-2 lg:block hidden">
                    <div className="rounded-lg m-2 mr-12 ml-12 mt-16 card">
                        <div className="text-center pt-2">
                            <p className="mt-2 font-medium">Description</p>
                        </div>
                        <p className="text-sm mx-6 mt-4 text-gray-400">{group.description}</p>
                        {isMember() ? (
                            <div className="text-center mt-6 mb-6 pb-6 text-sm text-green-600">Joined ✔</div>
                        ) : (
                            <form className="text-center" onSubmit={handleJoin}>
                                <button className="bg-blue-600 pl-4 pr-4 p-1 rounded mt-6 mb-6 text-sm hover:bg-blue-800">Join</button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GroupPage