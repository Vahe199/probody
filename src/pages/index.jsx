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

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            workers: [],
            filters: {},
            isMapView: false,
            kind: 'all',
            region: '',
            query: '',
            page: 1,
            pageCount: 1
        }

        this.initPageLoad = this.initPageLoad.bind(this)
        this.handlePageChange = this.handlePageChange.bind(this)
        this.setKind = this.setKind.bind(this)
        this.performSearch = this.performSearch.bind(this)
        this.restoreSearchFromURL = this.restoreSearchFromURL.bind(this)
    }

    async initPageLoad() {
        await this.restoreSearchFromURL()

        if (Objects.isEmpty(this.state.filters)) {
            APIRequests.getFilters().then(filters => {
                this.setState({
                    filters
                })
            })
        }

        console.log(this.state)
        this.performSearch()
    }

    componentDidMount() {
        this.initPageLoad()
    }

    async restoreSearchFromURL() {
        if (this.props.router.query.page) {
            await this.setState({
                page: parseInt(this.props.router.query.page)
            })
        }

        if (this.props.router.query.search) {
            await this.setState({
                query: this.props.router.query.search
            })
        }

        if (this.props.router.query['filters[region]']) {
            await this.setState({
                region: this.props.router.query['filters[region]']
            })
            console.log('set region', this.state.region)
        }
    }

    componentDidUpdate(prevProps) {
        console.log(Objects.shallowEqual(prevProps.router.query, this.props.router.query))
        console.log(prevProps.router.query, this.props.router.query)
        if (!Objects.shallowEqual(prevProps.router.query, this.props.router.query)) {
            window.scrollTo(0, 0)

            this.initPageLoad()
        }
    }

    performSearch() {
        APIRequests.searchWorkers(this.state.page, this.state.query, {
            kind: this.state.kind,
            region: this.state.region
        }).then(workers => {
            this.setState({
                pageCount: workers.pageCount,
                workers: workers.results
            });
        })
    }

    handlePageChange(page) {
        if (page !== this.state.page
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

        return (
            <div className={css['theme--' + theme]}>
                <Head>
                    <title>{t('mainPage')}{TITLE_POSTFIX}</title>
                </Head>

                <p className="subtitle additional-text non-selectable">{t('greet')}</p>
                <h1>{t('qWhatToFindForYou')}</h1>
                <br className={'non-selectable'}/>

                <div bp={'grid'} style={{marginBottom: 24}}>
                    <div bp={'12 6@md'}>
                        <RadioGroup className={css.kindSelector} name={''} value={this.state.kind}
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
                    <div bp={'12 6@md'}>
                        <div className="flex fit justify-end">
                            <span>frefefe</span>
                        </div>
                    </div>

                    {this.state.workers.map((worker, index) => {
                        worker.url = '/worker/' + worker.slug

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

                                            <Link href={worker.url}><h1 className={'cursor-pointer'}>{worker.name}</h1></Link>
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
                                                <Link href={worker.url}><h1 bp={'7'} className={'cursor-pointer'}>{worker.name}</h1></Link>

                                                <div bp={'5'} className="flex justify-between gap-12">
                                                    <div className={'flex'}>
                                                        <Icon name={'star'}/>
                                                        <span>{worker.rating}ср.оценка</span>
                                                    </div>

                                                    <Button size={'small'}>{t('onTheMap')}</Button>
                                                </div>
                                            </div>
                                        </div>}

                                        ff
                                    </div>
                                </div>
                            </div>
                        </div>
                    })}
                </div>

                {this.state.pageCount > 1 && <Paginator style={{marginBottom: 24}} page={this.state.page} onChange={this.handlePageChange}
                                                        pageCnt={this.state.pageCount}/>}

                <AboutUsSection/>
            </div>
        );
    }
}

Home.contextType = GlobalContext

export default withRouter(Home);
