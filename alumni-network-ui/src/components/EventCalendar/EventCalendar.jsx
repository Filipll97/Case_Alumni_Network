import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

function EventCalendar({ events }) {
  const [calendarEvents, setCalendarEvents] = useState([]);

  useEffect(() => {
    // Format the events data to be compatible with FullCalendar
    const formattedEvents = events.map((event) => ({
      title: event.title,
      start: event.start,
      end: event.end,
      allDay: true,
    }));
    setCalendarEvents(formattedEvents);
  }, [events]);

  const handleEventClick = (info) => {
    // Handle event click here
    console.log(info.event);
  };

  return (
    <div className="container mx-auto my-8">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={calendarEvents}
        eventClick={handleEventClick}
        headerToolbar={{
          start: 'title',
          center: '',
          end: 'today prev,next',
        }}
      />
    </div>
  );
}

export default EventCalendar;