import '../styles/globals.scss'
import Footer from "../components/Footer"
import Navbar from "../components/Navbar.jsx"
import {GlobalContext} from "../contexts/Global"
import React from "react"

import en from '../locales/en'
import ru from '../locales/ru'
import kz from '../locales/kz'

const translations = {
    en,
    ru,
    kz
}

class ProbodyApp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoggedIn: false,
            theme: 'light',
            t: key => translations[props.router.locale][key] || translations[props.router.defaultLocale][key] || key,
            setLocale: this.setLocale.bind(this),
            toggleTheme: this.toggleTheme.bind(this)
        }
    }

    setLocale(locale) {
        this.setState({locale})
    }

    toggleTheme() {
        this.setState({theme: this.state.theme === 'light' ? 'dark' : 'light'})
    }

    render() {
        const {Component, pageProps} = this.props;

        return (<GlobalContext.Provider value={this.state}>
                <Navbar/>
                <Component {...pageProps} />
                <Footer/>
            </GlobalContext.Provider>
        )
    }
}

export default (ProbodyApp)
