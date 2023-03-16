import EventCalendar from "./EventCalendar"
import "../../App.css"
function AddEventCalendar() {

    const events = [
        {
        title: 'Event 1',
        start: '2023-03-18',
        end: '2023-03-20',
        },
        {
        title: 'Event 2',
        start: '2023-03-22',
        end: '2023-03-22',
        },
    ];
    return (
        <div id="event-calender">
            <EventCalendar events={events} />
        </div>

    );
}
export default AddEventCalendar;
