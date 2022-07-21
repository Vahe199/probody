import React from "react";
import {GlobalContext} from "../../contexts/Global.js";
import css from "../../styles/pages/personal.promotion.module.scss";
import Icon from "../kit/Icon.jsx";
import Link from "next/link.js";
import APIRequests from "../../helpers/APIRequests.js";
import {cnb} from "cnbuilder";
import InfoBlock from "../kit/InfoBlock";
import {formatPrice} from "../../helpers/String";
import Button from "../kit/Button.jsx";
import {DateTime} from "luxon";

export default class Promotion extends React.Component {
    static contextType = GlobalContext

    constructor(props) {
        super(props);

        this.state = {
            mySalon: {},
            personalInfo: {}
        }
    }

    componentDidMount() {
        this.getSalonInfo()
        this.getMe()
    }

    getSalonInfo() {
        APIRequests.getMySalonInfo().then(mySalon => {
            this.setState({mySalon})
        })
    }

    getMe() {
        APIRequests.getMe().then(personalInfo => {
            this.setState({personalInfo})
        })
    }

    render() {
        const {t, theme, isMobile} = this.context
        const isPro = +new Date(this.state.personalInfo.subscriptionTo) > +new Date

        return <div className={cnb(css['theme--' + theme], 'responsive-content')}>
            <div bp={'grid'} style={{marginBottom: 24}}>
                <h1 bp={'12 4@md'} className={'bigger inline-flex items-center lineheight-1'}>{t('salonArticle')}</h1>

                <div bp={'12 8@md'} className={'flex gap-12 justify-' + (isMobile ? 'start' : 'end')}>
                    <p className={css.editSalonLink}>
                        <Icon name={'edit'}/>

                        {t('editSalon')}
                    </p>

                    <Link href={'/salon/' + this.state.mySalon.slug}><p className={css.editSalonLink}>
                        <Icon name={'arrow_right_square'}/>

                        {t('toSalon')}
                    </p></Link>
                </div>
            </div>

            <div bp={'grid'} style={{gap: isMobile ? '20px 0' : '0 29px'}}>
                <div bp={'12 7@md'}>
                    <div className={'flex'} style={{gap: 4}}>
                    <div style={{flexGrow: 1}}>
                        <InfoBlock className={css.personalInfoBlock}>
                            <div className={'flex justify-between'}>
                                <div>
                                    <Icon name={'wallet'}/>
                                    {t('balance')}
                                </div>
                                <Button size={'small'}><Icon name={'plus'}/></Button>
                            </div>
                            <h2 className={'number-font'}>{formatPrice(this.state.personalInfo.balance || 0)} {t('kzt')}</h2>
                        </InfoBlock>
                    </div>

                    <InfoBlock className={css.personalInfoBlock}>
                        <div className={'flex justify-between'}>
                            <div>
                                <Icon style={{width: 20, height: 20}} name={'position'}/>
                                {t('salonPosition')}
                            </div>
                        </div>
                        <h2 className={'number-font'}>{this.state.mySalon.position || '-'}</h2>
                    </InfoBlock>
                    </div>
                </div>
                <div bp={'12 5@md first last@md'}>
                    <div className={cnb(css.goPro, isPro ? css.pro : '')}>
                        <div>
                            <img src={'/icons/pro_fill.svg'} width={24} height={24} />
                            <p className={'subtitle2'}>{t(isPro ? 'pro' : 'standard')}</p>
                        </div>
                        {isPro ? <span>{t('activeTo')} {DateTime.fromISO(this.state.personalInfo.subscriptionTo).toFormat('dd.MM.yyyy')}</span> : <Button color={'secondary'} size={'small'}>{t('goPro')}</Button>}
                    </div>
                    <div className={css.proHint}>
                        <div><Icon name={'warning'}/></div>
                        <span>{isPro ? t('activeProInfo') : t('ifYouGoPro')}</span>
                    </div>
                </div>
            </div>
        </div>
    }
}
