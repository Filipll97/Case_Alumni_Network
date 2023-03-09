import keycloak from '../keycloak';

export const getUserInfo = async () => {
    try {
        // Refresh token if it is expired or will expire soon
        if (keycloak.token && keycloak.isTokenExpired()) {
            await keycloak.updateToken();
        }

        const response = await fetch("https://localhost:7240/api/v1/Users", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + keycloak.token
            }
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
};

// export async function postUserInfo(data) {
//     const response = await fetch('https://localhost:7240/api/v1/Users', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': 'Bearer ' + keycloak.token
//         },
//         body: JSON.stringify(data)
//     });

//     if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const responseData = await response.json();
//     return responseData;
// }