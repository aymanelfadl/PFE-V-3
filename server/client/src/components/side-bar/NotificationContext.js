import React, { useState, createContext, useContext } from 'react';

// Create a context with an initial value of 0 (zero)
const NotificationContext = createContext(0);

// Custom hook to access the notification context
export const useNotificationContext = () => {
  return useContext(NotificationContext);
};

// Notification provider component
export const NotificationProvider = ({ children }) => {
  const [notificationCount, setNotificationCount] = useState(0);

  const increaseNotificationCount = () => {
    setNotificationCount((prevCount) => prevCount + 1);
  };

  const resetNotificationCount = () => {
    setNotificationCount(0);
  };

  return (
    <NotificationContext.Provider
      value={{
        notificationCount,
        increaseNotificationCount,
        resetNotificationCount,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
