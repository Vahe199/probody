import window from 'global'
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
            isMobile: false,
            t: key => translations[props.router.locale][key] || translations[props.router.defaultLocale][key] || key,
            setLocale: this.setLocale.bind(this),
            toggleTheme: this.toggleTheme.bind(this),
            setLoggedIn: this.setLoggedIn.bind(this),
        }
    }

    componentDidMount() {
        this.setState({isMobile: window.innerWidth < 768})
    }

    setLocale(locale) {
        this.setState({locale})
    }

    setLoggedIn(isLoggedIn) {
        this.setState({isLoggedIn})
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
