import keycloak from "../keycloak";
import { createHeaders } from "./ApiIndex";


export const getEvents = async () => {
  try {
    const response = await fetch("https://localhost:7240/api/v1/Event", {
      method: 'GET',
      headers: createHeaders()
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    if (!data || typeof data !== 'object') {
      throw new Error('Response data is empty or not in the expected format');
    }
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const AddEvent = async (eventData) => {
  try {
    const response = await fetch("https://localhost:7240/api/v1/Event", {
      method: "POST",
      headers: createHeaders(),
      body: JSON.stringify(eventData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const CreateGroupEventInvitation = async (eventId, groupId) => {
  try {
    const response = await fetch(`https://localhost:7240/api/v1/Event/${eventId}/invite/group/${groupId}`, {
      method: "POST",
      headers: createHeaders(),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response;
  } catch (error) {
    console.error(error);
  }
};