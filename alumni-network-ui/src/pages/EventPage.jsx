import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getEvents } from "../api/Event";
import EventPosts from "../components/event/EventPosts";
import { useUser } from "../context/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EventCard from "../components/event/EventCard";

import {
    faCalendar,
    faCalendarAlt,
    faUserPlus,
    faUsers,
} from "@fortawesome/free-solid-svg-icons";

function EventPage() {
    const { user, setUser } = useUser();
    const { eventId } = useParams();
    const [event, setEvent] = useState();
    const [updateEvents, setUpdateEvents] = useState(false);
    const [events, setEvents] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            const allEvents = await getEvents();
            const relatedEvents = allEvents.filter(
                (e) => e.id !== parseInt(eventId)
            );
            setEvents(relatedEvents);
        };
        if (event) {
            fetchEvents();
        }
    }, [event]);

    useEffect(() => {
        console.log(event);
        if (user) {
            const fetchData = async () => {
                try {
                    const eventData = await getEvents();
                    if (eventData) {
                        setEvent(eventData[eventId - 1]);
                    }
                    if (updateEvents) {
                        setUpdateEvents(false);
                    }
                } catch (error) {
                    console.log(error);
                }
            };
            fetchData();
        }
    }, [user, updateEvents]);

    return (
        <div className="container mx-auto">
            {event && (
                <>
                    <div className="justify-center flex text-center lg:px-4">
                        <h1 className="text-3xl font-bold mb-6 mt-6 p-4 card w-1/2 rounded-lg">
                            {event.name}
                        </h1>
                    </div>
                    <div className="flex flex-col lg:flex-row">
                        <div className="col-span-1 lg:block hidden">
                            <div className="h-full overflow-y-auto">
                                <p className="text-gray-400 mb-2">
                                    <FontAwesomeIcon icon={faUsers} />
                                    &nbsp;&nbsp; Going
                                </p>
                                <ul className="">
                                    {event.acceptedUsers &&
                                        event.acceptedUsers.map((member) => (
                                            <li key={member.id}>
                                                <Link
                                                    to={`/user/${member.id}`}
                                                    className="flex items-center rounded-lg text-white hover:bg-gray-700"
                                                >
                                                    <small className="flex flex-shrink justify-between text-md">
                                                        <span className="font-bold p-2">
                                                            {member.username}
                                                        </span>
                                                    </small>
                                                </Link>
                                            </li>
                                        ))}
                                </ul>
                            </div>
                        </div>
                        <div className="lg:w-2/3 lg:pl-4">
                            <div className="flex flex-col lg:flex-row lg:items-start">
                                <div className="lg:pl-4 flex-1">
                                    <EventPosts event={event} />
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-1/3 lg:pr-4">
                            <div className="rounded-xl shadow-md card p-4">
                                <div className="flex justify-between items-center mb-4">
                                    <p className="font-semibold text-white text-lg">
                                        <FontAwesomeIcon
                                            className="mr-2"
                                            icon={faCalendarAlt}
                                        />
                                        {event.name}
                                    </p>
                                </div>
                                {event &&
                                        <Link to={`/event/${event.id}`} key={event.id}>
                                        <div className="hover:bg-gray-700 hover: rounded-lg px-2 border-gray-700 border-none">
                                            <p className="text-gray-400 pb-2 text-sm ml-4"> {event.description} </p>
                                            <p className="text-gray-400 pt-3 pb-2 text-sm ml-4">
                                                Starts at: {event.startTime}
                                            </p>
                                            <small className="flex flex-shrink justify-between pt-2 text-gray-500 ml-4">
                                                <span className="font-semibold">
                                                    Host: {event.acceptedUsers[0].username}
                                                </span>
                                                <span>Attending: {event.acceptedUsers.length}</span>
                                            </small>
                                        </div>
                                    </Link>
                                    }
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default EventPage;