import React from "react"
import {withRouter} from "next/router.js"
import {GlobalContext} from "../contexts/Global.js"
import AboutUsSection from "../components/AboutUsSection.jsx"
import {TITLE_POSTFIX} from "../helpers/constants.js"
import Head from "next/head.js"
import css from '../styles/mainpage.module.scss'
import APIRequests from "../helpers/APIRequests.js"
import RadioGroup from "../components/kit/Form/RadioGroup"
import ImageCarousel from "../components/kit/ImageCarousel"
import {cnb} from "cnbuilder"
import Icon from "../components/kit/Icon.jsx"
import Link from "next/link.js"
import Paginator from "../components/kit/Paginator.jsx"
import Button from "../components/kit/Button.jsx"
import Objects from "../helpers/Objects.js"
import Popup from "../components/kit/Popup"
import Numbers from "../helpers/Numbers.js"
import ControlledInput from "../components/kit/Form/ControlledInput.jsx"
import {parsePhoneNumber} from "libphonenumber-js"
import ProgramCard from "../components/kit/ProgramCard"
import MockProgramCard from "../components/kit/MockProgramCard.jsx"
import ParameterView from "../components/kit/ParameterView.jsx"
import ShortMasterCard from "../components/kit/ShortMasterCard"
import MockShortMasterCard from "../components/kit/MockShortMasterCard"
import Checkbox from "../components/kit/Form/Checkbox.jsx"
import TransparentCollapsible from "../components/kit/Collapses/TransparentCollapsible.jsx"
import MultipleRangeInput from "../components/kit/Form/MultipleRangeInput"
import debounce from "../helpers/debounce"
import Select from "../components/kit/Form/Select.jsx"
import {declination} from "../helpers/String.js"

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            workers: [],
            filters: {},
            handleRef: React.createRef(),
            filterPopupOpen: false,
            preventLoading: false,
            map: undefined,
            workerLocations: {},
            chosenSalonId: '',
            preloadedSalons: {},

            pageCount: 1,
            foundCnt: 0,
            regions: [],
            myRegion: '',
            priceRange: {
                from: 1000,
                to: 99999
            }
        }

        this.initPageLoad = this.initPageLoad.bind(this)
        this.handlePageChange = this.handlePageChange.bind(this)
        this.setKind = this.setKind.bind(this)
        this.performSearch = debounce(this.performSearch.bind(this), 500)
        this.toggleFilterPopup = this.toggleFilterPopup.bind(this)
        this.getPage = this.getPage.bind(this)
        this.resetFilters = this.resetFilters.bind(this)
        this.toggleFilter = this.toggleFilter.bind(this)
        this.setPriceRange = this.setPriceRange.bind(this)
        this.setRegion = this.setRegion.bind(this)
        this.getAppliedFilterCnt = this.getAppliedFilterCnt.bind(this)
        this.loadMore = this.loadMore.bind(this)
        this.addMapObjects = this.addMapObjects.bind(this)
        this.searchNearMe = this.searchNearMe.bind(this)
    }

    async initPageLoad(volatile = false) {
        if (Objects.isEmpty(this.state.filters)) {
            APIRequests.getFilters().then(filters => {
                this.setState({
                    filters,
                    priceRange: filters.priceRange
                })
            })
        }

        this.performSearch(volatile)
    }

    componentDidMount() {
        this.initPageLoad()

        APIRequests.getRegions().then(regions => {
            regions.unshift({
                name: this.context.t('entireKZ'),
            })

            this.setState({
                regions: regions.map(r => ({_id: r.name, name: r.name}))
            })

            // if (window.ymaps.geolocation) {
            //     window.ymaps.geolocation.get({
            //         provider: 'yandex'
            //     }).then(result => {
            //         const ipCoords = result.geoObjects.get(0).geometry.getCoordinates()
            //
            //         APIRequests.getNearestCity(ipCoords).then(async city => {
            //             const geo = this.props.router.query['region'] || (regions.findIndex(r => r.name === city) > -1 ? city : this.context.t('entireKZ'))
            //             const newQuery = {}
            //
            //             if (!this.props.router.query['region']) {
            //                 newQuery['region'] = geo
            //             }
            //
            //             this.props.router.push({
            //                 query: Object.assign({}, this.props.router.query, newQuery)
            //             })
            //
            //             this.setState({
            //                 myRegion: city
            //             })
            //         })
            //     });
            // } else {
            this.setState({
                myRegion: this.context.t('entireKZ')
            })
            // }
        })
    }

    toggleFilterPopup() {
        this.setState({
            filterPopupOpen: !this.state.filterPopupOpen
        })
    }

    componentDidUpdate(prevProps, prevState) {
        const query = this.props.router.query

        if (this.state.preventLoading) {
            return
        }

        if (!Objects.shallowEqual(prevProps.router.query, query)) {
            this.initPageLoad()
        }

        if (!query.region && this.state.myRegion) {
            this.props.router.push({
                query: Object.assign({}, query, {
                    region: this.state.myRegion,
                })
            })
        }
    }

    getPage() {
        return parseInt(this.props.router.query.page) || 1
    }

    performSearch(appendResults = false) {
        const mapMixin = {
            region: this.props.router.query.region
        }

        APIRequests.searchWorkers((this.props.router.query.map && this.props.router.query.map === 'true') ? 1 : this.getPage(), this.props.router.query.search ? this.props.router.query.search.trim() : '', {
            kind: this.props.router.query.kind || 'all',
            rooms: this.props.router.query['filters[rooms]']?.split(',').map(i => this.state.filters.rooms.find(room => room._id === i)?.name).join(' '),
            messengers: this.props.router.query['filters[messengers]']?.split(',').map(i => this.state.filters.messengers.find(messenger => messenger._id === i)?.name).join(' '),
            services: this.props.router.query['filters[services]']?.split(',').map(i => this.state.filters.services.find(service => service._id === i)?.name).join(' '),
            leads: this.props.router.query['filters[leads]']?.split(',').map(i => this.state.filters.leads.find(lead => lead._id === i)?.name).join(' '),

            price: {
                from: this.props.router.query.priceFrom,
                to: this.props.router.query.priceTo
            },
            ...mapMixin
        }).then(workers => {
            if (!workers.results) {
                return
            }

            workers.reviews.map(review => {
                workers.results[workers.results.findIndex(worker => worker._id === review._id)].reviews = review
            })

            if (appendResults) {
                workers.results.unshift(...this.state.workers)
            }

            this.setState({
                pageCount: workers.pageCount,
                workers: workers.results,
                foundCnt: workers.count,
                workerLocations: workers.workerLocations
            });

            const initMap = () => {
                if (this.state.map) {
                    return
                }

                const map = new window.ymaps.Map('mapView', {
                    center: workers.results[0].location.coordinates,
                    zoom: 14,
                    controls: []
                }, {})

                this.addMapObjects(workers.workerLocations, map)

                // map.events.add('actionend', () => {
                //     this.performSearch(false)
                // })

                window.map = map

                this.setState({
                    map
                })
            }

            if (!this.state.map) {
                window.ymaps.ready(initMap.bind(this))
            } else {
                this.addMapObjects(workers.workerLocations)
            }
        })
    }

    addMapObjects(workers, map) {
        if (!map) {
            map = this.state.map
        }

        map.geoObjects.removeAll()

        const clusterer = new ymaps.Clusterer({
                groupByCoordinates: false,
                clusterIcons: [{
                    href: '/icons/cluster.svg',
                    size: [40, 40],
                    offset: [-20, -20]
                }],
                clusterNumbers: [1000]
                // clusterHideIconOnBalloonOpen: false,
                // geoObjectHideIconOnBalloonOpen: false
            }),
            geoObjects = []

        for (const id in workers) {
            let pm = new window.ymaps.Placemark(workers[id], {}, {
                iconImageHref: '/icons/dot.svg',
                iconLayout: 'default#image',
                // balloonPanelMaxMapArea: Infinity,
                hideIconOnBalloonOpen: false,

                balloonCloseButton: false,
                balloonOffset: [75, -10],
                balloonContentLayout: window.ymaps.templateLayoutFactory.createClass(
                    `${id}`
                )
            })

            pm.events.add('mouseenter', () => {
                if (pm.isBalloonOpen) {
                    return
                }

                pm.options.set('iconImageHref', '/icons/point.svg')
                pm.balloon.open()
            })

            pm.events.add('click', () => {
                this.chooseSalonOnMap(id)
            })

            pm.events.add('mouseleave', () => {
                pm.options.set('iconImageHref', '/icons/dot.svg')
                pm.balloon.close()
            })

            geoObjects.push(pm)
        }

        clusterer.add(geoObjects)
        map.geoObjects.add(clusterer)

        map.setBounds(clusterer.getBounds(), {
            checkZoomRange: true
        })
    }

    chooseSalonOnMap(salonId) {
        if (this.state.preloadedSalons[salonId]) {
            return this.setState({
                chosenSalonId: salonId
            })
        }

        this.state.map.panTo(this.state.workerLocations[salonId])

        APIRequests.getMapWorker(salonId).then(salon => {
            this.setState({
                preloadedSalons: {
                    ...this.state.preloadedSalons,
                    [salonId]: salon
                },
                chosenSalonId: salonId
            })
        })
    }

    handlePageChange(page) {
        if (page !== this.getPage()
            && page > 0
            && page <= this.state.pageCount) {
            this.props.router.push({
                query: Object.assign({}, this.props.router.query, {
                    page
                })
            })
        }
    }

    resetFilters() {
        const query = Object.assign({}, this.props.router.query)

        delete query["filters[leads]"]
        delete query["filters[rooms]"]
        delete query["filters[messengers]"]
        delete query["filters[services]"]
        delete query["priceFrom"]
        delete query["priceTo"]

        query.page = 1

        this.props.router.push({
            query
        })
    }

    toggleFilter(scope, name) {
        const query = Object.assign({}, this.props.router.query),
            selectedFilter = query["filters[" + scope + "]"]

        if (selectedFilter) {
            if (selectedFilter.split(',').includes(name)) {
                query["filters[" + scope + "]"] = selectedFilter.split(',').filter(filter => filter !== name).join(',')
            } else {
                query["filters[" + scope + "]"] = selectedFilter + ',' + name
            }
        } else {
            query["filters[" + scope + "]"] = name
        }

        query.page = 1

        this.props.router.push({
            query
        })
    }

    setKind(kind) {
        this.props.router.push({
            query: Object.assign({}, this.props.router.query, {
                kind
            })
        })
    }

    setPriceRange(from, to) {
        if (from && from > this.props.router.query.priceTo) {
            to = from
        } else if (to && to < this.props.router.query.priceFrom) {
            from = to
        }

        const priceRange = {}

        if (from) {
            priceRange.priceFrom = from
        }

        if (to) {
            priceRange.priceTo = to
        }

        this.props.router.push({
            query: Object.assign({}, this.props.router.query, priceRange)
        })
    }

    setRegion(region) {
        this.props.router.push({
            // pathname: '/',
            query: Object.assign({}, this.props.router.query, {
                region,
            })
        })
    }

    async searchNearMe() {
        try {
            this.state.map.panTo((await window.ymaps.geolocation.get()).geoObjects.position)
        } catch (e) {
        }
    }

    loadMore() {
        this.setState({
            preventLoading: true
        }, async () => {
            this.props.router.push({query: Object.assign({}, this.props.router.query, {page: (Number(this.props.router.query.page) || 1) + 1})}, undefined, {
                shallow: true
            })

            await this.performSearch(true)

            setTimeout(() => {
                this.setState({
                    preventLoading: false
                })
            }, 1000)
        })
    }

    getAppliedFilterCnt() {
        const query = this.props.router.query
        let cnt = 0

        if (query.priceFrom?.length || query.priceTo?.length) {
            cnt++
        }

        cnt += Object.keys(query).filter(filterName => filterName.startsWith('filters[') && query[filterName].length).length

        return cnt
    }

    render() {
        const {t, theme, isMobile} = this.context
        const inputId = 'search-input-' + Numbers.random(0, 99999),
            selectId = 'select-' + Numbers.random(0, 99999)

        return (
            <div className={css['theme--' + theme]}>
                <Head>
                    <title>{t('mainPage')}{TITLE_POSTFIX}</title>
                </Head>

                {!((this.props.router.query.map && 'true' === this.props.router.query.map) && isMobile) &&
                    <div className="responsive-content">
                        <p className="subtitle additional-text non-selectable">{t('greet')}</p>
                        <h1 className={'text-xl'}>{t('qWhatToFindForYou')}</h1>

                        <br className={'non-selectable'}/>
                    </div>}

                <div bp={'grid'} style={{gridGap: 8, marginBottom: 16}}>
                    <div bp={'12 4@md'} className={'responsive-content'}>
                        <RadioGroup containerClass={css.kindContainer} className={css.kindSelector} name={''}
                                    value={this.props.router.query.kind || 'all'}
                                    checkedClassName={css.radioChecked}
                                    onUpdate={this.setKind} options={[
                            {
                                label: t('all'),
                                value: 'all'
                            },
                            {
                                label: t('salons'),
                                value: 'salon'
                            },
                            {
                                label: isMobile ? t('masters') : t('privateMasters'),
                                value: 'master'
                            }
                        ]}/>
                    </div>
                    <div bp={'12 8@md'} className={'responsive-content'}>
                        <div className="flex fit justify-end">
                            <div
                                bp={'hide ' + ((this.props.router.query.map && 'true' === this.props.router.query.map) ? 'show' : 'hide') + '@md'}>
                                <Button className={css.searchNearMeBtn}
                                        onClick={this.searchNearMe}>{t('searchNearMe')}</Button>
                            </div>

                            <div className={css.switchRoot}>
                                <div
                                    className={(!this.props.router.query.map || 'false' === this.props.router.query.map) ? css.active : ''}
                                    onClick={() => this.props.router.push({query: Object.assign({}, this.props.router.query, {map: false})})}>{isMobile ? t('listMobile') : t('list')}</div>
                                <div
                                    className={(this.props.router.query.map && 'true' === this.props.router.query.map) ? css.active : ''}
                                    onClick={() => this.props.router.push({query: Object.assign({}, this.props.router.query, {map: true})})}>{isMobile ? t('map') : t('mapPC')}</div>
                            </div>

                            <div ref={this.state.handleRef}>
                                <Button className={css.filterButton} color={'secondary'}
                                        onClick={this.toggleFilterPopup}>
                                    <span
                                        className={css.cnt}>{Number(Boolean(this.props.router.query.priceFrom?.length || this.props.router.query.priceTo?.length)) + Object.keys(this.props.router.query).filter(filterName => filterName.startsWith('filters[') && this.props.router.query[filterName].length).length}</span>
                                    {!isMobile &&
                                        <span style={{margin: '0 4px', verticalAlign: 'inherit'}}>{t('filter')}</span>}
                                    <Icon name={'filter'}/>
                                </Button>
                                <Popup handleRef={this.state.handleRef}
                                       style={isMobile ? {
                                           top: 0,
                                           height: '100%',
                                           padding: 0,
                                           overflowX: 'hidden'
                                       } : {
                                           right: 0,
                                           top: 4,
                                           padding: '24px 32px 32px 32px'
                                       }}
                                       onClose={() => this.setState({filterPopupOpen: false})}
                                       isOpen={this.state.filterPopupOpen} fullSize={isMobile}>
                                    <div className="fit">
                                        <div bp={'grid 12 4@md'} className={css.filterContainer}>
                                            <div bp={'hide@md'} className={cnb(css.modalHead, css.mobile)}>
                                                <div className={css.resetBtn} style={{marginRight: -24}}
                                                     onClick={this.resetFilters}>{t('discard')}</div>

                                                <h2>{t('filter')}</h2>

                                                <Icon name={'close'} onClick={this.toggleFilterPopup}/>
                                            </div>

                                            <div>
                                                {isMobile && <div className={css.padded}>
                                                    <div className={cnb(css.inputGroup, 'flex')} style={{width: '100%'}}
                                                         onClick={() => window.document.getElementById(selectId).click()}>
                                                        <Icon name={'geo'}/>
                                                        {(this.state.regions.length && this.state.filterPopupOpen) &&
                                                            <Select className={css.customSelect} style={{width: '100%'}}
                                                                    label={''} fill
                                                                    options={this.state.regions} id={selectId}
                                                                    placeholder={t('selectRegion')}
                                                                    value={this.props.router.query.region}
                                                                    onUpdate={val => this.setRegion(val)}/>}
                                                        <div onClick={() => this.setRegion(t('entireKZ'))}><Icon
                                                            name={'close'}/></div>
                                                    </div>
                                                </div>}

                                                <div bp={'hide@md'}>
                                                    <TransparentCollapsible title={t('hourPrice')}
                                                                            defaultOpen={!isMobile}
                                                                            lock={!isMobile}>
                                                        <div className={css.collapseBody}>
                                                            <MultipleRangeInput step={50} accent={true}
                                                                                from={this.props.router.query.priceFrom || this.state.priceRange.from}
                                                                                to={this.props.router.query.priceTo || this.state.priceRange.to}
                                                                                min={this.state.priceRange.from}
                                                                                max={this.state.priceRange.to}
                                                                                onUpdate={this.setPriceRange}/>
                                                        </div>
                                                    </TransparentCollapsible>
                                                </div>

                                                <TransparentCollapsible title={t('services')} defaultOpen={true}
                                                                        lock={!isMobile}>
                                                    <div className={css.collapseBody}>
                                                        {this.state.filters.leads?.map(lead =>
                                                            <Checkbox style={{marginBottom: 8}} key={lead._id}
                                                                      name={lead.name}
                                                                      icon={lead.icon}
                                                                      value={this.props.router.query['filters[leads]']?.includes(lead._id) || false}
                                                                      onUpdate={() => this.toggleFilter('leads', lead._id)}/>
                                                        )}
                                                        {this.state.filters.services?.map(service =>
                                                            <Checkbox style={{marginBottom: 8}} key={service._id}
                                                                      name={service.name} icon={service.icon}
                                                                      value={this.props.router.query['filters[services]']?.includes(service._id) || false}
                                                                      onUpdate={() => this.toggleFilter('services', service._id)}/>
                                                        )}
                                                    </div>
                                                </TransparentCollapsible>
                                            </div>
                                            <div>
                                                <TransparentCollapsible title={t('messengers')} defaultOpen={!isMobile}
                                                                        lock={!isMobile}>
                                                    <div className={css.collapseBody}>
                                                        {this.state.filters.messengers?.map(messenger =>
                                                            <Checkbox style={{marginBottom: 8}} key={messenger._id}
                                                                      name={messenger.name} icon={messenger.icon}
                                                                      value={this.props.router.query['filters[messengers]']?.includes(messenger._id) || false}
                                                                      onUpdate={() => this.toggleFilter('messengers', messenger._id)}/>
                                                        )}
                                                    </div>
                                                </TransparentCollapsible>

                                                <TransparentCollapsible title={t('roomCnt')} defaultOpen={!isMobile}
                                                                        lock={!isMobile}>
                                                    <div className={css.collapseBody}>
                                                        {this.state.filters.rooms?.map(room =>
                                                            <Checkbox style={{marginBottom: 8}} key={room._id}
                                                                      name={room.name}
                                                                      value={this.props.router.query['filters[rooms]']?.includes(room._id) || false}
                                                                      onUpdate={() => this.toggleFilter('rooms', room._id)}/>
                                                        )}
                                                    </div>
                                                </TransparentCollapsible>
                                            </div>
                                            <div bp={'hide show@md'} className={css.verticalBetween}>
                                                <TransparentCollapsible title={t('hourPrice')} defaultOpen={!isMobile}
                                                                        lock={!isMobile}>
                                                    <MultipleRangeInput step={50} accent={true}
                                                                        from={this.props.router.query.priceFrom || this.state.priceRange.from}
                                                                        to={this.props.router.query.priceTo || this.state.priceRange.to}
                                                                        min={this.state.priceRange.from}
                                                                        max={this.state.priceRange.to}
                                                                        onUpdate={this.setPriceRange}/>
                                                </TransparentCollapsible>

                                                <div className={css.fullSizeBtn}>
                                                    <Button style={{marginBottom: 8}}
                                                            onClick={this.toggleFilterPopup}>{t('seeNVariants', this.state.foundCnt)}</Button>

                                                    <span className={css.resetBtn}
                                                          onClick={this.resetFilters}>{t('discard')}</span>
                                                </div>
                                            </div>

                                            {isMobile && <div className={cnb(css.bottomSection, css.stickToBottom)}>
                                                <div className={css.fullSizeBtn}>
                                                    <Button style={{marginBottom: 8}}
                                                            onClick={this.toggleFilterPopup}>{t('seeNVariants', this.state.foundCnt)}</Button>
                                                </div>
                                            </div>}
                                        </div>
                                    </div>
                                </Popup>
                            </div>
                        </div>
                    </div>

                    <div bp={'12 hide@md'} className={'responsive-content'}>
                        <label htmlFor={inputId} bp={'fill flex'} className={css.inputGroup}>
                            <Icon name={'search'}/>
                            <ControlledInput id={inputId} bp={'fill'} type="text"
                                             value={this.props.router.query.search}
                                             onKeyUp={this.handleKeyUp}
                                             onChange={e => this.props.router.push({
                                                 query: Object.assign({}, this.props.router.query, {
                                                     search: e.target.value,
                                                     page: 1
                                                 })
                                             })}
                                             placeholder={t('ssm')}/>
                            <div onClick={this.clearQuery}><Icon name={'close'}/></div>
                        </label>
                    </div>
                </div>

                <div bp={'grid'} style={{marginBottom: 24}}>
                    <div
                        bp={cnb('12', (this.props.router.query.map && 'true' === this.props.router.query.map) ? '' : 'hide')}
                        className={css.mapContainer}>

                        {(() => {
                            const chosenSalon = this.state.preloadedSalons[this.state.chosenSalonId]

                            return chosenSalon && <section className={css.chosenSalon}>
                                <div bp={'hide show@md'}>
                                    <ImageCarousel link={{
                                        query: Object.assign({}, this.props.router.query, {
                                            salonTab: 'photos'
                                        }),
                                        pathname: '/salon/' + chosenSalon.worker.slug
                                    }} pics={chosenSalon.worker.photos} height={240}/>
                                </div>
                                <div className={css.content}>
                                    <div className="flex justify-between">
                                        <div>
                                            {chosenSalon.worker.isVerified &&
                                                <div className={cnb(css.caption, 'non-selectable')}>
                                                    <Icon name={'round_check'} className={css.verifiedIcon}/>

                                                    <span>{t('verified')}</span>
                                                </div>}

                                            <p className="subtitle2">{chosenSalon.worker.name}</p>

                                            <p style={{marginTop: 16}}>{chosenSalon.worker.address}</p>

                                            {chosenSalon.review[0] && <div className={css.reviewSection}>
                                                <div>
                                                    <Icon name={'star'}/>
                                                    <span>{chosenSalon.review[0].avg.toFixed(1)}</span>
                                                </div>

                                                <div>
                                                    {chosenSalon.review[0].count} {declination(chosenSalon.review[0].count, t('reviewDeclination'))}
                                                </div>
                                            </div>}
                                        </div>
                                        <div>
                                            <Icon name={'close'} className={css.closeIcon}
                                                  onClick={() => this.setState({
                                                      chosenSalonId: ''
                                                  })}/>
                                        </div>
                                    </div>

                                    <div className={css.buttonLayout}>
                                        <div><a href={'tel:' + parsePhoneNumber(chosenSalon.worker.phone).number}>
                                            <Button><Icon name={'call'}/></Button>
                                        </a></div>
                                        <div><a target="_blank"
                                                href={'https://wa.me/' + parsePhoneNumber(chosenSalon.worker.messengers.wa).number.replace('+', '') + '?text=' + encodeURIComponent(t('salonAnswerPrefill') + ' "' + chosenSalon.worker.name + '"')}>
                                            <Button color={'tertiary'}>
                                                <Icon name={'wa_light'}/>
                                            </Button>
                                        </a></div>
                                        {chosenSalon.worker.messengers.tg && <div><a target="_blank"
                                                                         href={'https://t.me/' + chosenSalon.worker.messengers.tg.replace('@', '')}>
                                            <Button color={'tertiary'}>
                                                <Icon name={'tg_light'}/>
                                            </Button>
                                        </a></div>}
                                        <Link href={'/salon/' + chosenSalon.worker.slug}>
                                            <Button color={'tertiary'}>{t('open')}</Button>
                                        </Link>
                                    </div>
                                </div>
                            </section>
                        })()}

                        <div id={'mapView'} className={css.mapView}></div>
                    </div>
                    {(!this.props.router.query.map || 'false' === this.props.router.query.map) && this.state.workers.map((worker, index) => {
                        worker.url = '/salon/' + worker.slug

                        return <div bp={'12'} key={index}>
                            <div bp={'grid'} className={css.workerBlock}>
                                <div bp={'12 5@md'}>
                                    <div className={css.cardRoot}>
                                        <ImageCarousel link={{
                                            query: Object.assign({}, this.props.router.query, {
                                                salonTab: 'photos'
                                            }),
                                            pathname: worker.url
                                        }} pics={worker.photos}/>

                                        {isMobile ? <div className={css.padded}>
                                            {worker.isVerified && <div className={cnb(css.caption, 'non-selectable')}>
                                                <Icon name={'round_check'} className={css.verifiedIcon}/>

                                                <span>{t('verified')}</span>
                                            </div>}

                                            <Link href={worker.url}><h1 className={'cursor-pointer'}>{worker.name}</h1>
                                            </Link>
                                        </div> : <div className={css.padded}>
                                            <p className="subtitle2" style={{marginBottom: 12}}>
                                                {t('description')}
                                            </p>
                                            <p className={cnb(css.ellipsis, css.helperText)}>{worker.description}</p>

                                            <div className={css.stretchContainer}>
                                                <Link href={worker.url}>
                                                    <Button>{t('detail')}</Button>
                                                </Link>
                                                <div><a href={'tel:' + parsePhoneNumber(worker.phone).number}>
                                                    <Button><Icon name={'call'}/></Button>
                                                </a></div>
                                                <div><a target="_blank"
                                                        href={'https://wa.me/' + parsePhoneNumber(worker.messengers.wa).number.replace('+', '') + '?text=' + encodeURIComponent(t('salonAnswerPrefill') + ' "' + worker.name + '"')}>
                                                    <Button color={'tertiary'}>
                                                        <Icon style={{marginRight: worker.messengers.tg ? 0 : 10}}
                                                              name={'wa_light'}/>
                                                        <span
                                                            className={'va-middle'}>{worker.messengers.tg ? '' : t('sendMessage')}</span>
                                                    </Button>
                                                </a></div>
                                                {worker.messengers.tg && <div><a target="_blank"
                                                                                 href={'https://t.me/' + worker.messengers.tg.replace('@', '')}>
                                                    <Button color={'tertiary'}>
                                                        <Icon name={'tg_light'}/>
                                                    </Button>
                                                </a></div>}
                                            </div>
                                        </div>}
                                    </div>
                                </div>
                                <div bp={'12 7@md'}>
                                    <div className={css.cardRoot}>
                                        {!isMobile && <div className={css.padded}>
                                            {worker.isVerified && <div className={cnb(css.caption, 'non-selectable')}>
                                                <Icon name={'round_check'} className={css.verifiedIcon}/>

                                                <span>{t('verified')}</span>
                                            </div>}

                                            <div bp={'grid'}>
                                                <Link href={worker.url}><h1 bp={'7'}
                                                                            className={'cursor-pointer'}>{worker.name}</h1>
                                                </Link>

                                                <div bp={'5'} style={{paddingTop: 8}}
                                                     className="flex justify-end gap-12">
                                                    {worker.reviews ? <div className={css.avgRating}>
                                                        <Icon name={'star'}/>
                                                        <span>{worker.reviews?.avg ? worker.reviews.avg.toFixed(1) : '–'}</span>
                                                    </div> : <div>&nbsp;</div>}

                                                    <Button size={'small'}>{t('onTheMap').toLowerCase()}</Button>
                                                </div>
                                            </div>
                                        </div>}

                                        <div bp={'grid'}>
                                            <div bp={'12 7@md'} className={cnb(css.padded, css.shortInfoBlock)}>
                                                <div>
                                                    <div>{t('address').toLowerCase()}</div>
                                                    <div>{worker.address}</div>
                                                </div>

                                                <div>
                                                    <div>{t('city').toLowerCase()}</div>
                                                    <div>{worker.region[0].name}</div>
                                                </div>

                                                {worker.reviews && <div>
                                                    <div>{t('reviews').toLowerCase()}</div>
                                                    <Link href={{
                                                        query: Object.assign({}, this.props.router.query, {
                                                            salonTab: 'reviews'
                                                        }),
                                                        hash: '#salonTab',
                                                        pathname: worker.url
                                                    }}>
                                                        <div
                                                            className={css.linkUnderline}>{worker.reviews.count || 0} {declination(worker.reviews.count || 0, t('reviewDeclination'))}
                                                        </div>
                                                    </Link>
                                                </div>}

                                                {worker.reviews && <div bp={'hide@md'}>
                                                    {worker.reviews ? <div className={css.avgRating}>
                                                        <Icon name={'star'}/>
                                                        <span>{worker.reviews?.avg ? worker.reviews.avg.toFixed(1) : '–'}</span>
                                                    </div> : <div>&nbsp;</div>}

                                                    <div><Button size={'small'}>{t('onTheMap').toLowerCase()}</Button>
                                                    </div>
                                                </div>}
                                            </div>

                                            <div bp={'5 show@md hide'}>
                                                <div className={'flex align-end justify-end fit'}
                                                     style={{paddingBottom: 16, paddingRight: 16}}>
                                                    <div style={{marginTop: 16}} className={css.socialBlock}>
                                                        {Object.keys(worker.social).filter(i => worker.social[i].length).map(name =>
                                                            <div key={name}>
                                                                <a target="_blank" href={worker.social[name]}
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

                                    {worker.kind === 'salon' ?
                                        <div bp={'12 7@md'} className={css.padded}
                                             style={{paddingRight: 0, paddingLeft: isMobile ? 0 : 16}}>
                                            <h2 style={{
                                                marginBottom: 12,
                                                paddingLeft: isMobile ? 16 : 0
                                            }}>{t('masseuses')}</h2>

                                            <div className={css.invisibleScroll}
                                                 style={{paddingLeft: isMobile ? 16 : 0}}>
                                                {worker.masters.slice(0, 4).map((master, i) => <ShortMasterCard
                                                    name={master.name}
                                                    link={{
                                                        query: Object.assign({}, this.props.router.query, {
                                                            salonTab: 'masters'
                                                        }),
                                                        hash: '#salonTab',
                                                        pathname: worker.url
                                                    }}
                                                    pic={master.photos[0]}
                                                    photoCnt={master.photos.length}
                                                    key={i}
                                                />)}
                                                {worker.masters.length > 4 &&
                                                    <MockShortMasterCard link={{
                                                        query: Object.assign({}, this.props.router.query, {
                                                            salonTab: 'masters'
                                                        }),
                                                        hash: '#salonTab',
                                                        pathname: worker.url
                                                    }}
                                                                         cnt={worker.masters.length - 4}/>}
                                            </div>
                                        </div> : <div bp={'12 7@md'} style={{marginTop: 8}}>
                                            <ParameterView {...worker.characteristics} />
                                        </div>}

                                    <div bp={'12 7@md'} className={css.padded}
                                         style={{paddingRight: 0, paddingLeft: isMobile ? 0 : 16}}>
                                        <h2 style={{
                                            marginBottom: 12,
                                            paddingLeft: isMobile ? 16 : 0
                                        }}>{t('programs')}</h2>

                                        <div className={css.invisibleScroll} style={{paddingLeft: isMobile ? 16 : 0}}>
                                            {worker.programs.slice(0, 3).map((program, i) => <ProgramCard
                                                link={{
                                                    query: Object.assign({}, this.props.router.query, {
                                                        salonTab: 'cost'
                                                    }),
                                                    hash: '#salonTab',
                                                    pathname: worker.url
                                                }}
                                                key={i}
                                                title={program.name}
                                                duration={program.duration}
                                                price={program.cost}/>)}
                                            {worker.programs.length > 3 &&
                                                <MockProgramCard link={{
                                                    query: Object.assign({}, this.props.router.query, {
                                                        salonTab: 'cost'
                                                    }),
                                                    hash: '#salonTab',
                                                    pathname: worker.url
                                                }} cnt={worker.programs.length - 3}/>}
                                        </div>
                                    </div>

                                    {Objects.isFilled(worker.social) && <div style={{marginTop: 8}} bp={'hide@md'}
                                                                             className={cnb(css.cardRoot, css.padded)}>
                                        <p className={'subtitle2'}>{t('socialMedia')}</p>

                                        <div style={{marginTop: 16}} className={css.socialBlock}>
                                            {Object.keys(worker.social).filter(i => worker.social[i].length).map(name =>
                                                <div key={name}>
                                                    <a target="_blank" href={worker.social[name]} className={css.img}>
                                                        <Icon name={name + '_' + theme}/>
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                    </div>}
                                </div>

                                <div bp={'12 hide@md'}>
                                    <div className={cnb(css.cardRoot, css.padded)}>
                                        <p className={cnb(css.ellipsis, css.helperText)}
                                           style={{marginBottom: 12}}>{worker.description}</p>

                                        <div className={css.stretchContainer}>
                                            <Link href={worker.url}>
                                                <Button>{t('detail')}</Button>
                                            </Link>
                                            <div><a href={'tel:' + parsePhoneNumber(worker.phone).number}>
                                                <Button><Icon name={'call'}/></Button>
                                            </a></div>
                                            <div><a target="_blank"
                                                    href={'https://wa.me/' + parsePhoneNumber(worker.messengers.wa).number.replace('+', '') + '?text=' + encodeURIComponent(t('salonAnswerPrefill') + ' "' + worker.name + '"')}>
                                                <Button color={'tertiary'}>
                                                    <Icon style={{marginRight: worker.messengers.tg ? 0 : 6}}
                                                          name={'wa_light'}/>
                                                    <span
                                                        className={'va-middle'}>{worker.messengers.tg ? '' : t('sendMessage')}</span>
                                                </Button>
                                            </a></div>
                                            {worker.messengers.tg && <div><a target="_blank"
                                                                             href={'https://t.me/' + worker.messengers.tg.replace('@', '')}>
                                                <Button color={'tertiary'}>
                                                    <Icon name={'tg_light'}/>
                                                </Button>
                                            </a></div>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    })}
                </div>

                <div className="flex justify-center">
                    {((Number(this.props.router.query.page) !== this.state.pageCount) && !this.state.preventLoading && this.state.workers.length > 0 && (!this.props.router.query.map || 'false' === this.props.router.query.map)) &&
                        <Button className={css.showMoreBtn} size={'large'} onClick={this.loadMore}>
                            <span className={'va-middle'}>{t('showNSalonsMore', 5)}</span>
                            <Icon name={'refresh'}/>
                        </Button>}
                </div>

                {(this.state.pageCount > 1 && (!this.props.router.query.map || 'false' === this.props.router.query.map)) &&
                    <Paginator style={{marginBottom: 24}} page={this.getPage()}
                               onChange={this.handlePageChange}
                               pageCnt={this.state.pageCount}/>}

                <AboutUsSection/>
            </div>
        );
    }
}

Home.contextType = GlobalContext

export default withRouter(Home);
