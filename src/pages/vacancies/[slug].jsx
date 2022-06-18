import {withRouter} from "next/router.js";
import React from "react";
import {GlobalContext} from "../../contexts/Global.js";
import Breadcrumbs from "../../components/kit/Breadcrumbs";
import css from "../../styles/articlecard.module.scss";
import Link from "next/link.js";
import Button from "../../components/kit/Button.jsx";
import ImageCarousel from "../../components/kit/ImageCarousel";
import {cnb} from "cnbuilder";
import Icon from "../../components/kit/Icon.jsx";
import {formatPrice} from "../../helpers/String.js";
import TextSection from "../../components/kit/TextSection.jsx";
import InfoBlock from "../../components/kit/InfoBlock";
import Head from "next/head.js";
import {TITLE_POSTFIX} from "../../helpers/constants.js";
import Dates from "../../helpers/Dates.js";

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
                "_id": "629f26fb379f441955fb448e",
                "salonTitle": "Салон красоты в г. Алматы",
                "title": "Spikefish southern grayling cutthroat trout",
                "photos": [
                    "https://img.championat.com/s/735x490/news/big/d/l/tehnika-tochechnogo-massazha-dlja-pohudenija_15905066501829841550.jpg",
                    'https://novaya.com.ua/wp-content/uploads/2021/09/massazh-spiny-1.jpg'
                ],
                "description": "Jellynose fish snook tiger shovelnose catfish; Pacific saury whitetip reef shark snake mudhead. Rock bass bristlemouth plunderfish yellow tang mudsucker hardhead catfish rough scad. Neon tetra, queen parrotfish lenok Pacific herring combtooth blenny blue eye blackchin duckbill cobbler! Black bass, Oriental loach slender snipe eel Norwegian Atlantic salmon porbeagle shark handfish buri! Flagblenny marlin saber-toothed blenny electric eel yellow perch, flathead smooth dogfish! Flagtail African lungfish trumpeter livebearer pickerel flat loach Australian prowfish.\n" +
                    "<br />" +
                    "Garden eel luderick jewfish ghost carp Kafue pike Rasbora electric knifefish firefish, cod. Frogmouth catfish, baikal oilfish candlefish baikal oilfish sind danio dogfish redtooth triggerfish emperor. Coolie loach lumpsucker trumpeter swordtail tidewater goby South American darter. Whitebait, inconnu North American darter greeneye; tapetail Indian mul. Píntano rock cod electric catfish. Sea devil sturgeon whalefish yellow bass ricefish barreleye Black angelfish squawfish threespine stickleback Cornish Spaktailed Bream. Pollock, cavefish pink salmon Sacramento blackfish king of herring. Goosefish parrotfish Colorado squawfish dealfish man-of-war fish, longfin escolar Celebes rainbowfish ghost flathead soldierfish zebra lionfish dogfish smoothtongue driftfish, pencilsmelt soldierfish porcupinefish wahoo Pacific argentine. Deep sea bonefish pikehead butterflyfish redmouth whalefish oilfish fire bar danio.",
                "slug": "Derf808",
                "salonAddress": "г. Алматы, ул. Карачаевская, д. 1",
                "phone": "+770770770707",
                "whatsapp": "+770770770707",
                "workDays": [
                    "mon",
                    "tue",
                    "wed",
                    "thu",
                ],
                "region": {
                    "name": "Алматы",
                },
                "workHours": {
                    "from": '10:00',
                    "to": '23:00',
                },
                "withdrawalType": "cash",
                "experience": '6mon',
                "salary": 200000,
                "createdAt": "2022-06-07T10:22:51.952Z",
                "updatedAt": "2022-06-07T10:22:51.952Z"
            },
            avgRating: 4.8,
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
                        <ImageCarousel pics={this.state.vacancy.photos}/>
                        {isMobile
                            ? <div className={css.content} style={{padding: 12}}>
                                <p className={css.caption}>{this.state.vacancy.salonTitle}</p>
                                <h2>{this.state.vacancy.title}</h2>
                            </div>
                            : <div className={cnb(css.contactContainer, css.mobile)}>
                                <Link href={'tel:' + this.state.vacancy.phone}><Button iconLeft={'call'}>
                                    {t('call')}
                                </Button></Link>
                                <Link
                                    href={'https://wa.me/' + this.state.vacancy.whatsapp.replace('+', '') + '?text=' + encodeURIComponent(t('vacancyAnswerPrefill') + ' "' + this.state.vacancy.title + '"')}><Button
                                    color={'tertiary'} iconLeft={'wa_light'}>{t('write')}</Button></Link>
                            </div>}
                    </div>
                </div>
                <div bp={'12 7@md'}>
                    {!isMobile && <div className={css.cardRoot}>
                        <div className={css.content}>
                            <div bp={'grid'} style={{marginBottom: 16}}>
                                <h2 bp={'6'}>{this.state.vacancy.title}</h2>
                                <div bp={'1'} className={'non-selectable'}>&nbsp;</div>
                                <div bp={'5'} className={'flex vertical-center justify-end'}>
                                    <div>
                                        <span className={css.primaryColor}><Icon name={'star'}/></span>
                                        <span className={css.bigger}>{this.state.avgRating}</span>
                                    </div>

                                    <Button size={'small'}>{t('onTheMap')}</Button>
                                </div>
                            </div>

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

                    <div bp={'grid 12 6@md'} style={{margin: '16px 0'}}>
                        <div>
                            <InfoBlock>
                                <div bp={'grid 6'}>
                                    <div>
                                        <div className={css.infoCaption}>{t('salaryShort')}</div>
                                        <div>{t('from')} {formatPrice(this.state.vacancy.salary)} {t('kzt')}</div>
                                    </div>
                                    <div>
                                        <div className={css.infoCaption}>{t('withdrawal')}</div>
                                        <div>{t('withdrawal_' + this.state.vacancy.withdrawalType)}</div>
                                    </div>
                                    <div>
                                        <div className={css.infoCaption}>{t('workExperience')}</div>
                                        <div>{t('workExperience_' + this.state.vacancy.experience)}</div>
                                    </div>
                                    <div>
                                        <div className={css.infoCaption}>{t('schedule')}</div>
                                        <div>{Dates.humanizeDuration(this.state.vacancy.workDays, this.props.router.locale)}, {this.state.vacancy.workHours.from}-{this.state.vacancy.workHours.to}</div>
                                    </div>
                                </div>
                            </InfoBlock>
                        </div>
                        <div>
                            <h3>{t('employment')}</h3>
                        </div>
                    </div>

                    <TextSection title={t('description')}>
                        {this.state.vacancy.description}
                    </TextSection>
                </div>
            </div>}
        </section>;
    }
}

export default withRouter(VacancyViewPage);
