import keycloak from "../keycloak";
import { createHeaders } from "./ApiIndex";


export const getGroups = async () => {
  try {
    const response = await fetch("https://localhost:7240/api/v1/Groups", {
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

export const getGroupById = async (groupId) => {
  try {
    const response = await fetch(`https://localhost:7240/api/v1/groups/${groupId}`, {
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

export const AddUserToGroup = async (groupId) => {
  try {
    const response = await fetch(`https://localhost:7240/api/v1/groups/${groupId}/join`, {
      method: 'POST',
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

export const CreateGroup = async (groupData) => {
  try {
    const response = await fetch(`https://localhost:7240/api/v1/groups`, {
      method: 'POST',
      headers: createHeaders(),
      body: JSON.stringify(groupData)
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
