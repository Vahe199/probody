import React from "react"
import css from '../styles/menu.module.scss'
import Icon from "./kit/Icon.jsx";
import Popup from "./kit/Popup";
import Link from "next/link.js";
import {GlobalContext} from "../contexts/Global.js";
import {withRouter} from "next/router.js";
import Button from "./kit/Button.jsx";
import {cnb} from "cnbuilder";

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
        const {t, isMobile, openModal, theme, isLoggedIn} = this.context

        return <div className={cnb('non-selectable', css['theme--' + theme])}>
            <div className={css.hamburger} onClick={this.toggleMenu}><Icon name={(this.state.isOpen && isMobile) ? 'close' : 'hamburger'}/></div>
            <Popup style={isMobile ? {padding: 0} : {left: -270}} fullSize={isMobile} isOpen={this.state.isOpen}>
                <div className={css.columnFlex}>
                <ul className={cnb(css.list, isMobile ? css.mobile : '')}>
                    <li><Link href={'/account'}>{t('personalArea')}</Link></li>
                    <li><Link href={'/salon/new'}>{t('addArticle')}</Link></li>
                    <li><Link href={'/blog'}>{t('news')}</Link></li>
                    <li><Link href={'/'}>{t('forVisitors')}</Link></li>
                    <li><Link href={'/vacancies'}>{t('salonVacancies')}</Link></li>
                    <li><Link href={'/'}>{t('contacts')}</Link></li>
                    <li><Link href={'/'}>{t('aboutProject')}</Link></li>
                </ul>

                    {isMobile && !isLoggedIn && <div className={css.bottomSection}>
                        <Button className={css.btn} onClick={() => {
                            this.toggleMenu()
                            openModal('register')
                        }}>{t('registration')}</Button>
                        <Button className={css.btn} color={'tertiary'} onClick={() => {
                            this.toggleMenu()
                            openModal('login')
                        }}>{t('toLogIn')}</Button>
                    </div>}
                </div>
            </Popup>
        </div>
    }
}

Menu.contextType = GlobalContext

export default withRouter(Menu)
