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
import {parsePhoneNumber} from "libphonenumber-js";
import ProgramCard from "../components/kit/ProgramCard";
import MockProgramCard from "../components/kit/MockProgramCard.jsx";
import ParameterView from "../components/kit/ParameterView.jsx";
import ShortMasterCard from "../components/kit/ShortMasterCard";
import MockShortMasterCard from "../components/kit/MockShortMasterCard";

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            workers: [],
            filters: {},
            isMapView: false,
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
            kind: this.props.router.query.kind || 'all',
            region: this.props.router.query.region
        }).then(workers => {
            if (!workers.results) {
                return
            }
            console.log(workers)

            workers.reviews.map(review => {
                workers.results[workers.results.findIndex(worker => worker._id === review._id)].reviews = review
            })

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

    setKind(kind) {
        this.props.router.push({
            query: Object.assign({}, this.props.router.query, {
                kind
            })
        })
    }

    render() {
        const {t, theme, isMobile} = this.context
        const inputId = 'search-input-' + Numbers.random(0, 99999)

        return (
            <div className={css['theme--' + theme]}>
                <Head>
                    <title>{t('mainPage')}{TITLE_POSTFIX}</title>
                </Head>

                <div className="responsive-content">
                    <p className="subtitle additional-text non-selectable">{t('greet')}</p>
                    <h1>{t('qWhatToFindForYou')}</h1>
                </div>

                <br className={'non-selectable'}/>

                <div bp={'grid'} style={{marginBottom: 24}}>
                    <div bp={'12 6@md'} className={'responsive-content'}>
                        <RadioGroup containerClass={css.kindContainer} className={css.kindSelector} name={''}
                                    value={this.props.router.query.kind || 'all'}
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
                                <div className={!this.state.isMapView ? css.active : ''}
                                     onClick={() => this.setState({isMapView: false})}>{t('list')}</div>
                                <div className={this.state.isMapView ? css.active : ''}
                                     onClick={() => this.setState({isMapView: true})}>{t('map')}</div>
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

                    {this.state.isMapView ? <div>
                        отображение результатов на карте
                    </div> : this.state.workers.map((worker, index) => {
                        worker.url = '/salon/' + worker.slug

                        return <div bp={'12'} key={index}>
                            <div bp={'grid'} className={css.workerBlock}>
                                <div bp={'12 5@md'}>
                                    <div className={css.cardRoot}>
                                        <ImageCarousel link={worker.url} pics={worker.photos}/>

                                        {isMobile ? <div className={css.padded}>
                                            {worker.isVerified && <div className={cnb(css.caption, 'non-selectable')}>
                                                <Icon name={'round_check'} className={css.verifiedIcon}/>

                                                <span>{t('verified')}</span>
                                            </div>}

                                            <Link href={worker.url}><h1 className={'cursor-pointer'}>{worker.name}</h1>
                                            </Link>
                                        </div> : <div className={css.padded}>
                                            <p style={{marginBottom: 12}} className={css.ellipsis}>{worker.description}</p>

                                            <div className={css.stretchContainer}>
                                                <Link href={worker.url}>
                                                    <Button>{t('detail')}</Button>
                                                </Link>
                                                <Link href={'tel:' + parsePhoneNumber(worker.phone).number}>
                                                    <Button><Icon name={'call'}/></Button>
                                                </Link>
                                                <Link
                                                    href={'https://wa.me/' + parsePhoneNumber(worker.messengers.wa).number.replace('+', '') + '?text=' + encodeURIComponent(t('salonAnswerPrefill') + ' "' + worker.name + '"')}>
                                                    <Button color={'tertiary'}>
                                                        <Icon name={'wa_light'}/>
                                                        {t('sendMessage')}
                                                    </Button>
                                                </Link>
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
                                                        <span>{worker.reviews?.avg || '–'}</span>
                                                    </div> : <div>&nbsp;</div>}

                                                    <Button size={'small'}>{t('onTheMap')}</Button>
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
                                                    <div>{worker.region.name}</div>
                                                </div>

                                                {worker.reviews && <div>
                                                    <div>{t('reviews').toLowerCase()}</div>
                                                    <Link href={worker.url}>
                                                        <div
                                                            className={css.linkUnderline}>{worker.reviews.count || 0} отзывов
                                                        </div>
                                                    </Link>
                                                </div>}

                                                {worker.reviews && <div bp={'hide@md'}>
                                                    {worker.reviews ? <div className={css.avgRating}>
                                                        <Icon name={'star'}/>
                                                        <span>{worker.reviews.avg}</span>
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
                                                                <Link href={worker.social[name]}>
                                                                    <img src={'/icons/' + name + '.svg'} alt={t(name)}/>
                                                                </Link>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {worker.kind === 'salon' ? <div bp={'12 7@md'} className={css.padded}>
                                        <h2 style={{marginBottom: 12}}>{t('masseuses')}</h2>

                                        <div className={css.invisibleScroll}>
                                            {worker.masters.slice(0, 3).map((master, i) => <ShortMasterCard
                                                name={master.name}
                                                link={worker.url}
                                                pic={master.photos[0]}
                                                photoCnt={master.photos.length}
                                                key={i}
                                            />)}
                                            {worker.masters.length > 3 &&
                                                <MockShortMasterCard link={worker.url} cnt={worker.masters.length - 3}/>}
                                        </div>
                                    </div> : <div bp={'12 7@md'} style={{marginTop: 8}}>
                                        <ParameterView {...worker.characteristics} />
                                    </div>}

                                    <div bp={'12 7@md'} className={css.padded}>
                                        <h2 style={{marginBottom: 12}}>{t('programs')}</h2>

                                        <div className={css.invisibleScroll}>
                                            {worker.programs.slice(0, 3).map((program, i) => <ProgramCard
                                                link={worker.url}
                                                key={i}
                                                title={program.name}
                                                duration={program.duration}
                                                price={program.cost}/>)}
                                            {worker.programs.length > 3 &&
                                                <MockProgramCard link={worker.url} cnt={worker.programs.length - 3}/>}
                                        </div>
                                    </div>

                                    <div style={{marginTop: 8}} bp={'hide@md'}
                                         className={cnb(css.cardRoot, css.padded)}>
                                        <p className={'subtitle2'}>{t('socialMedia')}</p>

                                        <div style={{marginTop: 16}} className={css.socialBlock}>
                                            {Object.keys(worker.social).filter(i => worker.social[i].length).map(name =>
                                                <div key={name}>
                                                    <Link href={worker.social[name]}>
                                                        <img src={'/icons/' + name + '.svg'} alt={t(name)}/>
                                                    </Link>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div bp={'12 hide@md'}>
                                    <div className={cnb(css.cardRoot, css.padded)}>
                                        <p style={{paddingBottom: 12}}>{worker.description}</p>

                                        <div className={css.stretchContainer}>
                                            <Link href={worker.url}>
                                                <Button>{t('detail')}</Button>
                                            </Link>
                                            <Link href={'tel:' + parsePhoneNumber(worker.phone).number}>
                                                <Button><Icon name={'call'}/></Button>
                                            </Link>
                                            <Link
                                                href={'https://wa.me/' + parsePhoneNumber(worker.messengers.wa).number.replace('+', '') + '?text=' + encodeURIComponent(t('salonAnswerPrefill') + ' "' + worker.name + '"')}>
                                                <Button color={'tertiary'}>
                                                    <Icon name={'wa_light'}/>
                                                    {t('sendMessage')}
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    })}
                </div>

                {this.state.pageCount > 1 &&
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
