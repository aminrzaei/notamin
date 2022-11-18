export const getLocalStorageValue = (key: string) => {
  const jsonValue = localStorage.getItem(key) || "[]";
  return JSON.parse(jsonValue);
};

export const setLocalStorageValue = (key: string, value: string): void =>
  localStorage.setItem(key, value);
