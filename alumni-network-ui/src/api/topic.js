import keycloak from "../keycloak";
import { createHeaders } from "./ApiIndex";

export const getTopics = async () => {
    try {
        // Refresh token if it is expired or will expire soon
        if (keycloak.token && keycloak.isTokenExpired()) {
            await keycloak.updateToken();
        }

        const response = await fetch("https://localhost:7240/api/v1/topic", {
            method: 'GET',
            headers: createHeaders()
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
};