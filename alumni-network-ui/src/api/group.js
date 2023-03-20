import keycloak from "../keycloak";
import { createHeaders } from "./ApiIndex";


export const getGroups = async () => {
    try {
        // Refresh token if it is expired or will expire soon
        if (keycloak.token && keycloak.isTokenExpired()) {
            await keycloak.updateToken();
        }

        const response = await fetch("https://localhost:7240/api/v1/Groups", {
            method: 'GET',
            headers: createHeaders()
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
};

export const getGroupById = async (groupId) => {
    try {
        // Refresh token if it is expired or will expire soon
        if (keycloak.token && keycloak.isTokenExpired()) {
            await keycloak.updateToken();
        }

        const response = await fetch(`https://localhost:7240/api/v1/Groups/${groupId}`, {
            method: 'GET',
            headers: createHeaders()
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
};