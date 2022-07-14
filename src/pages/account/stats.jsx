import React from "react"
import {withRouter} from "next/router"
import PersonalPageLayout from "../../layouts/secondary/PersonalPageLayout.jsx"
import {TITLE_POSTFIX} from "../../helpers/constants.js"
import Head from "next/head.js"
import css from '../../styles/statpage.module.scss'
import {GlobalContext} from "../../contexts/Global.js"
import {Chart} from 'chart.js'
import APIRequests from "../../helpers/APIRequests.js";

class StatsPage extends React.Component {
    static contextType = GlobalContext

    constructor(props) {
        super(props);

        this.state = {
            statsNearCurrentDate: {}
        }
    }

    componentDidMount() {
        APIRequests.getStatsForNearestNDays(10).then(stats => {
            console.log(stats)
        })
    }

    render() {
        const {t, theme} = this.context

        return <div className={css['theme--' + theme]}>
            <Head>
                <title>{t('stats')}{TITLE_POSTFIX}</title>
            </Head>

            <PersonalPageLayout page={'stats'}>
                <h1 className="bigger">{t('stats')}</h1>

                <div className={css.slHeader} style={{marginTop: 32}}>{t('statViewsAndActions')}</div>

                <div className={css.slHeader} style={{marginTop: 32}}>{t('statCompanyActions')}</div>

                <div className={css.slHeader} style={{marginTop: 32}}>{t('statSectionClicks')}</div>

                <div className={css.slHeader} style={{marginTop: 32}}>{t('statActionsLastMonth')}</div>
            </PersonalPageLayout>
        </div>
    }
}

export default withRouter(StatsPage)
