import React from "react"
import {GlobalContext} from "../contexts/Global"

export default class Navbar extends React.Component {
    render() {
        return <GlobalContext.Consumer>
            {({theme, toggleTheme}) =>
                <nav className={'container'}>
                    navbar
                </nav>
            }
        </GlobalContext.Consumer>
    }
}
