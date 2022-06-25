import React from "react"
import {withRouter} from "next/router"
import PersonalPageLayout from "../../layouts/secondary/PersonalPageLayout.jsx"
import {TITLE_POSTFIX} from "../../helpers/constants.js"
import Head from "next/head.js"
import {GlobalContext} from "../../contexts/Global.js"

class StatsPage extends React.Component {
    static contextType = GlobalContext

    render() {
        const {t} = this.context

        return <>
            <Head>
                <title>{t('stats')}{TITLE_POSTFIX}</title>
            </Head>

            <PersonalPageLayout page={'stats'}>
                stats
            </PersonalPageLayout>
        </>
    }
}

export default withRouter(StatsPage)
