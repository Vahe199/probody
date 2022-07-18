import React from "react";
import Head from "next/head.js";
import {TITLE_POSTFIX} from "../helpers/constants.js";
import Breadcrumbs from "../components/kit/Breadcrumbs.jsx";
import {GlobalContext} from "../contexts/Global.js";
import InfoBlock from "../components/kit/InfoBlock";
import css from '../styles/pages/pp.module.scss'
import {cnb} from "cnbuilder";
import Icon from "../components/kit/Icon.jsx";

export default class PrivacyPolicyPage extends React.Component {
    static contextType = GlobalContext

    render() {
        const {t, isMobile, theme} = this.context

        return <div className={css['theme--' + theme]}>
            <Head>
                <title>{t('privacyPolicy')}{TITLE_POSTFIX}</title>
            </Head>

            <Breadcrumbs items={[
                {
                    name: t('mainPage'),
                    href: '/',
                },
                {
                    name: t('privacyPolicy'),
                    href: '/privacypolicy',
                }
            ]}/>

            <div bp={'grid'} className={'relative responsive-content'} style={{gap: isMobile ? 40 : 32, marginTop: isMobile ? 0 : 28}}>
                <div bp={'12 4@md'}>
                    <InfoBlock style={{padding: 0}}>
                        <div className={cnb(css.legend)}>
                            <div className={css.active}>
                                <span>1. {t('ppLegend_1')}</span>
                                <span className={css.goTo}>
                                    <Icon name={'arrow_right'} />
                                </span>
                            </div>
                            <div>
                                <span>2. {t('ppLegend_2')}</span>
                                <span className={css.goTo}>
                                    <Icon name={'arrow_right'} />
                                </span>
                            </div>
                            <div>
                                <span>3. {t('ppLegend_3')}</span>
                                <span className={css.goTo}>
                                    <Icon name={'arrow_right'} />
                                </span>
                            </div>
                            <div>
                                <span>4. {t('ppLegend_4')}</span>
                                <span className={css.goTo}>
                                    <Icon name={'arrow_right'} />
                                </span>
                            </div>
                            <div>
                                <span>5. {t('ppLegend_5')}</span>
                                <span className={css.goTo}>
                                    <Icon name={'arrow_right'} />
                                </span>
                            </div>
                            <div>
                                <span>6. {t('ppLegend_6')}</span>
                                <span className={css.goTo}>
                                    <Icon name={'arrow_right'} />
                                </span>
                            </div>
                        </div>
                    </InfoBlock>
                </div>

                <div bp={'12 8@md'}>
                    {!isMobile && <div className={css.secondlayer}>
                        <div>{t('pp_full')}</div>
                    </div>}
                </div>
            </div>
        </div>
    }
}
