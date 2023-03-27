import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEvents } from "../api/Event";
import EventPosts from "../components/event/EventPosts";

import { useUser } from "../context/UserContext";


function EventPage() {

    const { user, setUser } = useUser();
    const { eventId } = useParams();
    const [event, setEvent] = useState();
    const [updateEvents, setUpdateEvents] = useState(false);
    console.log(eventId);

    useEffect(() => {
        console.log(event)
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
            fetchData()

        }
    }, [user, updateEvents]);

    return (
        <div className="container mx-auto">
            {event && (
                <>
                    <div className="text-center">
                        <h1 className="text-3xl font-bold mb-6 mt-6">{event.name}</h1>
                    </div>

                    <div className="grid grid-cols-6 gap-4 lg:px-4">
                        <div className="col-span-1 lg:block hidden">
                     
                        </div>
                        <div className="order-first lg:hidden lg:order-none col-span-6">
                            <div className="lg:hidden text-center rounded-lg m-2 mr-12 ml-12 mt-16 card shadow">
                                <div className="text-center pt-2">
                                    <p className="mt-2 font-medium">Description</p>
                                </div>
                                <p className="text-sm mx-6 mt-4 text-gray-400">{event.description}</p>
                            </div>
                        </div>
                        <div className="lg:col-span-3 xl:col-span-3 lg:mx-0 col-span-6">
                            <EventPosts event={event} />
                        </div>
                    </div>
                </>
            )}
        </div >
    )
}

export default EventPage