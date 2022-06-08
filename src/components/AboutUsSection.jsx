import React from "react";
import TextSection from "./kit/TextSection";
import {GlobalContext} from "../contexts/Global.js";
import InfoBlock from "./kit/InfoBlock.jsx";
import StatsInfoBlock from "./kit/StatsInfoBlock.jsx";
import css from '../styles/about-us.module.scss';
import {cnb} from "cnbuilder";

export default class AboutUsSection extends React.Component {
    static contextType = GlobalContext;

    render() {
        const {t, isMobile, theme} = this.context;

        return <div className={css['theme--' + theme]}>
            <section className={'container'} bp={'grid'} style={{marginBottom: 24}}>
                <div bp={'12 8@md'}>
                    <TextSection dangerouslySetInnerHTML={{__html: t('seoText1')}} style={{marginBottom: 24}}>
                    </TextSection>

                    <div bp={'show hide@md'} style={{marginBottom: 24}}>
                        <StatsInfoBlock title={t('siteStatsTitle')} stats={[
                            {
                                title: t('avgRating'),
                                value: '4.8',
                                accent: true
                            },
                            {
                                title: t('totalRatings'),
                                value: '376'
                            },
                            {
                                title: t('totalReviews'),
                                value: '152'
                            }
                        ]}/>
                    </div>

                    <TextSection style={{marginTop: isMobile ? 24 : undefined}} dangerouslySetInnerHTML={{__html: t('seoText2')}}>
                    </TextSection>
                </div>
                <div bp={'first@md 12 4@md'}>
                    <div bp={'hide show@md'} style={{marginBottom: 24, display: isMobile ? undefined : 'block !important'}}>
                        <StatsInfoBlock title={t('siteStatsTitle')} stats={[
                            {
                                title: t('avgRating'),
                                value: '4.8',
                                accent: theme === 'light'
                            },
                            {
                                title: t('totalRatings'),
                                value: '376'
                            },
                            {
                                title: t('totalReviews'),
                                value: '152'
                            }
                        ]}/>
                    </div>
                    <InfoBlock>
                        <h3 style={{marginBottom: 12}}>{t('shareInSocial')}</h3>
                        <div className={cnb(css.socialBlock)}>
                            <div>
                                <img src={"/icons/vk_" + theme + ".svg"} alt={t('vk')}/>
                            </div>
                            <div>
                                <img src={"/icons/fb_" + theme + ".svg"} alt={t('fb')}/>
                            </div>
                            <div>
                                <img src={"/icons/ok_" + theme + ".svg"} alt={t('ok')}/>
                            </div>
                            <div>
                                <img src={"/icons/vi_" + theme + ".svg"} alt={t('vi')}/>
                            </div>
                            <div>
                                <img src={"/icons/wa_" + theme + ".svg"} alt={t('wa')}/>
                            </div>
                            <div>
                                <img src={"/icons/tg_" + theme + ".svg"} alt={t('tg')}/>
                            </div>
                        </div>
                    </InfoBlock>
                </div>
            </section>
        </div>
    }
}
