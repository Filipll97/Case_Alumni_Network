import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useNavigate } from 'react-router-dom';

function EventCalendar({ events }) {
  const [calendarEvents, setCalendarEvents] = useState([]);
  const navigate  = useNavigate();

  useEffect(() => {
    const formattedEvents = events.map((event) => ({
      title: event.name,
      body: event.Description,
      start: event.startTime,
      end: event.endTime,
      allDay: true,
      eventId: event.id,
    }));
    setCalendarEvents(formattedEvents);
  }, [events]);

  const handleEventClick = (info) => {
    const eventId = info.event.extendedProps.eventId;
    navigate(`/event/${eventId}`);
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