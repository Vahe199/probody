import React from "react";
import {GlobalContext} from "../contexts/Global.js";
import css from '../styles/pages/clients.module.scss'
import ContactUs from "../components/ContactUs.jsx";
import {cnb} from "cnbuilder";
import Link from "next/link.js";
import Button from "../components/kit/Button.jsx";

export default class ClientsPage extends React.Component {
    static contextType = GlobalContext

    render() {
        const {t, isMobile, theme} = this.context

        return <div className={css['theme--' + theme]}>
            <div bp={'grid'} className={'responsive-content'} style={{marginTop: isMobile ? 16 : 48}}>
                <div bp={'12 5@md'}>
                    <h1 className={'text-xl'}>{t('whoWeAre')}</h1>
                    <p className={cnb(css.caption, css.jumbotronText, 'smallOnMobile')}>{t('seachNewClients')}</p>
                    <Link href='/'><Button size={'large'}>{t('chooseServices')}</Button></Link>
                </div>

                <div bp={'12 7@md'} className={css.img1}>
                    &nbsp;
                </div>
            </div>

            <div style={{marginTop: isMobile ? 64 : 96}}>
                <ContactUs single={false}/>
            </div>
        </div>
    }
}
