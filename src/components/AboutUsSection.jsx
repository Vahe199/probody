import React from "react";
import TextSection from "./kit/TextSection";
import {GlobalContext} from "../contexts/Global.js";
import StatsInfoBlock from "./kit/StatsInfoBlock.jsx";
import css from '../styles/about-us.module.scss';
import ShareInSocialMedia from "./ShareInSocialMedia.jsx";

export default class AboutUsSection extends React.Component {
    static contextType = GlobalContext;

    render() {
        const {t, isMobile, theme} = this.context;

        return <div className={css['theme--' + theme]}>
            <section className={'container'} bp={'grid'}>
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
                    <ShareInSocialMedia />
                </div>
            </section>
        </div>
    }
}
