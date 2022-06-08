import window from 'global'
import '../styles/globals.scss'
import Footer from "../components/Footer"
import Navbar from "../components/Navbar.jsx"
import AboutUsSection from "../components/AboutUsSection.jsx";
import {GlobalContext} from "../contexts/Global"
import React from "react"

import en from '../locales/en'
import ru from '../locales/ru'
import kz from '../locales/kz'
import Cookie from "../helpers/Cookie.js";
import {DateTime, Settings} from "luxon";

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
            theme: 'dark',
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

        Settings.defaultLocale = this.props.router.locale

        const storedTheme = localStorage.getItem('APP_THEME')

        if (storedTheme) {
            this.setState({theme: storedTheme})
        } else {
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                this.setState({
                    theme: 'dark'
                })
            } else {
                this.setState({
                    theme: 'light'
                })
            }

            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
                const newColorScheme = event.matches ? "dark" : "light";

                this.setState({
                    theme: newColorScheme
                })
            });
        }

        window.addEventListener('resize', this.computeIsMobile);
    }

    computeIsMobile() {
        this.setState({isMobile: window.document.body.clientWidth < 768})
    }

    setLocale(locale) {
        const {pathname, asPath, query} = this.props.router

        Settings.defaultLocale = locale

        this.props.router.push({pathname, query}, asPath, {locale});
        (new Cookie('NEXT_LOCALE', locale, {
            expires: DateTime.now().plus({years: 10}).toJSDate()
        })).set()
    }

    setLoggedIn(isLoggedIn) {
        this.setState({isLoggedIn})
    }

    toggleTheme() {
        const theme = this.state.theme === 'light' ? 'dark' : 'light'

        localStorage.setItem('APP_THEME', theme)

        this.setState({theme})
    }

    render() {
        const {Component: Page, pageProps} = this.props;

        return (<GlobalContext.Provider value={this.state}>
                <div className={'theme--' + this.state.theme}>
                    <div className={'body'}>
                        <Navbar/>
                        <div className={'container'}>
                            <Page {...pageProps} />
                        </div>
                        <AboutUsSection/>
                        <Footer/>
                    </div>
                </div>
            </GlobalContext.Provider>
        )
    }
}

export default (ProbodyApp)
