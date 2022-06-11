import React from "react";
import {GlobalContext} from "../../contexts/Global.js";
import ShareInSocialMedia from "../../components/ShareInSocialMedia";
import {withRouter} from "next/router.js";
import Paginator from "../../components/kit/Paginator";
import Objects from "../../helpers/Objects.js";
import css from "../../styles/articlecard.module.scss";
import Link from "next/link.js";
import Button from "../../components/kit/Button.jsx";
import {cnb} from "cnbuilder";
import Dates from "../../helpers/Dates.js";
import {formatPrice} from "../../helpers/String.js";

class BlogPage extends React.Component {
    static contextType = GlobalContext

    constructor(props) {
        super(props);

        this.state = {
            vacancies: [],
            page: 1,
            pageCount: 1
        }

        this.initPageLoad = this.initPageLoad.bind(this)
        this.handlePageChange = this.handlePageChange.bind(this)
    }

    componentDidMount() {
        this.initPageLoad()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.router.query.page !== this.props.router.query.page) {
            window.scrollTo(0, 0)

            this.initPageLoad()
        }
    }

    handlePageChange(page) {
        if (page !== this.state.page
            && page > 0
            && page <= this.state.pageCount) {
            this.props.router.push({
                query: {
                    page
                }
            })
        }
    }

    async initPageLoad() {
        await this.setState({
            page: Number(this.props.router.query.page) || 1
        })

        await this.setState({
            vacancies: [
                {
                    "_id": "629f26fb379f441955fb448e",
                    "salonTitle": "Салон красоты в г. Алматы",
                    "title": "Spikefish southern grayling cutthroat trout",
                    "photos": [
                        "https://images.ukrsalon.com.ua/files/1/1558/1369622/original/20120814155054.jpg",
                        'https://img.championat.com/s/735x490/news/big/q/j/massazh-kotoryj-umenshit-vashi-formy-vy-prosto-lezhite-i-hudeete_1564681008234562299.jpg',
                        'https://stamina.center/ru/wp-content/uploads/sites/2/2019/10/Stamina-likuvalnyj-masazh-01.jpg'
                    ],
                    "description": "Jellynose fish snook tiger shovelnose catfish; Pacific saury whitetip reef shark snake mudhead. Rock bass bristlemouth plunderfish yellow tang mudsucker hardhead catfish rough scad. Neon tetra, queen parrotfish lenok Pacific herring combtooth blenny blue eye blackchin duckbill cobbler! Black bass, Oriental loach slender snipe eel Norwegian Atlantic salmon porbeagle shark handfish buri! Flagblenny marlin saber-toothed blenny electric eel yellow perch, flathead smooth dogfish! Flagtail African lungfish trumpeter livebearer pickerel flat loach Australian prowfish.\n" +
                        "<br />" +
                        "Garden eel luderick jewfish ghost carp Kafue pike Rasbora electric knifefish firefish, cod. Frogmouth catfish, baikal oilfish candlefish baikal oilfish sind danio dogfish redtooth triggerfish emperor. Coolie loach lumpsucker trumpeter swordtail tidewater goby South American darter. Whitebait, inconnu North American darter greeneye; tapetail Indian mul. Píntano rock cod electric catfish. Sea devil sturgeon whalefish yellow bass ricefish barreleye Black angelfish squawfish threespine stickleback Cornish Spaktailed Bream. Pollock, cavefish pink salmon Sacramento blackfish king of herring. Goosefish parrotfish Colorado squawfish dealfish man-of-war fish, longfin escolar Celebes rainbowfish ghost flathead soldierfish zebra lionfish dogfish smoothtongue driftfish, pencilsmelt soldierfish porcupinefish wahoo Pacific argentine. Deep sea bonefish pikehead butterflyfish redmouth whalefish oilfish fire bar danio.",
                    "slug": "Derf808",
                    "salonAddress": "г. Алматы, ул. Карачаевская, д. 1",
                    "phone": "+770770770707",
                    "workDays": [
                        "mon",
                        "tue",
                        "wed",
                        "thu",
                    ],
                    "workHours": {
                        "from": '9:30',
                        "to": '18:00',
                    },
                    "region": {
                        "name": "Алматы",
                    },
                    "salary": 100000,
                    "createdAt": "2022-06-07T10:22:51.952Z",
                    "updatedAt": "2022-06-07T10:22:51.952Z"
                },
                {
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
                    "salary": 200000,
                    "createdAt": "2022-06-07T10:22:51.952Z",
                    "updatedAt": "2022-06-07T10:22:51.952Z"
                }
            ],
            "pageCount": 7
        })
        //fetches data from the server
    }

    render() {
        const {t, isMobile, theme} = this.context

        return <section className={css['theme--' + theme]}>
            <div className={'responsive-content'}>
                <p className="caption">{t('gladToSeeYouHere')}</p>
                <h1>{t('welcomeToOurAnnouncementBoard')}</h1>
            </div>
            <div style={{marginTop: 32, gridGap: 8}} bp={'grid'}>
                <div bp={'12 8@md'}>
                    <div style={{marginBottom: 12}}>
                        {!Objects.isEmpty(this.state.vacancies) && this.state.vacancies.map((vac, index) =>
                            <div className={css.vacancyCard} bp={'grid'} key={index}>
                                <div bp={'12 5@md'}>
                                    <div className={css.cardRoot}>
                                        <Link href={'/vacancies/' + vac.slug}><img style={!isMobile ? {height: 'unset'} : {}} src={vac.photos[0]}
                                                                              className={css.pic}/></Link>

                                        {isMobile
                                            ? <div className={css.content}>
                                                <p className={css.caption}>{vac.salonTitle}</p>
                                                <Link href={'/vacancies/' + vac.slug}><h2>{vac.title}</h2></Link>
                                                <p>{vac.description}</p>
                                            </div>
                                            : <div className={css.contactContainer}>
                                                <Link href={'/vacancies/' + vac.slug}><Button>{t('detail')}</Button></Link>
                                                <Link href={'tel:' + vac.phone}><Button color={'tertiary'} iconLeft={'call'}>
                                                    {t('call')}
                                                </Button></Link>
                                            </div>}
                                    </div>
                                </div>
                                <div bp={'12 7@md'} className={cnb(css.cardRoot, css.vacancyInfo)}>
                                    {!isMobile && <div className={css.content} style={{padding: 0, marginBottom: 12}}>
                                        <p className={css.caption}>{vac.salonTitle}</p>
                                        <Link href={'/vacancies/' + vac.slug}><h2>{vac.title}</h2></Link>
                                        <p>{vac.description}</p>
                                    </div>}

                                    <div style={{marginBottom: 12}} className={'flex justify-between non-selectable'}>
                                        <span className={css.caption}>{t('workDays')}</span>
                                        <span className={css.value}>{Dates.humanizeDuration(vac.workDays, this.props.router.locale)}</span>
                                    </div>
                                    <div style={{marginBottom: 12}} className={'flex justify-between non-selectable'}>
                                        <span className={css.caption}>{t('workTime')}</span>
                                        <span className={css.value}>{vac.workHours.from}-{vac.workHours.to}</span>
                                    </div>
                                    <div style={{marginBottom: 12}} className={'flex justify-between non-selectable'}>
                                        <span className={css.caption}>{t('salaryShort')}</span>
                                        <span className={css.value}>{t('from')} {formatPrice(vac.salary)} {t('kzt')}</span>
                                    </div>
                                    <div className={'flex justify-between non-selectable'}>
                                        <span className={css.caption}>{t('city')}</span>
                                        <span className={css.value}>{vac.region.name}</span>
                                    </div>

                                    {isMobile && <div className={cnb(css.contactContainer, css.mobile)}>
                                        <Link href={'/vacancies/' + vac.slug}><Button>{t('detail')}</Button></Link>
                                        <Link href={'tel:' + vac.phone}><Button color={'tertiary'} iconLeft={'call'}>
                                            {t('call')}
                                        </Button></Link>
                                    </div>}
                                </div>
                            </div>
                        )}
                    </div>
                    {this.state.pageCount > 1 && <Paginator page={this.state.page} onChange={this.handlePageChange}
                                                            pageCnt={this.state.pageCount}/>}
                </div>
                <div bp={'12 4@md'}>
                    <ShareInSocialMedia/>
                </div>
            </div>
        </section>
    }
}

export default withRouter(BlogPage);
