import React from "react"

export const GlobalContext = React.createContext({
    isLoggedIn: false,
    locale: 'en',
    theme: 'light',
    setLocale: () => {},
    toggleTheme: () => {},
});
