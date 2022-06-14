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

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            workers: [],
            filters: {},
            isMapView: false,
            kind: 'all',
            query: '',
            page: 1,
            pageCount: 1
        }

        this.initPageLoad = this.initPageLoad.bind(this)
        this.handlePageChange = this.handlePageChange.bind(this)
        this.setKind = this.setKind.bind(this)
        this.performSearch = this.performSearch.bind(this)
    }

    initPageLoad() {
        APIRequests.getFilters().then(filters => {
            this.setState({
                filters
            })
        })

        this.performSearch()
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

    performSearch() {
        APIRequests.searchWorkers(this.state.page, this.state.query, {
            kind: this.state.kind
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
                query: {
                    page
                }
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
        const {t, theme} = this.context

        return (
            <div className={css['theme--' + theme]}>
                <Head>
                    <title>{t('mainPage')}{TITLE_POSTFIX}</title>
                </Head>

                <p className="subtitle additional-text">{t('greet')}</p>
                <h1>{t('qWhatToFindForYou')}</h1>
                <br/>

                <div bp={'grid'}>
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
                                label: t('privateMasters'),
                                value: 'master'
                            }
                        ]}/>
                    </div>
                    <div bp={'12 6@md'}>
                        <div className="flex fit justify-end">
                            <span>frefefe</span>
                        </div>
                    </div>

                    {this.state.workers.map((worker, index) =>
                        <div bp={'12'} key={index}>
                            <div bp={'grid'}>
                                <div bp={'12 5@md'}>
                                    <ImageCarousel pics={worker.photos} />
                                </div>
                                <div bp={'12 7@md'}>
                                    info
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <AboutUsSection/>
            </div>
        );
    }
}

Home.contextType = GlobalContext

export default withRouter(Home);
