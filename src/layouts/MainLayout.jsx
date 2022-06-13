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
            theme: 'dark',
            modal: '',
            isMobile: false,
            t: key => translations[props.router.locale][key] || translations[props.router.defaultLocale][key] || key,
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

    componentDidUpdate(prevProps, prevState) {
        if (prevState.openModal !== this.state.openModal) {
            this.computeIsLoggedIn()
        }
    }

    componentDidMount() {
        this.computeIsMobile()
        this.computeIsLoggedIn()

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
        return (<GlobalContext.Provider value={this.state}>
                <div className={'theme--' + this.state.theme}>
                    <div className={'body'}>
                        <Navbar/>
                        <div className={'container'}>
                            {this.props.children}
                        </div>
                        <Footer/>
                    </div>

                    <Modal isMobile={this.state.isMobile && this.state.modal !== 'registered'} onUpdate={this.openModal} open={!!this.state.modal.length}>
                        {this.state.modal === 'login' && <LoginModal/>}
                        {this.state.modal === 'register' && <RegisterModal/>}
                        {this.state.modal === 'registered' && <RegisteredModal/>}
                        {this.state.modal === 'forgot' && <ForgotModal/>}
                        {this.state.modal === 'changedPassword' && <ChangedPasswordModal/>}
                    </Modal>
                </div>
            </GlobalContext.Provider>
        )
    }
}

export default MainLayout
