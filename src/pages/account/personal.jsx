import React from "react"
import {withRouter} from "next/router"
import PersonalPageLayout from "../../layouts/secondary/PersonalPageLayout.jsx"
import {TITLE_POSTFIX} from "../../helpers/constants.js"
import Head from "next/head.js"
import {GlobalContext} from "../../contexts/Global.js"

class PersonalInfoPage extends React.Component {
    static contextType = GlobalContext

    render() {
        const {t} = this.context

        return <>
            <Head>
                <title>{t('personalInfo')}{TITLE_POSTFIX}</title>
            </Head>

            <PersonalPageLayout page={'personal'}>
                personal info
            </PersonalPageLayout>
        </>
    }
}

export default withRouter(PersonalInfoPage)
