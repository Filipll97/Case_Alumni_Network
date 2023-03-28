import keycloak from '../keycloak';
import { createHeaders } from "./ApiIndex";

export const getUserInfo = async () => {
  try {
    const response = await fetch("https://localhost:7240/api/v1/Users", {
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


export const getUserById = async (userId) => {
  try {
    const response = await fetch(`https://localhost:7240/api/v1/Users/${userId}`, {
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

export async function GetUserByName(data) {
  const response = await fetch('https://localhost:7240/api/v1/Users/users', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + keycloak.token
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const responseData = await response.json();
  return responseData;
}


export const UpdateUser = async (userId, data) => {
  const response = await fetch(`https://localhost:7240/api/v1/Users/${userId}`, {
    method: "PUT",
    headers: createHeaders(),
    body: JSON.stringify(data)
  });
  if (response.ok) {
    const updatedUser = await response.json();
    return updatedUser;
  } else {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
};