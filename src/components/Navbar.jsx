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
        const {t, theme, openModal} = this.context

        return <div className={css['theme--' + theme]}>
            {this.context.isMobile ?
                <nav style={{justifyContent: 'space-around'}} className={cnb(css.navbar, css.mobile)} bp={'flex'}>
                    <ThemeSwitcher/>
                    <Link href={'/'}><img className={'cursor-pointer'} src={'/text_logo--' + theme + '.svg'}
                                          alt={'logo'}/></Link>
                    <div className={'flex'}>
                        <LanguageSelector/>
                        <div style={{marginLeft: 8}}><Menu/></div>
                    </div>
                </nav>
                :
                <nav className={cnb('container', css.navbar, css.pc, 'non-selectable')} bp={'grid'}>
                    <Link href={'/'}><img className={'cursor-pointer'} src={'/text_logo--' + theme + '.svg'}
                                          alt={'logo'}/></Link>
                    <div bp={'fill'} style={{margin: '0 16px'}}>
                        <HybridSearchInput searchPlaceholder={t('searchPlaceholder')}
                                           geoPlaceholder={t('geoPlaceholder')}/>
                    </div>
                    <LanguageSelector/>
                    <div className={'flex'}>
                        <span className={'cursor-pointer'} onClick={() => openModal('login')}>{t('toLogIn')}</span>
                        <div style={{margin: '0 8px'}} className={css.rightSplitter}>&nbsp;</div>
                        <span className={'cursor-pointer'}
                              onClick={() => openModal('register')}>{t('registration')}</span>
                    </div>
                    <Menu/>
                    <ThemeSwitcher/>
                </nav>
            }
        </div>
    }
}

Navbar.contextType = GlobalContext

export default Navbar
