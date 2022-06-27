import React from "react"
import {withRouter} from "next/router"
import {TITLE_POSTFIX} from "../../helpers/constants.js"
import Head from "next/head.js"
import {GlobalContext} from "../../contexts/Global.js"
import PersonalPageLayout from "../../layouts/secondary/PersonalPageLayout.jsx"

class MyVacanciesPage extends React.Component {
    static contextType = GlobalContext

    render() {
        const {t} = this.context

        return <>
            <Head>
                <title>{t('creatingVacancy')}{TITLE_POSTFIX}</title>
            </Head>

            <PersonalPageLayout page={'vacancies'}>
                creating vacancy
            </PersonalPageLayout>
        </>
    }
}

export default withRouter(MyVacanciesPage)
