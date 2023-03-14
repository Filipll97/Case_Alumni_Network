const validateKey = key => {
  if (!key || typeof key !== "string") {
    throw new Error("Invalid storage key provided")
  }
}

export const storageSave = (key, value) => {
  validateKey(key);

  console.log(value)


  if (!value) {
    throw new Error("storageSave: No value provided for " + key)
  }

  localStorage.setItem(key, JSON.stringify(value))

  // localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
};

export const storageRead = (key) => {

  validateKey(key);
  const userJson = localStorage.getItem(key);
  return userJson ? JSON.parse(userJson) : null;

};

export const storageDelete = (key) => {
  validateKey(key);
  localStorage.removeItem(key);
}