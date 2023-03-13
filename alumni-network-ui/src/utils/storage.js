const STORAGE_KEY_USER = 'user';

export const saveUserToLocalStorage = (user) => {
  localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
};

export const getUserFromLocalStorage = () => {
  const userJson = localStorage.getItem(STORAGE_KEY_USER);
  return userJson ? JSON.parse(userJson) : null;
};

export const removeItemFromLocalStorage = (key) => {
  localStorage.removeItem(key);
}