import {withRouter} from "next/router.js";
import React from "react";
import {GlobalContext} from "../../contexts/Global.js";
import Breadcrumbs from "../../components/kit/Breadcrumbs";
import css from "../../styles/vacancypage.module.scss";
import Button from "../../components/kit/Button.jsx";
import ImageCarousel from "../../components/kit/ImageCarousel";
import {cnb} from "cnbuilder";
import {formatPrice} from "../../helpers/String.js";
import InfoBlock from "../../components/kit/InfoBlock";
import Head from "next/head.js";
import {TITLE_POSTFIX} from "../../helpers/constants.js";
import Tag from "../../components/kit/Tag";
import ShareInSocialMedia from "../../components/ShareInSocialMedia";
import {parsePhoneNumber} from "libphonenumber-js";
import Icon from "../../components/kit/Icon.jsx";

class VacancyViewPage extends React.Component {
    static contextType = GlobalContext

    constructor(props) {
        super(props);

        this.state = {
            vacancy: {},
            avgRating: 4.8,
        }
    }

    componentDidMount() {
        //fetch vacancy with id {this.props.router.query.slug}
        this.setState({
            vacancy: {
                "_id": "62c186edba8ab7ee259f91b2",
                "host": "62a716414546a8b318001ddf",
                "salary": 75000,
                "experience": "nomatter",
                "description": "Jellynose fish snook tiger shovelnose catfish; Pacific saury whitetip reef shark snake mudhead. Rock bass bristlemouth plunderfish yellow tang mudsucker hardhead catfish rough scad. Neon tetra, queen parrotfish lenok Pacific herring combtooth blenny blue eye blackchin duckbill cobbler! Black bass, Oriental loach slender snipe eel Norwegian Atlantic salmon porbeagle shark handfish buri! Flagblenny marlin saber-toothed blenny electric eel yellow perch, flathead smooth dogfish! Flagtail African lungfish trumpeter livebearer pickerel flat loach Australian prowfish. Garden eel luderick jewfish ghost carp Kafue pike Rasbora electric knifefish firefish, cod. Frogmouth catfish, baikal oilfish candlefish baikal oilfish sind danio dogfish redtooth triggerfish emperor. Coolie loach lumpsucker trumpeter swordtail tidewater goby South American darter. Whitebait, inconnu North American darter greeneye; tapetail Indian mul. Píntano rock cod electric catfish. Sea devil sturgeon whalefish yellow bass ricefish barreleye Black angelfish squawfish",
                "title": "Салон 'Body Life' ищет мастеров боди массажа",
                "withdrawalType": ["card"],
                "withdrawalPeriod": "daily",
                "phone": "+7 777 777 7777",
                "whatsapp": "+7 777 777 7777",
                "employment": [
                    "full",
                    "part"
                ],
                "salonTitle": "Body Life",
                "salonAddress": "ул. Гоголя, 12",
                "pic": "https://img.championat.com/s/735x490/news/big/d/l/tehnika-tochechnogo-massazha-dlja-pohudenija_15905066501829841550.jpg",
                "region": {
                    "_id": "62a4ac186e4061e6bb32536b",
                    "name": "Туркестан"
                },
                "slug": "Body-Life284",
                "createdAt": "2022-07-03T12:09:17.795Z",
                "updatedAt": "2022-07-03T12:09:17.795Z",
                "workSchedule": [
                    "contract",
                    "flexible"
                ]
            }
        })
    }

    render() {
        const {t, isMobile, theme} = this.context

        return <section className={css['theme--' + theme]}>
            <Head>
                <title>{this.state.vacancy.title || t('vacancy')}{TITLE_POSTFIX}</title>
            </Head>

            <Breadcrumbs items={[
                {
                    name: t('mainPage'),
                    href: '/',
                },
                {
                    name: t('vacancies'),
                    href: '/vacancies',
                },
                {
                    name: this.state.vacancy.title || t('vacancy'),
                    href: '/vacancies/' + this.state.vacancy.slug,
                }
            ]}/>
            {this.state.vacancy.title && <div bp={'grid'}>
                <div bp={'12 5@md'}>
                    <div className={css.cardRoot}>
                        <ImageCarousel pics={[this.state.vacancy.pic]}/>
                        {isMobile
                            ? <div className={css.content} style={{padding: 12}}>
                                <p className={css.caption}>{this.state.vacancy.salonTitle}</p>
                                <h2>{this.state.vacancy.title}</h2>
                            </div>
                            : <div className={cnb(css.contactContainer, css.mobile)}>
                                <a href={'tel:' + this.state.vacancy.phone}><Button iconLeft={'call'}>
                                    {t('call')}
                                </Button></a>
                                <a target="_blank"
                                   href={'https://wa.me/' + this.state.vacancy.whatsapp.replace('+', '') + '?text=' + encodeURIComponent(t('vacancyAnswerPrefill') + ' "' + this.state.vacancy.title + '"')}><Button
                                    color={'tertiary'} iconLeft={'wa_light'}>{t('write')}</Button></a>
                            </div>}
                    </div>

                    <div className={css.cardRoot} style={{marginTop: 4, padding: 20}} bp={'hide@md'}>
                        <div style={{marginBottom: 12}} className={'flex justify-between non-selectable'}>
                            <span className={css.caption}>{t('city')}</span>
                            <span className={css.value}>{this.state.vacancy.region.name}</span>
                        </div>
                        <div style={{marginBottom: 12}} className={'flex justify-between non-selectable'}>
                            <span className={css.caption}>{t('address')}</span>
                            <span className={css.value}>{this.state.vacancy.salonAddress}</span>
                        </div>
                        <div className={'flex justify-between non-selectable'}>
                            <span className={css.caption}>{t('salon')}</span>
                            <span className={css.value}>{this.state.vacancy.salonTitle}</span>
                        </div>
                    </div>
                </div>
                <div bp={'12 7@md'}>
                    {!isMobile && <div className={css.cardRoot}>
                        <div className={css.content}>
                            <h2 style={{marginBottom: 30, marginTop: 10}}>{this.state.vacancy.title}</h2>

                            <div bp={'grid'}>
                                <div bp={'6'}>
                                    <div style={{marginBottom: 12}} className={'flex justify-between non-selectable'}>
                                        <span className={css.caption}>{t('city')}</span>
                                        <span className={css.value}>{this.state.vacancy.region.name}</span>
                                    </div>
                                    <div style={{marginBottom: 12}} className={'flex justify-between non-selectable'}>
                                        <span className={css.caption}>{t('address')}</span>
                                        <span className={css.value}>{this.state.vacancy.salonAddress}</span>
                                    </div>
                                    <div className={'flex justify-between non-selectable'}>
                                        <span className={css.caption}>{t('salon')}</span>
                                        <span className={css.value}>{this.state.vacancy.salonTitle}</span>
                                    </div>
                                </div>

                                <div bp={'1'} className={'non-selectable'}>&nbsp;</div>

                                <div bp={'5'}>
                                    <h3>{t('socialMedia')}</h3>
                                </div>
                            </div>
                        </div>
                    </div>}

                    <div bp={'grid'} style={{margin: '16px 0', gap: 20}}>
                        <div bp={'12 3@md'}>
                            <InfoBlock>
                                <div bp={'grid'} style={{gap: 24}}>
                                    <div bp={'12'}>
                                        <div className={css.infoCaption} style={{marginBottom: 8}}>{t('salary')}</div>
                                        <div
                                            className={'bold'}>{t('from')} {formatPrice(this.state.vacancy.salary)} {t('kzt')}</div>
                                    </div>
                                    <div bp={'6 12@md'}>
                                        <div className={css.infoCaption}>{t('withdrawalType')}</div>
                                        <div>
                                            <Tag label={t('withdrawal_' + this.state.vacancy.withdrawalType)}
                                                 className={css.secondLayerTag}/>
                                        </div>
                                    </div>
                                    <div bp={'6 12@md'}>
                                        <div className={css.infoCaption}>{t('withdrawalPeriod')}</div>
                                        <div>
                                            <Tag label={t('withdrawalPeriod_' + this.state.vacancy.withdrawalPeriod)}
                                                 className={css.secondLayerTag}/>
                                        </div>
                                    </div>
                                </div>
                            </InfoBlock>
                        </div>
                        <div bp={'12 9@md'} className={'responsive-content'}>
                            <div className={css.bottomLine}>
                                <p className="subtitle2">{t('employment')}</p>
                                <div>
                                    {this.state.vacancy.employment.map((employment, i) =>
                                        <Tag label={t('employment_' + employment)} key={i}/>
                                    )}
                                </div>
                            </div>
                            <div className={css.bottomLine}>
                                <p className="subtitle2">{t('workSchedule')}</p>
                                <div className="flex">
                                    {this.state.vacancy.workSchedule.map((schedule, i) =>
                                        <Tag label={t('schedule_' + schedule)} key={i}/>
                                    )}
                                </div>
                            </div>
                            <div className={css.bottomLine}>
                                <p className="subtitle2">{t('withdrawalType')}</p>
                                <div className="flex">
                                    {this.state.vacancy.withdrawalType.map((type, i) =>
                                        <Tag label={t('withdrawal_' + type)} key={i}/>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={css.cardRoot} style={{padding: 20}}>
                        <p className="subtitle2" style={{marginBottom: 16}}>{t('description')}</p>
                        {this.state.vacancy.description}
                    </div>

                    <ShareInSocialMedia thin={true} style={{marginTop: 12}}/>
                </div>
            </div>}

            {
                (this.state.vacancy.phone && isMobile) && <div className={cnb(css.stretchContainer, css.stickToBottom, 'fullwidth')}>
                    <div><a href={'tel:' + parsePhoneNumber(this.state.vacancy.phone).number}>
                        <Button>
                            <Icon name={'call'}/>
                            {t('call')}
                        </Button>
                    </a></div>
                    <div><a target="_blank"
                            href={'https://wa.me/' + parsePhoneNumber(this.state.vacancy.whatsapp).number.replace('+', '') + '?text=' + encodeURIComponent(t('vacancyAnswerPrefill') + ' "' + this.state.vacancy.title + '"')}>
                        <Button color={'tertiary'}>
                            <Icon name={'wa_light'}/>
                            {t('sendMessage')}
                        </Button>
                    </a></div>
                </div>
            }
        </section>;
    }
}

export default withRouter(VacancyViewPage);
