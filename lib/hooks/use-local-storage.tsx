const useLocalStorage = (key: string) => {
  const setItem = (value: unknown) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      throw error;
    }
  };

  const getItem = () => {
    try {
      let item = window.localStorage.getItem(key);
      return (item = item ? JSON.parse(item) : undefined);
    } catch (error) {
      throw error;
    }
  };

  const removeItem = () => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      throw error;
    }
  };
  return {
    setItem,
    getItem,
    removeItem,
  };
};

export default useLocalStorage;
