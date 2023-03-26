import keycloak from "../keycloak";
import { createHeaders } from "./ApiIndex";


export const getEvents = async () => {
  try {
    if (keycloak.token && keycloak.isTokenExpired()) {
      await keycloak.updateToken();
    }

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