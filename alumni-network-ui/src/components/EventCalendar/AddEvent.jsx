import { useEffect, useState } from "react";
import { getEvents } from "../../api/Event";
import EventCalendar from "./EventCalendar"
function AddEvent() {

    const [events, setEvents] = useState();


    useEffect(() => {
        const fetchData = async () => {
            try {
                const EventData = await getEvents();
                if (EventData) {
                    setEvents(EventData);
                }
            } catch (error) {
                console.log(error);
            }

        };
        fetchData()
    }, []);

    return (
        <div id="event-calender">
            {events && 
                <EventCalendar events={events} />
            }
        </div>
    );
}
export default AddEvent;
