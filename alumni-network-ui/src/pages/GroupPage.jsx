import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getGroupById } from "../api/group";
import GroupPosts from "../components/Group/GroupPosts";
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
    }, [user]);


    const handleJoin = async (event) => {
        event.preventDefault();

        if (isMember() == "Join") {
            // joina groupen
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
        <div className="grid grid-rows-3 grid-flow-col gap-4">
            <div className="row-span-2 rounded-lg">
                <aside id="default-sidebar" className="fixed top-25 left-0 z-40 w-56 h-screen transition-transform -translate-x-full lg:translate-x-0" aria-label="Sidebar">
                    <div className="h-full overflow-y-auto">
                        <p className="text-gray-400 mt-4 px-4 mb-2">Members</p>
                        <ul className="space-y-2">
                            {group.users &&
                                group.users.map((member) => (
                                    <li key={member.id}>
                                        <Link to={`/user/${member.id}`} className="flex items-center text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                            <small className="flex flex-shrink justify-between p-2 text-md">
                                                <span>{member.username}</span>
                                            </small>
                                        </Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </aside>
            </div>
            <GroupPosts group={group} />
            <div className="row-span-2 rounded-lg m-2 mr-12 ml-12 mt-16 card">
                <div className="text-center">
                    <p className="mb-2 mt-2 text-lg font-semibold text-gray-200">{group.name}</p>
                </div>
                <p className="text-sm m-6 text-gray-400">{group.description}</p>
                {
                    isMember() ? (
                        <div className="text-center mt-6 mb-6 text-sm text-green-600">
                            Joined ✔
                        </div>
                    ) : (
                        <form className="text-center" onSubmit={handleJoin}>
                            <button className="bg-blue-600 pl-4 pr-4 p-1 rounded mt-6 mb-6 text-sm hover:bg-blue-800">
                                Join
                            </button>
                        </form>
                    )}
            </div>

        </div>
    );
}

export default GroupPage