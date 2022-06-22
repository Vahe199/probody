import window from 'global'
import Footer from "../components/Footer"
import Navbar from "../components/Navbar.jsx"
import {GlobalContext} from "../contexts/Global"
import React from "react"

import en from '../locales/en'
import ru from '../locales/ru'
import kz from '../locales/kz'
import Cookie from "../helpers/Cookie.js";
import {DateTime, Settings} from "luxon";
import Modal from "../components/kit/Modal.jsx";
import LoginModal from "../components/modals/LoginModal.jsx";
import RegisterModal from "../components/modals/RegisterModal.jsx";
import RegisteredModal from "../components/modals/RegisteredModal.jsx";
import UserHelper from "../helpers/UserHelper.js";
import ForgotModal from "../components/modals/ForgotModal.jsx";
import ChangedPasswordModal from "../components/modals/ChangedPasswordModal";
import {YANDEX_APIKEY} from "../helpers/constants.js";
import Script from "next/script.js";
import LogoutModal from "../components/modals/LogoutModal";
import Head from "next/head.js";

const translations = {
    en,
    ru,
    kz
}

class MainLayout extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoggedIn: false,
            theme: 'light',
            modal: '',
            isMobile: false,
            t: this.i18n.bind(this),
            setLocale: this.setLocale.bind(this),
            toggleTheme: this.toggleTheme.bind(this),
            setLoggedIn: this.setLoggedIn.bind(this),
            openModal: this.openModal.bind(this),
        }

        this.computeIsMobile = this.computeIsMobile.bind(this)
        this.openModal = this.openModal.bind(this)
        this.computeIsLoggedIn = this.computeIsLoggedIn.bind(this)
    }

    openModal(modal) {
        this.setState({modal})
    }

    i18n (key, ...substitutions) {
        let translation = translations[this.props.router.locale][key] || key

        substitutions.forEach(sub => {
            translation = translation.replace(/%s/i, sub)
        })

        return translation
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.modal !== this.state.modal) {
            this.computeIsLoggedIn()
        }
    }

    componentDidMount() {
        if (!window.localStorage) {
            return
        }

        this.props.router.events.on('routeChangeComplete', (url, a, b, c) => setTimeout(() => {
            console.log(url, a, b, c)
            // if (url.startsWith('/salon/')) {
            //     return
            // }

            window.document.body.scrollTo(0, 0)
        }, 150))

        const storedTheme = window.localStorage.getItem('APP_THEME')

        if (storedTheme) {
            this.setState({theme: storedTheme})
        } /*else {
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
        }*/

        this.computeIsMobile()
        this.computeIsLoggedIn()

        Settings.defaultLocale = this.props.router.locale

        window.addEventListener('resize', this.computeIsMobile);
    }


    computeIsLoggedIn() {
        this.setState({isLoggedIn: UserHelper.isLoggedIn()})
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
        // noinspection HtmlRequiredTitleElement
        return (<GlobalContext.Provider value={this.state}>
                <Head>
                    <meta name="viewport" content="width=device-width, user-scalable=no" />
                </Head>
                <Script src={'https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=' + YANDEX_APIKEY}
                        strategy={'beforeInteractive'}/>

                <div className={'theme--' + this.state.theme}>
                    <div className={'body'}>
                        <Navbar/>
                        <div className={'container'}>
                            {this.props.children}
                        </div>
                        <Footer/>
                    </div>

                    <Modal
                        isMobile={this.state.isMobile && !['registered', 'changedPassword', 'logout'].includes(this.state.modal)}
                        onUpdate={this.openModal} open={!!this.state.modal.length}>
                        {this.state.modal === 'login' && <LoginModal/>}
                        {this.state.modal === 'register' && <RegisterModal/>}
                        {this.state.modal === 'registered' && <RegisteredModal/>}
                        {this.state.modal === 'forgot' && <ForgotModal/>}
                        {this.state.modal === 'changedPassword' && <ChangedPasswordModal/>}
                        {this.state.modal === 'logout' && <LogoutModal/>}
                    </Modal>
                </div>
            </GlobalContext.Provider>
        )
    }
}

export default MainLayout
