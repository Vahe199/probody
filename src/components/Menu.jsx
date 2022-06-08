import React from "react"
import css from '../styles/menu.module.scss'
import Icon from "./kit/Icon.jsx";
import Popup from "./kit/Popup";
import Link from "next/link.js";
import {GlobalContext} from "../contexts/Global.js";
import {withRouter} from "next/router.js";

class Menu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        }

        this.toggleMenu = this.toggleMenu.bind(this)
    }

    componentDidUpdate(prevProps) {
        if (prevProps.router.pathname !== this.props.router.pathname) {
            this.setState({isOpen: false})
        }
    }

    toggleMenu() {
        this.setState({isOpen: !this.state.isOpen})
    }

    render() {
        const {t, isMobile} = this.context

        return <div className={'non-selectable'}>
            <div className={css.hamburger} onClick={this.toggleMenu}><Icon name={(this.state.isOpen && isMobile) ? 'close' : 'hamburger'}/></div>
            <Popup style={isMobile ? {} : {left: -270}} fullSize={isMobile} isOpen={this.state.isOpen}>
                <ul className={css.list}>
                    <li><Link href={'/blog'}>{t('news')}</Link></li>
                    <li><Link href={'/visitors'}>{t('forVisitors')}</Link></li>
                    <li><Link href={'/vacancies'}>{t('salonVacancies')}</Link></li>
                    <li><Link href={'/salon/new'}>{t('addArticle')}</Link></li>
                    <li><Link href={'/contacts'}>{t('contacts')}</Link></li>
                    <li><Link href={'/about'}>{t('aboutProject')}</Link></li>
                </ul>
            </Popup>
        </div>
    }
}

Menu.contextType = GlobalContext

export default withRouter(Menu)
