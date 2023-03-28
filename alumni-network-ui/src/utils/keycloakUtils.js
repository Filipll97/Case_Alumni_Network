import keycloak from '../keycloak';

const updateTokenAndExecute = async (action) => {
  try {
    await keycloak.updateToken(5); // 5 seconds grace period
    await action();
  } catch (err) {
    if (err.isTokenExpired) {
      keycloak.logout();
    } else {
      console.error('Error executing action:', err);
    }
  }
};

export default updateTokenAndExecute;
