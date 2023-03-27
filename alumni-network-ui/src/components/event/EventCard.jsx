import React from "react";
import { Link } from "react-router-dom";

function EventCard({ event, isLast }) {
    return (
        <div key={event.id}>
            <Link to={`/event/${event.id}`} key={event.id}>
                <div
                    className={`hover:bg-gray-700 hover: rounded-lg p-3 px-2 border-b border-gray-700 ${
                        isLast ? "border-none" : ""
                    }`}
                >
                    <p className="text-lg font-semibold ml-4">{event.name}</p>
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
        </div>
    );
}
export default EventCard;
