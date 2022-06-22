import React from "react";
import APIRequests from "../../helpers/APIRequests.js";
import {TITLE_POSTFIX} from "../../helpers/constants.js";
import Head from "next/head.js";
import {GlobalContext} from "../../contexts/Global.js";
import Breadcrumbs from "../../components/kit/Breadcrumbs.jsx";
import css from "../../styles/salonview.module.scss";
import ImageCarousel from "../../components/kit/ImageCarousel.jsx";
import {cnb} from "cnbuilder";
import Icon from "../../components/kit/Icon.jsx";
import Link from "next/link.js";
import {withRouter} from "next/router.js";
import Button from "../../components/kit/Button.jsx";
import {parsePhoneNumber} from "libphonenumber-js";
import TextSection from "../../components/kit/TextSection.jsx";
import WeekView from "../../components/kit/WeekView";
import Dates from "../../helpers/Dates.js";
import Tag from "../../components/kit/Tag";
import TagCard from "../../components/kit/TagCard";
import {declination, formatPrice} from "../../helpers/String";
import ParameterView from "../../components/kit/ParameterView.jsx";
import ShareInSocialMedia from "../../components/ShareInSocialMedia";
import TabPanels from "../../components/kit/TabPanels";
import Program from "../../components/kit/Program.jsx";
import MasterDetail from "../../components/kit/MasterDetail";
import ReviewBlock from "../../components/ReviewBlock";

class SalonView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            salon: {
                photos: []
            },
            allPrograms: [],
            reviews: [],
            suggestedWorkers: [],
            top3Masters: [],
            reviewList: [],
            reviewPaginator: {
                current: 1,
                max: 1
            }
        }

        this.fetchWorkerInfo = this.fetchWorkerInfo.bind(this)
        this.loadReviews = this.loadReviews.bind(this)
    }

    static contextType = GlobalContext

    componentDidMount() {
        if (!this.props.router.query.slug) {
            return
        }

        this.fetchWorkerInfo()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.router.query.slug !== this.props.router.query.slug) {
            this.fetchWorkerInfo()
        }
    }

    loadReviews(workerId) {
        if (!workerId) {
            workerId = this.state.salon._id
        }

        APIRequests.getReviews(workerId).then(response => {
            this.setState({
                reviewList: response.reviews,
                reviewPaginator: {
                    ...this.state.reviewPaginator,
                    max: response.pageCount
                }
            })
        })
    }

    fetchWorkerInfo() {
        APIRequests.getWorker(this.props.router.query.slug).then(res => {
            this.setState({
                salon: res.worker[0],
                reviews: res.reviews[0],
                allPrograms: res.allPrograms
            })

            this.loadReviews(res.worker[0]._id)

            if (res.worker[0].kind === 'master') {
                APIRequests.top3Masters().then(top3 => {
                    this.setState({
                        top3Masters: top3
                    })
                })
            }
        })

        APIRequests.getSuggestedWorkers(this.props.router.query.slug).then(res => {
            this.setState({
                suggestedWorkers: res
            })
        })
    }

    render() {
        const {t, theme, isMobile} = this.context
        const themeAccent = theme === 'dark' ? 'light' : 'dark'

        const additionalSections = {
                photos: <div bp={'grid'}>
                    {this.state.salon.photos && this.state.salon.photos.map((photo, index) =>
                        <div style={{
                            backgroundImage: `url(${photo})`,
                            height: this.state.salon.kind === 'salon' ? 230 : 350,
                        }} bp={this.state.salon.kind === 'salon' ? '12 6@md' : '6 4@md'} key={index}
                             className={css.photo}>&nbsp;</div>
                    )}
                </div>,
                masters: this.state.salon.masters && <div bp={'grid'} style={{gridGap: isMobile ? 5 : 12}}>
                    {this.state.salon.masters.map((master, i) =>
                        <div bp={'6 4@md'} key={i}>
                            <MasterDetail {...master} />
                        </div>
                    )}
                </div>,
                cost: <div bp={'grid'}>
                    {this.state.salon.programs && this.state.salon.programs.map((program, index) =>
                        <div bp={'12 6@md'} key={index}>
                            <Program title={program.name} description={program.description} price={program.cost}
                                     duration={program.duration} classicCnt={program.classicCnt} link={'https://google.com'}
                                     eroticCnt={program.eroticCnt} relaxCnt={program.relaxCnt}/>
                        </div>
                    )}
                </div>,
                reviews: this.state.reviewList.length > 0 && <div bp={'grid'} style={{gridGap: 32}}>
                    <div bp={'12 6@md'}>
                        <div className="fit" bp={'grid'} style={{gridGap: 12}}>
                            <div bp={'12 last@md'}>
                                <div bp={'grid 4'} style={{gridGap: 3}}>
                                    <TagCard title={t('salonRating')}
                                                           value={this.state.reviews.avg.toFixed(1)}
                                                           dark={true}
                                                           accent={true}/>
                                    <TagCard title={t('ratings')} value={this.state.reviews.count}/>
                                    <TagCard title={t('reviewCnt')} value={this.state.reviews.count}/>
                                </div>
                            </div>

                            <div bp={'12'} style={{marginBottom: isMobile ? 0 : -28}}><Button size={'fill'}>{t('addReview')}</Button></div>
                        </div>
                    </div>
                    <div bp={'12 6@md'}>
                        {this.state.reviewList.map((review, i) =>
                            <ReviewBlock {...review} key={i}/>
                        )}
                    </div>
                </div>
            },
            tabsHead = {
                photos: {
                    title: t('photo'),
                    cnt: this.state.salon.photos.length
                },
                masters: this.state.salon.kind === 'salon' && {
                    title: t('masseuses'),
                    cnt: this.state.salon.masters?.length
                },
                cost: {
                    title: t('serviceCost'),
                    cnt: this.state.salon.programs?.length
                },
                reviews: this.state.reviews && {
                    title: t('reviews'),
                    cnt: this.state.reviews.count
                }
            }

        return <div className={css['theme--' + theme]}>
            <Head>
                <title>{this.state.salon.name || t('salon2')}{TITLE_POSTFIX}</title>
            </Head>

            <Breadcrumbs items={[
                {
                    name: t('mainPage'),
                    href: '/',
                },
                {
                    name: this.state.salon.name || t('salonView'),
                    href: '/salon/' + this.props.router.query.slug,
                },
            ]}/>

            <div bp={'grid'} style={{gridGap: 8}}>
                <div bp={'12 5@md'}>
                    <div className={css.cardRoot}>
                        <ImageCarousel pics={this.state.salon.photos}/>

                        {isMobile && <div className={css.padded}>
                            {this.state.salon.isVerified && <div className={cnb(css.caption, 'non-selectable')}>
                                <Icon name={'round_check'} className={css.verifiedIcon}/>

                                <span>{t('verified')}</span>
                            </div>}

                            <h1 className={'cursor-pointer'}>{this.state.salon.name}</h1>
                        </div>}
                    </div>

                    {!isMobile && <div style={{marginTop: 8}} className={cnb(css.padded, css.cardRoot)}>
                        {this.state.salon.description &&
                            <div className={css.textSectionDecorator}>
                                <TextSection style={{padding: 0}} lines={5}>
                                    {this.state.salon.description}
                                </TextSection>
                            </div>
                        }

                        {this.state.salon.phone && <div className={css.stretchContainer}>
                            <div><a href={'tel:' + parsePhoneNumber(this.state.salon.phone).number}>
                                <Button>
                                    <Icon name={'call'}/>
                                    {t('call')}
                                </Button>
                            </a></div>
                            <div><a target="_blank"
                                    href={'https://wa.me/' + parsePhoneNumber(this.state.salon.messengers.wa).number.replace('+', '') + '?text=' + encodeURIComponent(t('salonAnswerPrefill') + ' "' + this.state.salon.name + '"')}>
                                <Button color={'tertiary'}>
                                    <Icon name={'wa_light'}/>
                                    {this.state.salon.messengers.tg ? (isMobile ? '' : t('sendMessage')) : t('sendMessage')}
                                </Button>
                            </a></div>
                            {this.state.salon.messengers.tg && <div><a target="_blank"
                                                                       href={'https://t.me/' + this.state.salon.messengers.tg}>
                                <Button color={'tertiary'}>
                                    <Icon name={'tg_light'}/>
                                    {t('sendMessage')}
                                </Button>
                            </a></div>}
                        </div>}
                    </div>}
                </div>

                <div bp={'12 7@md'}>
                    <div className={css.cardRoot}>
                        {!isMobile && <div className={css.padded}>
                            {this.state.salon.isVerified && <div className={cnb(css.caption, 'non-selectable')}>
                                <Icon name={'round_check'} className={css.verifiedIcon}/>

                                <span>{t('verified')}</span>
                            </div>}

                            <div bp={'grid'}>
                                <h1 bp={'7'}
                                    className={'cursor-pointer'}>{this.state.salon.name}</h1>

                                <div bp={'5'} style={{paddingTop: 8}}
                                     className="flex justify-end gap-12">
                                    {this.state.reviews ? <div className={css.avgRating}>
                                        <Icon name={'star'}/>
                                        <span>{this.state.reviews.avg ? this.state.reviews.avg.toFixed(1) : '-'}</span>
                                    </div> : <div>&nbsp;</div>}

                                    <Button size={'small'}>{t('onTheMap')}</Button>
                                </div>
                            </div>
                        </div>}

                        <div bp={'grid'} style={{gridGap: 60}}>
                            <div bp={'12 7@md'} className={cnb(css.padded, css.shortInfoBlock)}>
                                <div>
                                    <div>{t('address').toLowerCase()}</div>
                                    <div>{this.state.salon.address}</div>
                                </div>

                                <div>
                                    <div>{t('city').toLowerCase()}</div>
                                    <div>{this.state.salon.region?.name}</div>
                                </div>

                                {this.state.reviews && <div>
                                    <div>{t('reviews').toLowerCase()}</div>
                                    <Link href={{
                                        query: Object.assign({}, this.props.router.query, {
                                            salonTab: 'reviews'
                                        }),
                                        hash: '#salonTab'
                                    }}>
                                        <div
                                            className={css.linkUnderline}>{this.state.reviews.count || 0} {declination(this.state.reviews.count || 0, t('reviewDeclination'))}
                                        </div>
                                    </Link>
                                </div>}

                                {this.state.reviews && <div bp={'hide@md'}>
                                    <div className={css.avgRating}>
                                        <Icon name={'star'}/>
                                        <span>{this.state.reviews.avg ? this.state.reviews.avg.toFixed(1) : '-'}</span>
                                    </div>

                                    <div><Button size={'small'}>{t('onTheMap').toLowerCase()}</Button>
                                    </div>
                                </div>}
                            </div>

                            <div bp={'5 show@md hide'}>
                                <div className="flex column justify-between" style={{marginTop: 14}}>
                                    <p className={'subtitle2'} style={{marginBottom: 4}}>{t('socialMedia')}</p>
                                    <div className={'flex align-end fit'}
                                         style={{paddingBottom: 16, paddingRight: 16}}>
                                        <div className={css.socialBlock}>
                                            {Object.keys(this.state.salon.social || []).filter(i => this.state.salon.social[i].length).map(name =>
                                                <div key={name}>
                                                    <a target="_blank" href={this.state.salon.social[name]}>
                                                        <img
                                                            src={'/icons/' + name + '_' + themeAccent + '.svg'}
                                                            alt={t(name)}/>
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {this.state.salon.kind === 'master' && <div style={{marginTop: 8}}>
                        <ParameterView {...this.state.salon.characteristics} />
                    </div>}

                    {this.state.salon.workHours &&
                        <div bp={'grid'} style={{marginTop: 8}} className={cnb(css.cardRoot, css.padded)}>
                            <div bp={'12 6@md'} className={css.shortInfoBlock}>
                                <div>
                                    <div>{t('workSchedule').toLowerCase()}</div>
                                    <div>{this.state.salon.workHours.roundclock ? t('roundclock') : this.state.salon.workHours?.from + '-' + this.state.salon.workHours?.to}</div>
                                </div>

                                <div>
                                    <div>{t('status').toLowerCase()}</div>
                                    <div>{Dates.isOpen(this.state.salon.workDays, this.state.salon.workHours) ? t('opened') : t('closed')}</div>
                                </div>
                            </div>

                            <div bp={'12 6@md'}>
                                <WeekView enabledDays={this.state.salon.workDays || []}/>
                            </div>
                        </div>}

                    <div bp={'grid'} style={{marginTop: 8}}>
                        <div bp={'12 8@md'} style={{gridGap: 8}} className={cnb(css.padded)}>
                            {this.state.salon.programs &&
                                <div style={{marginBottom: 24}}>
                                    <p className="subtitle2"
                                       style={{marginBottom: 16}}>{t(this.state.salon.kind + '_makingMassage')}</p>

                                    <div className="flex wrap" style={{gap: 4}}>
                                        {this.state.salon.programs.map((massageType, i) =>
                                            <Tag key={i} label={massageType.name}/>
                                        )}
                                    </div>
                                </div>
                            }
                            {this.state.salon.services &&
                                <div>
                                    <p className="subtitle2"
                                       style={{marginBottom: 16}}>{t(this.state.salon.kind + 'ServiceAndServices')}</p>

                                    <div className="flex wrap" style={{gap: 4}}>
                                        {this.state.salon.leads.map((lead, i) =>
                                            <Tag key={i} icon={lead.icon} label={lead.name}/>
                                        )}
                                        {this.state.salon.services.map((service, i) =>
                                            <Tag key={i} icon={service.icon} label={service.name}/>
                                        )}
                                    </div>
                                </div>
                            }
                        </div>

                        {this.state.salon.avgCost && <div bp={'12 4@md'} style={{marginTop: isMobile ? 0 : 16}}>
                            <div bp={'grid 6 12@md'} style={{gridGap: 8}} className={'responsive-content'}>
                                <TagCard title={t('avgCostLong').toLowerCase()}
                                         value={formatPrice(this.state.salon.avgCost) + ' ' + t('kzt')}
                                         dark={true}
                                         link={{
                                             query: Object.assign({}, this.props.router.query, {
                                                 salonTab: 'cost'
                                             }),
                                             hash: '#salonTab'
                                         }}/>
                                <TagCard title={t('roomCount').toLowerCase()} value={this.state.salon.rooms}
                                         dark={true}
                                         link={{
                                             query: Object.assign({}, this.props.router.query, {
                                                 salonTab: 'cost'
                                             }),
                                             hash: '#salonTab'
                                         }}/>
                            </div>
                        </div>}
                    </div>
                </div>
            </div>

            <div bp={'grid'} style={{marginTop: 32, gridGap: 28}}>
                <div bp={'12 8@md'}>
                    {(this.state.salon.photos && !isMobile) &&
                        <TabPanels tabKey={'salonTab'} head={tabsHead} body={additionalSections}/>}

                    {isMobile &&
                        <div className={'responsive-content'}>{Object.keys(additionalSections).map((sectionName, i) =>
                            <div key={i} style={{marginBottom: 24}}>
                                <h2 style={{marginBottom: 18}}>{tabsHead[sectionName]?.title}</h2>
                                {additionalSections[sectionName]}
                            </div>
                        )}</div>}
                </div>
                <div bp={'12 4@md'}>
                    <ShareInSocialMedia/>
                </div>
            </div>

            <div className={'responsive-content'}>
                <h2 style={{
                    marginBottom: 12,
                    marginTop: 24
                }}>{this.state.salon.kind === 'salon' ? t('otherSalons') : t('otherMasters')}</h2>
            </div>

            <div bp={'grid'}>
                {this.state.suggestedWorkers.length > 0 && this.state.suggestedWorkers.map((worker, index) => {
                    worker.url = '/salon/' + worker.slug

                    return <div bp={'12 4@md'} key={index}>
                        <div className={css.cardRoot}>
                            <ImageCarousel link={worker.url} pics={worker.photos}/>

                            <div className={css.padded}>
                                {worker.isVerified && <div className={cnb(css.caption, 'non-selectable')}>
                                    <Icon name={'round_check'} className={css.verifiedIcon}/>

                                    <span>{t('verified')}</span>
                                </div>}

                                <Link href={worker.url}><h1 className={'cursor-pointer'}>{worker.name}</h1>
                                </Link>
                            </div>
                        </div>
                    </div>
                })}
            </div>

            {this.state.salon.kind === 'master' && <div className={'responsive-content'}>
                <h2 style={{
                    marginBottom: 12,
                    marginTop: 24
                }}>{t('top3Masters')}</h2>
            </div>}

            <div bp={'grid'}>
                {(this.state.salon.kind === 'master' && this.state.top3Masters) && this.state.top3Masters.map((worker, index) => {
                    worker.url = '/salon/' + worker.slug

                    return <div bp={'12 4@md'} key={index}>
                        <div className={css.cardRoot}>
                            <ImageCarousel link={worker.url} pics={worker.photos}/>

                            <div className={css.padded}>
                                {worker.isVerified && <div className={cnb(css.caption, 'non-selectable')}>
                                    <Icon name={'round_check'} className={css.verifiedIcon}/>

                                    <span>{t('verified')}</span>
                                </div>}

                                <Link href={worker.url}><h1 className={'cursor-pointer'}>{worker.name}</h1>
                                </Link>
                            </div>
                        </div>
                    </div>
                })}
            </div>
        </div>
    }
}

export default withRouter(SalonView);
