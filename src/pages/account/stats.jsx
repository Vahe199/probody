import React from "react"
import {withRouter} from "next/router"
import PersonalPageLayout from "../../layouts/secondary/PersonalPageLayout.jsx"
import {TITLE_POSTFIX} from "../../helpers/constants.js"
import Head from "next/head.js"
import css from '../../styles/statpage.module.scss'
import {GlobalContext} from "../../contexts/Global.js"
import {
    ArcElement,
    CategoryScale,
    Chart,
    LinearScale,
    LineController,
    LineElement,
    DoughnutController,
    PointElement, BarController, BarElement
} from 'chart.js'
import APIRequests from "../../helpers/APIRequests.js";
import {DateTime} from "luxon";

Chart.register(LineController, BarController, BarElement, DoughnutController, ArcElement, CategoryScale, LinearScale, PointElement, LineElement)

const catColors = {
        views: '#99D46B',
        actions: '#4795FF',
        phone: '#4d903d',
        map: '#4795FF',
        website: '#E976A4',
        whatsapp: '#F6BE34',
        social: '#F6783E',
        price: '#99D46B',
        photo: '#CCCCCC',
        review: '#e0565c',
        share: '#7FC5FD'
    },
    GRAPH_TENSION = 0.3

class StatsPage extends React.Component {
    static contextType = GlobalContext

    constructor(props) {
        super(props);

        this.state = {
            statistics: {
                views: 0,
                phoneViews: 0,
                mapClicks: 0,
                websiteClicks: 0,
                socialClicks: 0,
                reviewClicks: 0,
                shareClicks: 0,
                messengerClicks: 0,
                photoViews: 0,
                priceViews: 0,
                sum: 0,
                actions: 0
            },
            charts: {
                viewsAndActions: {container: React.createRef(), chart: null},
                companyActions: {container: React.createRef(), chart: null},
                sectionClicks: {container: React.createRef(), chart: null},
                lastMonthActions: {container: React.createRef(), chart: null}
            },
        }
    }

    componentDidMount() {
        APIRequests.getStatsForNearestNDays(30).then(stats => {
            stats = stats.data

            if (this.state.charts.sectionClicks.chart ||
                this.state.charts.viewsAndActions.chart ||
                this.state.charts.companyActions.chart ||
                this.state.charts.lastMonthActions.chart) {
                return
            }

            const aggregatedStatistics = {
                    views: stats.reduce((acc, item) => acc + item.counters.views, 0),
                    phoneViews: stats.reduce((acc, item) => acc + item.counters.actions.phoneClicks, 0),
                    mapClicks: stats.reduce((acc, item) => acc + item.counters.actions.mapClicks, 0),
                    websiteClicks: stats.reduce((acc, item) => acc + item.counters.actions.websiteClicks, 0),
                    socialClicks: stats.reduce((acc, item) => acc + item.counters.actions.socialClicks, 0),
                    reviewClicks: stats.reduce((acc, item) => acc + item.counters.actions.reviewClicks, 0),
                    shareClicks: stats.reduce((acc, item) => acc + item.counters.actions.shareClicks, 0),
                    messengerClicks: stats.reduce((acc, item) => acc + item.counters.actions.messengerClicks, 0),
                    photoViews: stats.reduce((acc, item) => acc + item.counters.actions.photoClicks, 0),
                    priceViews: stats.reduce((acc, item) => acc + item.counters.actions.priceClicks, 0),
                },
                sum = Object.values(aggregatedStatistics).reduce((acc, item) => acc + item, 0)

            aggregatedStatistics.sum = sum
            aggregatedStatistics.actions = sum - aggregatedStatistics.views

            const labels = stats.map(i => DateTime.fromISO(i.date).toFormat('d.MM'))

            this.setState({
                statistics: aggregatedStatistics,
                charts: {
                    lastMonthActions: {
                        ...this.state.charts.lastMonthActions,
                        chart: new Chart(this.state.charts.lastMonthActions.container.current.getContext('2d'), {
                            type: 'doughnut',
                            options: {
                                responsive: true,
                                maintainAspectRatio: false
                            },
                            data: {
                                labels: [
                                    'reviewClicks',
                                    'mapClicks',
                                    'phoneViews',
                                    'photoViews',
                                    'messengerClicks',
                                    'priceViews',
                                    'shareClicks',
                                    'socialClicks'
                                ],
                                datasets: [{
                                    data: [
                                        aggregatedStatistics.reviewClicks,
                                        aggregatedStatistics.mapClicks,
                                        aggregatedStatistics.phoneViews,
                                        aggregatedStatistics.photoViews,
                                        aggregatedStatistics.messengerClicks,
                                        aggregatedStatistics.priceViews,
                                        aggregatedStatistics.shareClicks,
                                        aggregatedStatistics.socialClicks
                                    ],
                                    backgroundColor: [catColors.review,
                                        catColors.map,
                                        catColors.phone,
                                        catColors.photo,
                                        catColors.whatsapp,
                                        catColors.price,
                                        catColors.share,
                                        catColors.social],
                                    borderWidth: 0
                                }]
                            }
                        })
                    },
                    viewsAndActions: {
                        ...this.state.charts.viewsAndActions,
                        chart: new Chart(this.state.charts.viewsAndActions.container.current.getContext('2d'), {
                            type: 'line',
                            options: {
                                responsive: true,
                                maintainAspectRatio: false
                            },
                            data: {
                                labels,
                                datasets: [{
                                    label: 'Views',
                                    data: stats.map(i => i.counters.views),
                                    fill: false,
                                    borderColor: catColors.views,
                                    tension: GRAPH_TENSION
                                },
                                    {
                                        label: 'Actions',
                                        data: stats.map(i => Object.values(i.counters.actions).reduce((acc, i) => acc + i, 0)),
                                        fill: false,
                                        borderColor: catColors.actions,
                                        tension: GRAPH_TENSION
                                    }]
                            }
                        })
                    },
                    companyActions: {
                        ...this.state.charts.companyActions,
                        chart: new Chart(this.state.charts.companyActions.container.current.getContext('2d'), {
                            type: 'bar',
                            data: {
                                labels,
                                datasets: [
                                    {
                                        label: 'Phone clicks',
                                        data: stats.map(i => i.counters.actions.phoneClicks),
                                        backgroundColor: catColors.phone
                                    },
                                    {
                                        label: 'Map clicks',
                                        data: stats.map(i => i.counters.actions.mapClicks),
                                        backgroundColor: catColors.map
                                    },
                                    {
                                        label: 'Website clicks',
                                        data: stats.map(i => i.counters.actions.websiteClicks),
                                        backgroundColor: catColors.website
                                    },
                                    {
                                        label: 'Messenger clicks',
                                        data: stats.map(i => i.counters.actions.messengerClicks),
                                        backgroundColor: catColors.whatsapp
                                    },
                                    {
                                        label: 'Social clicks',
                                        data: stats.map(i => i.counters.actions.socialClicks),
                                        backgroundColor: catColors.social
                                    },
                                ]
                            },
                            options: {
                                scales: {
                                    x: {
                                        stacked: true,
                                    },
                                    y: {
                                        stacked: true
                                    }
                                },
                                responsive: true,
                                maintainAspectRatio: false
                            }
                        })
                    },
                    sectionClicks: {
                        ...this.state.charts.sectionClicks,
                        chart: new Chart(this.state.charts.sectionClicks.container.current.getContext('2d'), {
                            type: 'line',
                            options: {
                                responsive: true,
                                maintainAspectRatio: false
                            },
                            data: {
                                labels,
                                datasets: [{
                                    label: 'Price clicks',
                                    data: stats.map(i => i.counters.actions.priceClicks),
                                    fill: false,
                                    borderColor: catColors.price,
                                    tension: GRAPH_TENSION
                                },
                                    {
                                        label: 'Photo clicks',
                                        data: stats.map(i => i.counters.actions.photoClicks),
                                        fill: false,
                                        borderColor: catColors.photo,
                                        tension: GRAPH_TENSION
                                    },
                                    {
                                        label: 'Review clicks',
                                        data: stats.map(i => i.counters.actions.reviewClicks),
                                        fill: false,
                                        borderColor: catColors.review,
                                        tension: GRAPH_TENSION
                                    }]
                            }
                        })
                    }
                }
            })
        })
    }

    render() {
        const {t, theme} = this.context

        return <div className={css['theme--' + theme]}>
            <Head>
                <title>{t('stats')}{TITLE_POSTFIX}</title>
            </Head>

            <PersonalPageLayout page={'stats'}>
                <h1 className="bigger responsive-content">{t('stats')}</h1>

                <div className={css.slHeader} style={{marginTop: 16}}>{t('statViewsAndActions')}</div>

                <div bp={'grid'} className={css.chartContainer}>
                    <div bp="12 6@md">
                        <div className="flex column" style={{gap: 5}}>
                            <div className={css.legendItem}>
                                <div>
                                    <span style={{background: catColors.views}}>&nbsp;</span>
                                    <span>{t('pageViews')}</span>
                                </div>
                                <div>{this.state.statistics.views}</div>
                            </div>

                            <div className={css.legendItem}>
                                <div>
                                    <span style={{background: catColors.actions}}>&nbsp;</span>
                                    <span>{t('actionsOnPage')}</span>
                                </div>
                                <div>{this.state.statistics.actions}</div>
                            </div>
                        </div>
                    </div>
                    <div bp="12 6@md" className={css.chart}>
                        <canvas ref={this.state.charts.viewsAndActions.container}></canvas>
                    </div>
                </div>

                <div className={css.slHeader}>{t('statCompanyActions')}</div>

                <div bp={'grid'} className={css.chartContainer}>
                    <div bp="12 6@md">
                        <div className="flex column" style={{gap: 5}}>
                            <div className={css.legendItem}>
                                <div>
                                    <span style={{background: catColors.phone}}>&nbsp;</span>
                                    <span>{t('callsAndPhoneViews')}</span>
                                </div>
                                <div>{this.state.statistics.phoneViews}</div>
                            </div>

                            <div className={css.legendItem}>
                                <div>
                                    <span style={{background: catColors.map}}>&nbsp;</span>
                                    <span>{t('mapClicks')}</span>
                                </div>
                                <div>{this.state.statistics.mapClicks}</div>
                            </div>

                            <div className={css.legendItem}>
                                <div>
                                    <span style={{background: catColors.website}}>&nbsp;</span>
                                    <span>{t('websiteClicks')}</span>
                                </div>
                                <div>{this.state.statistics.websiteClicks}</div>
                            </div>

                            <div className={css.legendItem}>
                                <div>
                                    <span style={{background: catColors.whatsapp}}>&nbsp;</span>
                                    <span>{t('messengerClicks')}</span>
                                </div>
                                <div>{this.state.statistics.messengerClicks}</div>
                            </div>

                            <div className={css.legendItem}>
                                <div>
                                    <span style={{background: catColors.social}}>&nbsp;</span>
                                    <span>{t('socialClicks')}</span>
                                </div>
                                <div>{this.state.statistics.socialClicks}</div>
                            </div>
                        </div>
                    </div>
                    <div bp="12 6@md" className={css.chart}>
                        <canvas ref={this.state.charts.companyActions.container}></canvas>
                    </div>
                </div>

                <div className={css.slHeader}>{t('statSectionClicks')}</div>

                <div bp={'grid'} className={css.chartContainer}>
                    <div bp="12 6@md">
                        <div className="flex column" style={{gap: 5}}>
                            <div className={css.legendItem}>
                                <div>
                                    <span style={{background: catColors.price}}>&nbsp;</span>
                                    <span>{t('priceViews')}</span>
                                </div>
                                <div>{this.state.statistics.priceViews}</div>
                            </div>

                            <div className={css.legendItem}>
                                <div>
                                    <span style={{background: catColors.photo}}>&nbsp;</span>
                                    <span>{t('photoViews')}</span>
                                </div>
                                <div>{this.state.statistics.photoViews}</div>
                            </div>

                            <div className={css.legendItem}>
                                <div>
                                    <span style={{background: catColors.review}}>&nbsp;</span>
                                    <span>{t('reviewClicks')}</span>
                                </div>
                                <div>{this.state.statistics.reviewClicks}</div>
                            </div>
                        </div>
                    </div>
                    <div bp="12 6@md" className={css.chart}>
                        <canvas ref={this.state.charts.sectionClicks.container}></canvas>
                    </div>
                </div>

                <div className={css.slHeader}>{t('statActionsLastMonth')}</div>

                <div bp={'grid'} className={css.chartContainer}>
                    <div bp="12 6@md">
                        <div className="flex column" style={{gap: 5}}>
                            <div className={css.legendItem}>
                                <div>
                                    <span style={{background: catColors.review}}>&nbsp;</span>
                                    <span>{t('reviewClicks')}</span>
                                </div>
                                <div>{Math.round(this.state.statistics.reviewClicks / Math.max(this.state.statistics.actions, 1) * 100)}%</div>
                            </div>

                            <div className={css.legendItem}>
                                <div>
                                    <span style={{background: catColors.social}}>&nbsp;</span>
                                    <span>{t('socialClicks')}</span>
                                </div>
                                <div>{Math.round(this.state.statistics.socialClicks / Math.max(this.state.statistics.actions, 1) * 100)}%</div>
                            </div>

                            <div className={css.legendItem}>
                                <div>
                                    <span style={{background: catColors.price}}>&nbsp;</span>
                                    <span>{t('priceViews')}</span>
                                </div>
                                <div>{Math.round(this.state.statistics.priceViews / Math.max(this.state.statistics.actions, 1) * 100)}%</div>
                            </div>

                            <div className={css.legendItem}>
                                <div>
                                    <span style={{background: catColors.phone}}>&nbsp;</span>
                                    <span>{t('callsAndPhoneViews')}</span>
                                </div>
                                <div>{Math.round(this.state.statistics.phoneViews / Math.max(this.state.statistics.actions, 1) * 100)}%</div>
                            </div>

                            <div className={css.legendItem}>
                                <div>
                                    <span style={{background: catColors.photo}}>&nbsp;</span>
                                    <span>{t('photoViews')}</span>
                                </div>
                                <div>{Math.round(this.state.statistics.photoViews / Math.max(this.state.statistics.actions, 1) * 100)}%</div>
                            </div>

                            <div className={css.legendItem}>
                                <div>
                                    <span style={{background: catColors.website}}>&nbsp;</span>
                                    <span>{t('websiteClicks')}</span>
                                </div>
                                <div>{Math.round(this.state.statistics.websiteClicks / Math.max(this.state.statistics.actions, 1) * 100)}%</div>
                            </div>

                            <div className={css.legendItem}>
                                <div>
                                    <span style={{background: catColors.share}}>&nbsp;</span>
                                    <span>{t('shareClicks')}</span>
                                </div>
                                <div>{Math.round(this.state.statistics.shareClicks / Math.max(this.state.statistics.actions, 1) * 100)}%</div>
                            </div>

                            <div className={css.legendItem}>
                                <div>
                                    <span style={{background: catColors.map}}>&nbsp;</span>
                                    <span>{t('mapClicks')}</span>
                                </div>
                                <div>{Math.round(this.state.statistics.mapClicks / Math.max(this.state.statistics.actions, 1) * 100)}%</div>
                            </div>
                        </div>
                    </div>
                    <div bp="12 6@md" className={css.chart} style={{height: 350}}>
                        <canvas ref={this.state.charts.lastMonthActions.container}></canvas>
                    </div>
                </div>
            </PersonalPageLayout>
        </div>
    }
}

export default withRouter(StatsPage)
