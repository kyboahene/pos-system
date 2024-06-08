import React from "react";

const useLocalStorage = (key: string) => {
  const setItem = (value: unknown) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };

  const getItem = () => {
    try {
      let item = window.localStorage.getItem(key);
      return (item = item ? JSON.parse(item) : undefined);
    } catch (error) {
      console.log(error);
    }
  };

  const removeItem = () => {
    try {
      let item = window.localStorage.removeItem(key);
    } catch (error) {
      console.log(error);
    }
  };
  return {
    setItem,
    getItem,
    removeItem,
  };
};

export default useLocalStorage;