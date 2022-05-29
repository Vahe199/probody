import '../styles/globals.scss'
import Footer from "../components/Footer";
import Navbar from "../components/Navbar.jsx";
import {GlobalContext} from "../contexts/Global";
import React from "react";

// function ProbodyApp({Component, pageProps}) {
//     const initialValue = {
//         isLoggedIn: false,
//         locale: 'en',
//         theme: 'light',
//     }
//
//     return (<GlobalContext.Provider value={this.state}>
//             <Navbar/>
//             <Component {...pageProps} />
//             <Footer/>
//         </GlobalContext.Provider>
//     )
// }

class ProbodyApp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoggedIn: false,
            locale: 'en',
            theme: 'light',
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

export default ProbodyApp
