import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getGroupById, AddUserToGroup } from "../api/group";
import GroupPosts from "../components/Group/GroupPosts";
import { useUser } from "../context/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faCalendarAlt, faUserPlus, faUsers } from "@fortawesome/free-solid-svg-icons";
import { getEvents } from "../api/Event";
import EventCard from "../components/event/EventCard";


function GroupPage() {

    const { user, setUser } = useUser()
    const { groupId } = useParams();
    const [group, setGroup] = useState();
    const [updateGroups, setUpdateGroups] = useState(false);
    const [events, setEvents] = useState(null);


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
            const groupEvents = allEvents.filter(event => event.groups.some(group => group.id === parseInt(groupId)));
            setEvents(groupEvents);
        };
        if (group) {
            fetchEvents();
        }
    }, [group]);


    const handleJoinGroup = async (group) => {
        group.preventDefault();
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
        console.log(group.users.map((u) => console.log(u.id, user.id)))
        return group.users.some((u) => u.id === user.id);
    }

    if (!events) {
        return <div>Loading Events...</div>;
    }


    return (
        <div className="container mx-auto">
            <div className="justify-center flex text-center lg:px-4">
                <h1 className="text-3xl font-bold mb-6 mt-6 p-4 card w-1/2 rounded-lg">{group.name}</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4 lg:px-4">
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
                {/* Group information 1
                <div className="order-first md:hidden lg:order-none col-span-6">
                    <div className="lg:hidden text-center rounded-lg m-2 mr-12 ml-12 mt-12 card shadow">
                        <div className="text-center pt-2">
                            <p className="mt-2 font-medium">Description</p>
                        </div>
                        <p className="text-sm mx-6 mt-4 text-gray-400">{group.description}</p>
                        {isMember() ? (
                            <div className="text-center mt-6 mb-6 pb-6 text-sm text-green-600">Joined ✔</div>
                        ) : (
                            <form className="text-center" onSubmit={handleJoinGroup}>
                                <button className="bg-blue-600 pl-4 pr-4 p-1 rounded mt-6 mb-6 text-sm hover:bg-blue-800">
                                    Join <FontAwesomeIcon icon={faUserPlus} />
                                </button>
                            </form>
                        )}
                    </div>
                </div> */}
                <div className="lg:col-span-3 xl:w-full lg:mx-0 col-span-4">
                    <GroupPosts group={group} />
                </div>
                {/* Group information 2 */}
                <div className="col-span-2 lg:block text-center">
                    <div className="rounded-lg ml-10 card shadow-lg">
                        <div className="text-center pt-2">
                            <p className="mt-2 font-medium">Description</p>
                        </div>
                        <p className="text-sm mx-6 mt-4 text-gray-400">{group.description}</p>
                        {isMember() ? (
                            <div className="text-center mt-6 mb-6 pb-6 text-sm text-green-600">Joined ✔</div>
                        ) : (
                            <form className="text-center" onSubmit={handleJoinGroup}>
                                <button className="bg-blue-600 pl-4 pr-4 p-1 rounded mt-6 mb-6 text-sm hover:bg-blue-800 font-medium">
                                    Join <FontAwesomeIcon className="ml-1" icon={faUserPlus} />
                                </button>
                            </form>
                        )}
                    </div>
                    <div className="rounded-xl shadow-md card flex flex-col ml-10">
                        <div className="pt-4 px-4">
                            <div className="flex justify-between items-center p-0 m-0">
                                <p className="font-semibold text-gray-400 text-lg mb-2">
                                    <FontAwesomeIcon className="mr-2" icon={faCalendarAlt} />Upcoming Events
                                </p>
                            </div>
                        </div>
                        {events && events.map((event, index) => (
                            <EventCard key={event.id} event={event} isLast={index === events.length - 1} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GroupPage