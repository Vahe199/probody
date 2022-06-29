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
import StarRating from "../../components/kit/Form/StarRating.jsx";
import {capitalize, declination, formatPrice} from "../../helpers/String";
import ParameterView from "../../components/kit/ParameterView.jsx";
import ShareInSocialMedia from "../../components/ShareInSocialMedia";
import TabPanels from "../../components/kit/TabPanels";
import Program from "../../components/kit/Program.jsx";
import MasterDetail from "../../components/kit/MasterDetail";
import ReviewBlock from "../../components/ReviewBlock";
import Collapsible from "../../components/kit/Collapses/Collapsible.jsx";
import Modal from "../../components/kit/Modal";
import TextArea from "../../components/kit/Form/TextArea";
import TextInput from "../../components/kit/Form/TextInput";

class SalonView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            salon: {
                photos: []
            },
            masterLimit: 6,
            map: undefined,
            addReviewModalOpen: false,
            successModalOpen: false,
            allPrograms: [],
            reviews: [],
            suggestedWorkers: [],
            top3Masters: [],
            reviewList: [],
            review: {
                text: '',
                name: '',
                massage: 0,
                interior: 0,
                service: 0
            },
            reviewPaginator: {
                current: 1,
                max: 1
            }
        }

        this.fetchWorkerInfo = this.fetchWorkerInfo.bind(this)
        this.loadReviews = this.loadReviews.bind(this)
        this.showMoreMasters = this.showMoreMasters.bind(this)
        this.setReviewModal = this.setReviewModal.bind(this)
        this.leaveReview = this.leaveReview.bind(this)
        this.closeSuccessModal = this.closeSuccessModal.bind(this)
    }

    static contextType = GlobalContext

    componentDidMount() {
        if (!this.props.router.query.slug) {
            return
        }

        this.fetchWorkerInfo()
    }

    showMoreMasters() {
        this.setState({
            masterLimit: this.state.masterLimit + 3
        })
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
            if (res.worker[0].parent) {
                res.worker[0].region = res.worker[0].parent.region
                res.worker[0].leads = res.worker[0].parent.leads
                res.worker[0].services = res.worker[0].parent.services
                res.worker[0].location = res.worker[0].parent.location
                res.worker[0].workDays = res.worker[0].parent.workDays
                res.worker[0].workHours = res.worker[0].parent.workHours
                res.worker[0].description = res.worker[0].parent.description
                res.worker[0].address = res.worker[0].parent.address
                res.worker[0].programs = res.worker[0].parent.programs
                res.worker[0].messengers = res.worker[0].parent.messengers
                res.worker[0].phone = res.worker[0].parent.phone
                res.worker[0].social = res.worker[0].parent.social
            }

            this.setState({
                salon: res.worker[0],
                reviews: res.reviews,
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

            const initMap = () => {
                const map = new window.ymaps.Map('salonLocation', {
                    center: res.worker[0].location.coordinates,
                    zoom: 15,
                    controls: []
                }, {})

                map.geoObjects.add(new window.ymaps.Placemark(res.worker[0].location.coordinates, {}, {
                        iconImageHref: '/icons/point.svg',
                        iconLayout: 'default#image'
                    })
                )

                this.setState({
                    map
                })
            }

            if (!this.state.map) {
                window.ymaps.ready(initMap.bind(this))
            }
        })

        APIRequests.getSuggestedWorkers(this.props.router.query.slug).then(res => {
            this.setState({
                suggestedWorkers: res
            })
        })
    }

    setReviewModal(val) {
        this.setState({
            addReviewModalOpen: Boolean(val)
        })
    }

    leaveReview() {
        APIRequests.createReview(this.state.salon._id, this.state.review.service, this.state.review.massage, this.state.review.interior, this.state.review.name, this.state.review.text)

        this.setState({
            review: {
                text: '',
                name: this.state.review.name,
                massage: 0,
                interior: 0,
                service: 0
            },
            addReviewModalOpen: false,
            successModalOpen: true
        })
    }

    closeSuccessModal() {
        this.setState({
            successModalOpen: false
        })
    }

    render() {
        const {t, theme, isMobile} = this.context
        const photoHeight = this.state.salon.kind === 'salon' ? (isMobile ? 230 : 250) : (isMobile ? 270 : 370)

        const additionalSections = {
                photos: <div bp={isMobile ? '' : 'grid'} className={isMobile ? css.invisibleScroll : ''}>
                    {this.state.salon.photos && this.state.salon.photos.map((photo, index) =>
                        <div bp={this.state.salon.kind === 'salon' ? '12 6@md' : '6 4@md'} key={index}>
                            <div style={{
                                backgroundImage: `url(${photo})`,
                                height: photoHeight,
                            }} className={css.photo}>&nbsp;</div>
                        </div>
                    )}
                </div>,
                masters: this.state.salon.masters && <div bp={'grid'} style={{gridGap: isMobile ? 5 : 12}}>
                    {this.state.salon.masters.slice(0, this.state.masterLimit).map((master, i) =>
                        <div bp={'6 4@md'} key={i}>
                            <MasterDetail {...master} />
                        </div>
                    )}

                    <div bp={'12'}>
                        {(this.state.masterLimit < this.state.salon.masters.length) &&
                            <Button className={css.showMoreBtn} size={'large'} onClick={this.showMoreMasters}>
                                <span className={'vertical-center'}>{t('showNMore', 3)}</span>
                                <Icon name={'refresh'}/>
                            </Button>}
                    </div>
                </div>,
                cost: <div bp={'grid'}>
                    {this.state.salon.programs && this.state.salon.programs.map((program, index) =>
                        <div bp={'12 6@md'} key={index}>
                            <Program title={program.name} description={program.description} price={program.cost}
                                     duration={program.duration} classicCnt={program.classicCnt}
                                     link={'https://wa.me/' + parsePhoneNumber(this.state.salon.messengers.wa).number.replace('+', '') + '?text=' + encodeURIComponent(t('salonAnswerPrefill') + ' "' + this.state.salon.name + '"')}
                                     eroticCnt={program.eroticCnt} relaxCnt={program.relaxCnt}/>
                        </div>
                    )}
                </div>,
                reviews: <div bp={'grid 12 6@md'} style={{gridGap: 32}}>
                    <div>
                        <div className="flex column" style={{gap: 12}}>
                            <div style={{order: isMobile ? 0 : 1}}>
                                <div bp={'grid 4'} style={{gridGap: 3}}>
                                    <TagCard title={t('salonRating')} style={{minWidth: 120}}
                                             value={this.state.reviews.avg ? this.state.reviews.avg.toFixed(1) : 0}
                                             dark={true}
                                             accent={true}/>
                                    <TagCard title={t('ratings')} value={this.state.reviews?.ratingCount || 0}/>
                                    <TagCard title={t('reviewCnt')} value={this.state.reviews?.reviewCount || 0}/>
                                </div>
                            </div>

                            <div><Button onClick={() => this.setReviewModal(true)}
                                         size={'fill'}>{this.state.reviews.avg ? t('addReview') : t('addFirstReview')}</Button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="flex column" style={{gap: 8}}>
                            {this.state.reviewList.map((review, i) =>
                                <ReviewBlock {...review} key={i}/>
                            )}
                        </div>
                    </div>
                </div>
            },
            tabsHead = {
                masters: this.state.salon.kind === 'salon' && {
                    title: t('masseuses'),
                    cnt: this.state.salon.masters?.length
                },
                cost: {
                    title: t('serviceCost'),
                    cnt: this.state.salon.programs?.length
                },
                reviews: {
                    title: t('reviews'),
                    cnt: this.state.reviews?.count || 0
                },
                photos: {
                    title: t('photo'),
                    cnt: this.state.salon.photos.length
                }
            }

        return <div className={css['theme--' + theme]}>
            <Head>
                <title>{this.state.salon.name || t('salon2')}{TITLE_POSTFIX}</title>
            </Head>

            <Modal open={this.state.addReviewModalOpen} onUpdate={this.setReviewModal} isMobile={isMobile}
                   useNav={isMobile}>
                {!isMobile && <div className={cnb(css.modalHead, css.desktop)}>
                    <h2>{t('creatingReview')}</h2>

                    <Icon name={'close'} onClick={() => this.setReviewModal(false)}/>
                </div>}

                <div style={!isMobile ? {
                    padding: '20px'
                } : {}}>
                    <div className="responsive-content">
                        <h1 style={{
                            marginTop: isMobile ? 32 : 0,
                            marginBottom: 24
                        }}>{t('leaveYourReview')}</h1>

                        <div className={css.reviewModalContent}>
                            <div>
                                <p className="subtitle2">{capitalize(t('service'))}</p>

                                <StarRating value={this.state.review.service} onUpdate={service => this.setState({
                                    review: {
                                        ...this.state.review,
                                        service
                                    }
                                })}/>
                            </div>

                            <div>
                                <p className="subtitle2">{capitalize(t('massage'))}</p>

                                <StarRating value={this.state.review.massage} onUpdate={massage => this.setState({
                                    review: {
                                        ...this.state.review,
                                        massage
                                    }
                                })}/>
                            </div>

                            <div>
                                <p className="subtitle2">{capitalize(t('interior'))}</p>

                                <StarRating value={this.state.review.interior} onUpdate={interior => this.setState({
                                    review: {
                                        ...this.state.review,
                                        interior
                                    }
                                })}/>
                            </div>

                            <div>
                                <p className="subtitle2">{t('yourName')}</p>

                                <TextInput label={t('whatsYourName')} placeholder={t('typeYourName')}
                                           value={this.state.review.name} onUpdate={name => this.setState({
                                    review: {
                                        ...this.state.review,
                                        name
                                    }
                                })}/>
                            </div>

                            <div>
                                <p className="subtitle2">{t('review')}</p>

                                <TextArea label={t('reviewText')} placeholder={t('enterYourReview')} max={100}
                                          value={this.state.review.text} onUpdate={text => this.setState({
                                    review: {
                                        ...this.state.review,
                                        text
                                    }
                                })}/>
                            </div>

                            <div style={{
                                marginBottom: isMobile ? 24 : 0
                            }}>
                                <Button onClick={this.leaveReview}
                                        isDisabled={this.state.review.service === 0 || this.state.review.massage === 0 || this.state.review.interior === 0}
                                        size={'fill'}>
                                    {t('leaveReview')}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>

            <Modal modalStyle={{maxWidth: 380, position: 'relative'}} open={this.state.successModalOpen}
                   onUpdate={this.closeSuccessModal}>
                <div className={css.modalBody}>
                    <p>{t('cool')}</p>

                    <h1>{t('youPostedReview')}</h1>

                    <p>{t('itWillBePublishedAfterModeration')}</p>

                    <Button size={'fill'} onClick={() => this.props.router.push('/')}>{t('toMainPage')}</Button>

                    <Icon name={'close'} className={css.modalClose} onClick={this.closeSuccessModal}/>
                </div>
            </Modal>

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
                        <ImageCarousel
                            height={this.state.salon.kind === 'salon' ? (isMobile ? 240 : 320) : (isMobile ? 450 : 580)}
                            pics={this.state.salon.photos}/>

                        {isMobile && <div className={css.padded}>
                            {this.state.salon.isVerified && <div className={cnb(css.caption, 'non-selectable')}>
                                <Icon name={'round_check'} className={css.verifiedIcon}/>

                                <span>{t('verified')}</span>
                            </div>}

                            <div className={cnb(css.caption, 'non-selectable')}>
                                <span>{this.state.salon.parent?.name}</span>
                            </div>

                            <h1 className={'cursor-pointer'}>{this.state.salon.name}</h1>
                        </div>}
                    </div>

                    {!isMobile && <div style={{marginTop: 8}} className={cnb(css.padded, css.cardRoot)}>
                        {this.state.salon.description &&
                            <div className={css.textSectionDecorator}>
                                <p className="subtitle2" style={{marginBottom: 12}}>
                                    {t('description')}
                                </p>

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
                                    <span
                                        className={'vertical-center'}>{this.state.salon.messengers.tg ? (isMobile ? '' : t('sendMessage')) : t('sendMessage')}</span>
                                </Button>
                            </a></div>
                            {this.state.salon.messengers.tg && <div><a target="_blank"
                                                                       href={'https://t.me/' + this.state.salon.messengers.tg.replace('@', '')}>
                                <Button color={'tertiary'}>
                                    <Icon name={'tg_light'}/>
                                    <span className={'vertical-center'}>{t('sendMessage')}</span>
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

                            <div className={cnb(css.caption, 'non-selectable')}>
                                <span>{this.state.salon.parent?.name}</span>
                            </div>

                            <div bp={'grid'}>
                                <h1 bp={'7'}
                                    className={'cursor-pointer'}>{this.state.salon.name}</h1>

                                <div bp={'5'} style={{paddingTop: 8}}
                                     className="flex justify-end gap-12">
                                    {this.state.reviews.count > 0 ? <div className={css.avgRating}>
                                        <Icon name={'star'}/>
                                        <span>{this.state.reviews.avg > 0 ? this.state.reviews.avg.toFixed(1) : '-'}</span>
                                    </div> : <div>&nbsp;</div>}

                                    <Button size={'small'}>{t('onTheMap').toLowerCase()}</Button>
                                </div>
                            </div>
                        </div>}

                        <div bp={'grid'} style={{gridGap: isMobile ? 16 : 60}}>
                            <div bp={'12 7@md'} className={cnb(css.padded, css.shortInfoBlock)}>
                                <div>
                                    <div>{t('address').toLowerCase()}</div>
                                    <div>{this.state.salon.address}</div>
                                </div>

                                <div>
                                    <div>{t('city').toLowerCase()}</div>
                                    <div>{this.state.salon.region?.name}</div>
                                </div>

                                {this.state.reviews.count > 0 && <div>
                                    <div>{t('reviews').toLowerCase()}</div>
                                    <Link href={{
                                        query: Object.assign({}, this.props.router.query, {
                                            salonTab: 'reviews'
                                        }),
                                        hash: '#salonTab'
                                    }}>
                                        <div
                                            className={css.linkUnderline}>{this.state.reviews.count} {declination(this.state.reviews.count || 0, t('reviewDeclination'))}
                                        </div>
                                    </Link>
                                </div>}

                                {this.state.reviews.avg > 0 && <div bp={'hide@md'}>
                                    <div className={css.avgRating}>
                                        <Icon name={'star'}/>
                                        <span>{this.state.reviews.avg.toFixed(1)}</span>
                                    </div>

                                    <div><Button size={'small'}>{t('onTheMap').toLowerCase()}</Button>
                                    </div>
                                </div>}
                            </div>

                            <div bp={'5 show@md hide'}>
                                <div className="flex column justify-between" style={{marginTop: 14}}>
                                    <p className={'subtitle2'}
                                       style={{marginBottom: 4}}>{Object.keys(this.state.salon.social || []).some(i => this.state.salon.social[i].length) && t('socialMedia')}</p>
                                    <div className={'flex align-end fit'}
                                         style={{paddingBottom: 16, paddingRight: 16}}>
                                        <div className={css.socialBlock}>
                                            {Object.keys(this.state.salon.social || []).filter(i => this.state.salon.social[i].length).map(name =>
                                                <div key={name}>
                                                    <a target="_blank" href={this.state.salon.social[name]}
                                                       className={css.img}>
                                                        <Icon name={name + '_' + theme}/>
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {this.state.salon.kind === 'master' && <div style={{marginTop: 4}}>
                        <ParameterView {...this.state.salon.characteristics} />
                    </div>}

                    {this.state.salon.workHours &&
                        <div bp={'grid'} style={{marginTop: 4}} className={cnb(css.cardRoot, css.padded)}>
                            <div bp={'12 6@md'} className={css.shortInfoBlock}>
                                <div>
                                    <div>{t('workSchedule').toLowerCase()}</div>
                                    <div>{this.state.salon.workHours.roundclock ? t('roundclock').toLowerCase() : this.state.salon.workHours?.from + '-' + this.state.salon.workHours?.to}</div>
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
                            {this.state.salon.services &&
                                <div style={{marginBottom: 24}}>
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

                            {this.state.salon.programs &&
                                <div>
                                    <p className="subtitle2"
                                       style={{marginBottom: 16}}>{t(this.state.salon.kind + '_makingMassage')}</p>

                                    <div className="flex wrap" style={{gap: 4}}>
                                        {this.state.salon.programs.map((massageType, i) =>
                                            <Tag key={i} label={massageType.name}/>
                                        )}
                                    </div>
                                </div>
                            }
                        </div>

                        {(this.state.salon.avgCost && !this.state.salon.parent) ?
                            <div bp={'12 4@md'} style={{marginTop: isMobile ? 0 : 16}}>
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
                            </div> : ''}
                    </div>
                </div>
            </div>

            <div bp={'grid'} style={{marginTop: 32, gridGap: 28}}>
                <div bp={'12 8@md'}>
                    {(this.state.salon.photos && !isMobile) &&
                        <TabPanels tabKey={'salonTab'} head={tabsHead} body={additionalSections}/>}

                    {(isMobile && this.state.salon.description) &&
                        <div className={cnb(css.cardRoot, css.padded)}
                             style={{marginBottom: 24}}>
                            <h2 style={{marginBottom: 16}}>{t('description')}</h2>
                            <TextSection style={{padding: 0}} lines={5}>
                                {this.state.salon.description}
                            </TextSection>
                        </div>
                    }

                    {isMobile &&
                        <div id={'salonTab'}>{Object.keys(additionalSections).map((sectionName, i) =>
                            tabsHead[sectionName] ? <div key={i} style={{marginBottom: 4}}>
                                <Collapsible count={tabsHead[sectionName]?.cnt} title={tabsHead[sectionName]?.title}
                                             defaultOpen={i === 0}>
                                    <div style={{
                                        marginTop: 18,
                                        padding: (isMobile && sectionName === 'photos') ? '0 0 0 16px' : '0 16px'
                                    }}>
                                        {additionalSections[sectionName]}

                                        <div className={css.divider}>&nbsp;</div>
                                    </div>
                                </Collapsible>
                            </div> : ''
                        )}</div>}
                </div>
                <div bp={'12 4@md'}>
                    <ShareInSocialMedia/>
                </div>
            </div>

            <div bp={'hide@md'} className={css.cardRoot} style={{marginTop: 24}}>
                <div id={'salonLocation'} className={css.mapMobile}></div>

                <div className={cnb(css.shortInfoBlock)} style={{gap: 22, padding: 20}}>
                    <div>
                        <div>{t('address').toLowerCase()}</div>
                        <div>{this.state.salon.address}</div>
                    </div>

                    {this.state.reviews.count > 0 && <div>
                        <div>{t('reviews').toLowerCase()}</div>
                        <Link href={{
                            query: Object.assign({}, this.props.router.query, {
                                salonTab: 'reviews'
                            }),
                            hash: '#salonTab'
                        }}>
                            <div
                                className={css.linkUnderline}>{this.state.reviews.count} {declination(this.state.reviews.count || 0, t('reviewDeclination'))}
                            </div>
                        </Link>
                    </div>}

                    {this.state.reviews.avg > 0 && <div bp={'hide@md'}>
                        <div className={css.avgRating}>
                            <Icon name={'star'}/>
                            <span>{this.state.reviews.avg.toFixed(1)}</span>
                        </div>

                        <div><Button size={'small'}>{t('onTheMap').toLowerCase()}</Button>
                        </div>
                    </div>}
                </div>
            </div>

            <div className={'responsive-content'}>
                {this.state.suggestedWorkers.length > 0 && <h2 style={{
                    marginBottom: 12,
                    marginTop: 24
                }}>{this.state.salon.kind === 'salon' ? t('otherSalons') : (this.state.salon.parent ? t('otherSalonMasters') : t('otherMasters'))}</h2>}
            </div>

            {this.state.salon.kind !== 'salon' &&
                <div style={{paddingLeft: isMobile ? 16 : 0}} bp={isMobile ? '' : 'grid'}
                     className={cnb(isMobile ? css.invisibleScroll : '', css.masters)}>
                    {this.state.suggestedWorkers.length > 0 && this.state.suggestedWorkers.map((worker, index) => {
                        worker.url = '/salon/' + worker.slug

                        return <div bp={'12 4@md'} key={index}>
                            <MasterDetail name={worker.name} photos={worker.photos} slug={worker.slug}
                                          noContent={true}/>
                        </div>
                    })}
                </div>}

            {this.state.salon.kind === 'salon' && <div bp={'grid'}>
                {this.state.suggestedWorkers.length > 0 && this.state.suggestedWorkers.map((worker, index) => {
                    worker.url = '/salon/' + worker.slug

                    return <div bp={'12 4@md'} key={index}>
                        <div className={css.cardRoot}>
                            <ImageCarousel
                                height={this.state.salon.kind === 'master' ? (isMobile ? 470 : 520) : (isMobile ? 230 : 275)}
                                link={worker.url} pics={worker.photos}/>

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
            </div>}

            {this.state.salon.kind !== 'salon' && <div className={'responsive-content ' + css.fullSizeBtnResponsive}>
                <Button onClick={() => this.props.router.push(this.state.salon.parent ? {
                    query: Object.assign({}, this.props.router.query, {
                        salonTab: 'masters'
                    }),
                    hash: '#salonTab',
                    pathname: '/salon/' + this.state.salon.parent.slug
                } : {
                    pathname: '/',
                    query: {
                        ...this.props.router.query,
                        kind: 'master'
                    },
                    hash: ''
                })}
                        color={'secondary'}
                        size={'fill'}>{this.state.salon.parent ? (isMobile ? t('otherSalonArticles') : t('viewAllArticles')) : t('viewAllArticles')}</Button>
            </div>}

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
                            <ImageCarousel height={isMobile ? 470 : 520} link={worker.url} pics={worker.photos}/>

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

            {(this.state.salon.phone && isMobile) && <div className={cnb(css.stretchContainer, css.stickToBottom)}>
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
                        {this.state.salon.messengers.tg ? '' : t('sendMessage')}
                    </Button>
                </a></div>
                {this.state.salon.messengers.tg && <div><a target="_blank"
                                                           href={'https://t.me/' + this.state.salon.messengers.tg.replace('@', '')}>
                    <Button color={'tertiary'}>
                        <Icon name={'tg_light'}/>
                    </Button>
                </a></div>}
            </div>}
        </div>
    }
}

export default withRouter(SalonView);
