import keycloak from "../keycloak"

export const createHeaders = () => {
    return {
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + keycloak.token
    }
} 