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
import Head from "next/head.js";
import {TITLE_POSTFIX} from "../../helpers/constants.js";
import APIRequests from "../../helpers/APIRequests.js";

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
            // window.document.body.scrollTo(0, 0)

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
            "vacancies": [
                {
                    "_id": "62c186edba8ab7ee259f91b2",
                    "host": "62a716414546a8b318001ddf",
                    "salary": 75000,
                    "experience": "nomatter",
                    "description": "Jellynose fish snook tiger shovelnose catfish; Pacific saury whitetip reef shark snake mudhead. Rock bass bristlemouth plunderfish yellow tang mudsucker hardhead catfish rough scad. Neon tetra, queen parrotfish lenok Pacific herring combtooth blenny blue eye blackchin duckbill cobbler! Black bass, Oriental loach slender snipe eel Norwegian Atlantic salmon porbeagle shark handfish buri! Flagblenny marlin saber-toothed blenny electric eel yellow perch, flathead smooth dogfish! Flagtail African lungfish trumpeter livebearer pickerel flat loach Australian prowfish. Garden eel luderick jewfish ghost carp Kafue pike Rasbora electric knifefish firefish, cod. Frogmouth catfish, baikal oilfish candlefish baikal oilfish sind danio dogfish redtooth triggerfish emperor. Coolie loach lumpsucker trumpeter swordtail tidewater goby South American darter. Whitebait, inconnu North American darter greeneye; tapetail Indian mul. Píntano rock cod electric catfish. Sea devil sturgeon whalefish yellow bass ricefish barreleye Black angelfish squawfish",
                    "title": "Салон 'Body Life' ищет мастеров боди массажа",
                    "withdrawalType": "card",
                    "withdrawalPeriod": "daily",
                    "phone": "+7 777 777 7777",
                    "whatsapp": "+7 777 777 7777",
                    "employment": [
                        "flexible",
                        "contract"
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
                    "updatedAt": "2022-07-03T12:09:17.795Z"
                }
            ],
            "pageCount": 1
        })
        //fetches data from the server
    }

    render() {
        const {t, isMobile, theme} = this.context

        return <section className={css['theme--' + theme]}>
            <Head>
                <title>{t('vacancies')}{TITLE_POSTFIX}</title>
            </Head>

            <div className={'responsive-content'}>
                <p className={'additional-text'}>{t('gladToSeeYouHere')}</p>
                <h1 className={'text-xl'}>{t('welcomeToOurAnnouncementBoard')}</h1>
            </div>
            <div style={{marginTop: 32, gridGap: 8}} bp={'grid'}>
                <div bp={'12 8@md'}>
                    <div style={{marginBottom: 12}}>
                        {!Objects.isEmpty(this.state.vacancies) && this.state.vacancies.map((vac, index) =>
                            <div className={css.vacancyCard} bp={'grid'} key={index}>
                                <div bp={'12 5@md'}>
                                    <div className={css.cardRoot}>
                                        <Link href={'/vacancies/' + vac.slug}><img style={!isMobile ? {height: 'unset'} : {}} src={vac.pic}
                                                                              className={css.pic}/></Link>
                                    </div>

                                    <div className={css.cardRoot}>
                                        {isMobile
                                            ? <div className={css.content}>
                                                <p className={css.caption}>{vac.salonTitle}</p>
                                                <Link href={'/vacancies/' + vac.slug}><h2>{vac.title}</h2></Link>
                                                <p>{vac.description}</p>
                                            </div>
                                            : <div className={css.contactContainer}>
                                                <Link href={'/vacancies/' + vac.slug}><Button>{t('detail')}</Button></Link>
                                                <a href={'tel:' + vac.phone}><Button color={'tertiary'} iconLeft={'call'}>
                                                    {t('call')}
                                                </Button></a>
                                            </div>}
                                    </div>
                                </div>
                                <div bp={'12 7@md'} className={cnb(css.cardRoot, css.vacancyInfo)}>
                                    {!isMobile && <div className={css.content} style={{padding: 0, marginBottom: 12}}>
                                        <p className={css.caption}>{vac.salonTitle}</p>
                                        <Link href={'/vacancies/' + vac.slug}><h2>{vac.title}</h2></Link>
                                        <p>{vac.description}</p>
                                    </div>}

                                    <div style={{marginBottom: 12}} className={'flex align-end justify-between non-selectable'}>
                                        <span className={css.caption}>{t('salaryShort')}</span>
                                        <span className={css.value}>{t('from')} {formatPrice(vac.salary)} {t('kzt')}</span>
                                    </div>
                                    <div style={{marginBottom: 12}} className={'flex align-end justify-between non-selectable'}>
                                        <span className={css.caption}>{t('schedule')}</span>
                                        <span className={css.value}>{vac.employment.map(i => t('schedule_' + i)).join(', ')}</span>
                                    </div>
                                    {/*<div style={{marginBottom: 12}} className={'flex align-end justify-between non-selectable'}>*/}
                                    {/*    <span className={css.caption}>{t('workHours')}</span>*/}
                                    {/*    <span className={css.value}>{vac.workHours.from}-{vac.workHours.to}</span>*/}
                                    {/*</div>*/}
                                    {/*<div className={'flex justify-between align-end non-selectable'}>*/}
                                    {/*    <span className={css.caption}>{t('city')}</span>*/}
                                    {/*    <span className={css.value}>{vac.region.name}</span>*/}
                                    {/*</div>*/}

                                    {isMobile && <div className={cnb(css.contactContainer, css.mobile)}>
                                        <Link href={'/vacancies/' + vac.slug}><Button>{t('detail')}</Button></Link>
                                        <a href={'tel:' + vac.phone}><Button color={'tertiary'} iconLeft={'call'}>
                                            {t('call')}
                                        </Button></a>
                                    </div>}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div bp={'12 4@md'}>
                    {(this.state.pageCount > 1 && isMobile) && <Paginator page={this.state.page} onChange={this.handlePageChange}
                                                                          pageCnt={this.state.pageCount} style={{marginBottom: 16}}/>}

                    <ShareInSocialMedia/>
                </div>
            </div>

            {(this.state.pageCount > 1 && !isMobile) && <Paginator page={this.state.page} onChange={this.handlePageChange}
                                                                   pageCnt={this.state.pageCount}/>}
        </section>
    }
}

export default withRouter(BlogPage);
