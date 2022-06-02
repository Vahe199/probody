import React from "react"
import {GlobalContext} from "../contexts/Global"
import css from '../styles/navbar.module.scss'
import ThemeSwitcher from "./ThemeSwitcher.jsx";
import {cnb} from "cnbuilder";
import LanguageSelector from "./LanguageSelector.jsx";
import Menu from "./Menu.jsx";
import Link from "next/link.js";
import HybridSearchInput from "./kit/Form/HybridSearchInput";

class Navbar extends React.Component {
    render() {
        const {t} = this.context

        return this.context.isMobile ?
            <nav style={{justifyContent: 'space-around'}} className={cnb(css.navbar, css.mobile)} bp={'flex'}>
                <ThemeSwitcher/>
                <Link href={'/'}><img src='/text_logo.svg' alt={'logo'}/></Link>
                <div className={'flex'}>
                    <LanguageSelector/>
                    <div style={{marginLeft: 8}}><Menu /></div>
                </div>
            </nav>
            :
            <nav style={{
                display: 'flex !important',
                borderBottom: '1px solid #E4E4E4'
            }} className={cnb('container', css.navbar, 'non-selectable')} bp={'grid'}>
                <img src='/text_logo.svg' alt={'logo'}/>
                <div bp={'fill'} style={{margin: '0 16px'}}>
                    <HybridSearchInput searchPlaceholder={t('searchPlaceholder')} geoPlaceholder={t('geoPlaceholder')} />
                </div>
                <LanguageSelector/>
                <div className={'flex'}>
                    <Link href={'/auth/login'}>{t('toLogIn')}</Link>
                    <div style={{margin: '0 8px'}} className={css.rightSplitter}>&nbsp;</div>
                    <Link href={'/auth/register'}>{t('registration')}</Link>
                </div>
                <Menu/>
                <ThemeSwitcher/>
            </nav>
    }
}

Navbar.contextType = GlobalContext

export default Navbar
