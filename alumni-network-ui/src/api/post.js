import keycloak from "../keycloak";
import { createHeaders } from "./ApiIndex";

export const getUserPosts = async () => {
  try {
    const response = await fetch("https://localhost:7240/api/v1/Posts", {
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

export const getPostById = async (postId) => {
  try {
    const response = await fetch(`https://localhost:7240/api/v1/Posts/user/${postId}`, {
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

export const getGroupPosts = async (groupId) => {
  try {
    const response = await fetch(`https://localhost:7240/api/v1/posts/group/${groupId}`, {
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

export const getEventPosts = async (eventId) => {
  try {
    const response = await fetch(`https://localhost:7240/api/v1/posts/event/${eventId}`, {
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


export const createPost = async (postData) => {
  try {
    const response = await fetch(`https://localhost:7240/api/v1/Posts`, {
      method: "POST",
      headers: createHeaders(),
      body: JSON.stringify(postData)
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