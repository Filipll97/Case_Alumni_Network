import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { AddEvent, CreateGroupEventInvitation } from "../api/Event";
import { useUser } from "../context/UserContext";

function NewEventPage() {
    const { groupId } = useParams();
    const { user } = useUser();
    const [eventData, setEventData] = useState({
        name: "",
        description: "",
        allowGuests: true,
        bannerImage: "",
        startTime: "",
        endTime: "",
        groupId: parseInt(groupId),
    });

    const formRef = useRef();
    const [successMessage, setSuccessMessage] = useState("");

    async function handleNewEvent(event) {
        event.preventDefault();
        try {
            const response = await AddEvent(eventData);
            const response2 = await CreateGroupEventInvitation(response.id, parseInt(groupId));
            console.log(response2)
            formRef.current.reset();
            setEventData({
                name: "",
                description: "",
                allowGuests: true,
                bannerImage: "",
                startTime: "",
                endTime: "",
                groupId: parseInt(groupId),
            });
            setSuccessMessage("Event successfully created!");
        } catch (error) {
            console.error(error);
        }
    }

    function handleChange(event) {
        const { name, value, type, checked } = event.target;

        if (type === "checkbox") {
            setEventData((prevData) => ({ ...prevData, [name]: checked }));
        } else {
            setEventData((prevData) => ({ ...prevData, [name]: value }));
        }
    }

    return (
        <div className="flex flex-col justify-center items-center pt-12 text-center">
            <h3 className="pb-12 font-bold text-xl">New Event</h3>
            {successMessage && <p className="text-green-600 pb-4">{successMessage}</p>}
            <form ref={formRef} onSubmit={handleNewEvent} className="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                    <label htmlFor="name" className="block mb-2 font-bold text-gray-900 dark:text-white">Name</label>
                    <input onChange={handleChange} type="text" id="name" name="name" className="font-bold bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=""></input>
                </div>
                <div>
                    <label htmlFor="description" className="block mb-2 font-bold text-gray-900 dark:text-white">Description</label>
                    <textarea onChange={handleChange} rows="4" id="description" name="description" className="resize-none font-bold bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=""></textarea>
                </div>
                <div>
                    <label htmlFor="startTime" className="block mb-2 font-bold text-gray-900 dark:text-white">Start Time</label>
                    <input onChange={handleChange} type="datetime-local" id="startTime" name="startTime" className="font-bold bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
                </div>
                <div>
                    <label htmlFor="endTime" className="block mb-2 font-bold text-gray-900 dark:text-white">End Time</label>
                    <input onChange={handleChange} type="datetime-local" id="endTime" name="endTime" className="font-bold bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
                </div>
                <div className="mt-4 flex items-center">
                    <input onChange={handleChange} type="checkbox" id="allowGuests" name="allowGuests" className="mr-2" style={{ width: '20px', height: '20px' }} />
                    <label htmlFor="allowGuests" className="font-bold text-gray-900 dark:text-white">Allow Guests</label>
                </div>
                <div>
                    <label htmlFor="bannerImage" className="block mb-2 font-bold text-gray-900 dark:text-white">Banner Image URL</label>
                    <input onChange={handleChange} type="text" id="bannerImage" name="bannerImage" className="font-bold bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=""></input>
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create Event</button>
            </form >
        </div >
    );
}
export default NewEventPage;
