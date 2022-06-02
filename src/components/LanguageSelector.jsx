import React from "react"
import css from '../styles/languageselector.module.scss'
import Icon from "./kit/Icon.jsx"
import {cnb} from "cnbuilder";
import {GlobalContext} from "../contexts/Global.js";
import {withRouter} from "next/router.js";
import Popup from "./kit/Popup";

class LanguageSelector extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isPopupOpen: false
        }

        this.togglePopup = this.togglePopup.bind(this);
    }

    togglePopup() {
        this.setState({isPopupOpen: !this.state.isPopupOpen})
    }

    render() {
        const {locale} = this.props.router;

        const availableOptions = this.props.router.locales.filter(i => i !== locale);

        return <div onClick={this.togglePopup} className={cnb(css.root, this.state.isPopupOpen ? css.popupOpen : '')}>
            <span>{locale}</span>
            <Icon name={'chevron_down'}/>
            <Popup isOpen={this.state.isPopupOpen}>
                <ul className={css.list}>
                    {availableOptions.map(lang =>
                        <li key={lang} onClick={() => this.context.setLocale(lang)}>
                            {lang}
                        </li>
                    )}
                </ul>
            </Popup>
        </div>
    }
}

LanguageSelector.contextType = GlobalContext

export default withRouter(LanguageSelector)
