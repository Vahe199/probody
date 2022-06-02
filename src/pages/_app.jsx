import window from 'global'
import '../styles/globals.scss'
import Footer from "../components/Footer"
import Navbar from "../components/Navbar.jsx"
import {GlobalContext} from "../contexts/Global"
import React from "react"

import en from '../locales/en'
import ru from '../locales/ru'
import kz from '../locales/kz'
import AboutUsSection from "../components/AboutUsSection.jsx";
import Cookie from "../helpers/Cookie.js";
import {DateTime} from "luxon";

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

        this.computeIsMobile = this.computeIsMobile.bind(this)
    }

    componentDidMount() {
        this.computeIsMobile()

        window.addEventListener('resize', this.computeIsMobile);
    }

    computeIsMobile() {
        this.setState({isMobile: window.document.body.clientWidth < 768})
    }

    setLocale(locale) {
        const { pathname, asPath, query } = this.props.router

        this.props.router.push({ pathname, query }, asPath, { locale });
        (new Cookie('NEXT_LOCALE', locale, {
            expires: DateTime.now().plus({years: 10}).toJSDate()
        })).set()
    }

    setLoggedIn(isLoggedIn) {
        this.setState({isLoggedIn})
    }

    toggleTheme() {
        this.setState({theme: this.state.theme === 'light' ? 'dark' : 'light'})
    }

    render() {
        const {Component: Page, pageProps} = this.props;

        return (<GlobalContext.Provider value={this.state}>
                <Navbar/>
                <div className={'container'}>
                    <Page {...pageProps} />
                </div>
                <AboutUsSection />
                <Footer/>
            </GlobalContext.Provider>
        )
    }
}

export default (ProbodyApp)
