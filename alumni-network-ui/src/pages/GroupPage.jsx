import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getGroupById, AddUserToGroup } from "../api/group";
import GroupPosts from "../components/Group/GroupPosts";
import { useUser } from "../context/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faCalendarAlt, faUserPlus, faUsers } from "@fortawesome/free-solid-svg-icons";
import { getEvents } from "../api/Event";


function GroupPage() {

    const { user, setUser } = useUser()
    const { groupId } = useParams();
    const [group, setGroup] = useState();
    const [updateGroups, setUpdateGroups] = useState(false);
    const [events, setEvents] = useState([]);


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

    useEffect(() => {
        const fetchEvents = async () => {
            const allEvents = await getEvents();
            console.log(allEvents)
            const groupEvents = allEvents.filter(event => event.groups[0].id === group.id);
            setEvents(groupEvents);
        };
        if (group) {
            fetchEvents();
        }
    }, [group]);


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
    if (!events) {
        return <div>Loading Events...</div>;
    }


    return (
        <div className="container mx-auto">
            <div className="justify-center flex text-center">
                <h1 className="text-3xl font-bold mb-6 mt-6 p-4 card w-1/2 rounded-lg">{group.name}</h1>
            </div>
            <div className="grid grid-cols-6 gap-4 lg:px-4">
                <div className="col-span-1 lg:block hidden">
                    <div className="h-full overflow-y-auto">
                        <p className="text-gray-400 mb-2"><FontAwesomeIcon icon={faUsers} />&nbsp;&nbsp; Members</p>
                        <ul className="">
                            {group.users &&
                                group.users.map((member) => (
                                    <li key={member.id}>
                                        <Link to={`/user/${member.id}`} className="flex items-center rounded-lg text-white hover:bg-gray-700">
                                            <small className="flex flex-shrink justify-between text-md">
                                                <span className="font-bold p-2">{member.username}</span>
                                            </small>
                                        </Link>
                                    </li>
                                ))}
                        </ul>
                    </div>
                </div>
                {/* Group information 1 */}
                <div className="order-first lg:hidden lg:order-none col-span-6">
                    <div className="lg:hidden text-center rounded-lg m-2 mr-12 ml-12 mt-12 card shadow">
                        <div className="text-center pt-2">
                            <p className="mt-2 font-medium">Description</p>
                        </div>
                        <p className="text-sm mx-6 mt-4 text-gray-400">{group.description}</p>
                        {isMember() ? (
                            <div className="text-center mt-6 mb-6 pb-6 text-sm text-green-600">Joined ✔</div>
                        ) : (
                            <form className="text-center" onSubmit={handleJoin}>
                                <button className="bg-blue-600 pl-4 pr-4 p-1 rounded mt-6 mb-6 text-sm hover:bg-blue-800">
                                    Join <FontAwesomeIcon icon={faUserPlus} />
                                </button>
                            </form>
                        )}
                    </div>
                </div>
                <div className="lg:col-span-3 xl:col-span-3 lg:mx-0 col-span-6">
                    <GroupPosts group={group} />
                </div>
                {/* Group information 2 */}
                <div className="col-span-2 lg:block text-center">
                    <div className="rounded-lg m-2 mr-12 ml-12 card shadow-lg">
                        <div className="text-center pt-2">
                            <p className="mt-2 font-medium">Description</p>
                        </div>
                        <p className="text-sm mx-6 mt-4 text-gray-400">{group.description}</p>
                        {isMember() ? (
                            <div className="text-center mt-6 mb-6 pb-6 text-sm text-green-600">Joined ✔</div>
                        ) : (
                            <form className="text-center" onSubmit={handleJoin}>
                                <button className="bg-blue-600 pl-4 pr-4 p-1 rounded mt-6 mb-6 text-sm hover:bg-blue-800 font-medium">
                                    Join <FontAwesomeIcon className="ml-1" icon={faUserPlus} />
                                </button>
                            </form>
                        )}
                    </div>
                    <div className="rounded-xl shadow-md card">
                        <div className="pt-4 px-4">
                            <div className="flex justify-between items-center p-0 m-0">
                                <p className="font-semibold text-gray-400 text-lg mb-2">
                                    <FontAwesomeIcon className="mr-2" icon={faCalendarAlt} />Upcoming Events
                                </p>
                            </div>
                        </div>
                        {events.map((event) => (
                            <Link to={`/event/${event.id}`} key={event.id}>
                                <div className="hover:bg-gray-700 p-3 px-2 border-b border-gray-700">
                                    <p className="text-lg font-semibold ml-4">{event.name}</p>
                                    <p className="text-gray-400 pt-3 pb-2 text-sm ml-4">
                                        Starts at: {event.startTime}
                                    </p>
                                    <small className="flex flex-shrink justify-between pt-2 text-gray-500 ml-4">
                                        <span className="font-semibold">Host: {event.acceptedUsers[0].username}</span>
                                        <span>Attending: {event.acceptedUsers.length}</span>
                                    </small>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GroupPage