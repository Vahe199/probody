import React from "react"
import {withRouter} from "next/router.js"
import {GlobalContext} from "../contexts/Global.js"
import AboutUsSection from "../components/AboutUsSection.jsx";
import {TITLE_POSTFIX} from "../helpers/constants.js";
import Head from "next/head.js";
import css from '../styles/mainpage.module.scss'
import APIRequests from "../helpers/APIRequests.js";
import RadioGroup from "../components/kit/Form/RadioGroup";
import ImageCarousel from "../components/kit/ImageCarousel";
import {cnb} from "cnbuilder";
import Icon from "../components/kit/Icon.jsx";
import Link from "next/link.js";
import Paginator from "../components/kit/Paginator.jsx";
import Button from "../components/kit/Button.jsx";
import Objects from "../helpers/Objects.js";
import Popup from "../components/kit/Popup";
import Numbers from "../helpers/Numbers.js";
import ControlledInput from "../components/kit/Form/ControlledInput.jsx";

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            workers: [],
            filters: {},
            isMapView: false,
            kind: 'all',
            handleRef: React.createRef(),
            filterPopupOpen: false,
            pageCount: 1
        }

        this.initPageLoad = this.initPageLoad.bind(this)
        this.handlePageChange = this.handlePageChange.bind(this)
        this.setKind = this.setKind.bind(this)
        this.performSearch = this.performSearch.bind(this)
        this.toggleFilterPopup = this.toggleFilterPopup.bind(this)
        this.getPage = this.getPage.bind(this)
    }

    async initPageLoad() {
        if (Objects.isEmpty(this.state.filters)) {
            APIRequests.getFilters().then(filters => {
                this.setState({
                    filters
                })
            })
        }

        this.performSearch()
    }

    componentDidMount() {
        this.initPageLoad()
    }

    toggleFilterPopup() {
        this.setState({
            filterPopupOpen: !this.state.filterPopupOpen
        })
    }

    componentDidUpdate(prevProps) {
        if (!Objects.shallowEqual(prevProps.router.query, this.props.router.query)) {
            window.document.body.scrollTo(0, 0)

            this.initPageLoad()
        }
    }

    getPage() {
        return parseInt(this.props.router.query.page) || 1
    }

    performSearch() {
        APIRequests.searchWorkers(this.getPage(), this.props.router.query.search ? this.props.router.query.search.trim() : '', {
            kind: this.state.kind,
            region: this.props.router.query['region']
        }).then(workers => {
            this.setState({
                pageCount: workers.pageCount,
                workers: workers.results
            });
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

    async setKind(kind) {
        await this.setState({
            kind
        })

        this.performSearch()
    }

    render() {
        const {t, theme, isMobile} = this.context
        const inputId = 'search-input-' + Numbers.random(0, 99999)

        return (
            <div className={css['theme--' + theme]}>
                <Head>
                    <title>{t('mainPage')}{TITLE_POSTFIX}</title>
                </Head>

                <p className="subtitle additional-text non-selectable">{t('greet')}</p>
                <h1>{t('qWhatToFindForYou')}</h1>
                <br className={'non-selectable'}/>

                <div bp={'grid'} style={{marginBottom: 24}}>
                    <div bp={'12 6@md'} className={'responsive-content'}>
                        <RadioGroup containerClass={css.kindContainer} className={css.kindSelector} name={''}
                                    value={this.state.kind}
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
                    <div bp={'12 6@md'} className={'responsive-content'}>
                        <div className="flex fit justify-end">
                            <div className={css.switchRoot}>
                                <div className={!this.state.isMapView ? css.active : ''} onClick={() => this.setState({isMapView: false})}>{t('list')}</div>
                                <div className={this.state.isMapView ? css.active : ''} onClick={() => this.setState({isMapView: true})}>{t('map')}</div>
                            </div>

                            <div ref={this.state.handleRef}>
                                <Button className={css.filterButton} color={'secondary'}
                                        onClick={this.toggleFilterPopup}>
                                    <span className={css.cnt}>0</span>
                                    <Icon name={'filter'}/>
                                </Button>
                            </div>

                            <Popup handleRef={this.state.handleRef}
                                   onClose={() => this.setState({filterPopupOpen: false})}
                                   isOpen={this.state.filterPopupOpen} fullSize={isMobile}>
                                filters
                            </Popup>
                        </div>
                    </div>

                    <div bp={'12 hide@md'} className={'responsive-content'}>
                        <label htmlFor={inputId} bp={'fill flex'} className={css.inputGroup}>
                            <Icon name={'search'}/>
                            <ControlledInput id={inputId} bp={'fill'} type="text" value={this.props.router.query.search}
                                             onKeyUp={this.handleKeyUp}
                                             onChange={e => this.props.router.push({query: Object.assign({}, this.props.router.query, {search: e.target.value})})}
                                             placeholder={t('ssm')}/>
                            <div onClick={this.clearQuery}><Icon name={'close'}/></div>
                        </label>
                    </div>

                    {this.state.isMapView ? <div>
                        отображение результатов на карте
                        </div> : this.state.workers.map((worker, index) => {
                        worker.url = '/salon/' + worker.slug

                        return <div bp={'12'} key={index}>
                            <div bp={'grid'} className={css.workerBlock}>
                                <div bp={'12 5@md'}>
                                    <div className={css.cardRoot}>
                                        <ImageCarousel link={worker.url} pics={worker.photos}/>

                                        {isMobile && <div className={css.padded}>
                                            {worker.isVerified && <div className={cnb(css.caption, 'non-selectable')}>
                                                <Icon name={'round_check'} className={css.verifiedIcon}/>

                                                <span>{t('verified')}</span>
                                            </div>}

                                            <Link href={worker.url}><h1 className={'cursor-pointer'}>{worker.name}</h1>
                                            </Link>
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

                                                <div bp={'5'} className="flex justify-between gap-12">
                                                    <div className={'flex'}>
                                                        <Icon name={'star'}/>
                                                        <span>{worker.rating}ср.оценка</span>
                                                    </div>

                                                    <Button size={'small'}>{t('onTheMap')}</Button>
                                                </div>
                                            </div>
                                        </div>}

                                        инфо
                                    </div>
                                </div>
                            </div>
                        </div>
                    })}
                </div>

                {this.state.pageCount > 1 &&
                    <Paginator style={{marginBottom: 24}} page={this.getPage()} onChange={this.handlePageChange}
                               pageCnt={this.state.pageCount}/>}

                <AboutUsSection/>
            </div>
        );
    }
}

Home.contextType = GlobalContext

export default withRouter(Home);
