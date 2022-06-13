import React from "react"

export const GlobalContext = React.createContext({
    isLoggedIn: false,
    theme: 'light',
    isMobile: false,
    t: Function.prototype,
    setLocale: Function.prototype,
    toggleTheme: Function.prototype,
    setLoggedIn: Function.prototype,
    openModal: Function.prototype,
});
