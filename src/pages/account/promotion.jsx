import React from "react"
import {withRouter} from "next/router"
import PersonalPageLayout from "../../components/PersonalPageLayout.jsx"
import {TITLE_POSTFIX} from "../../helpers/constants.js"
import Head from "next/head.js"
import {GlobalContext} from "../../contexts/Global.js"

class PersonalInfoPage extends React.Component {
    static contextType = GlobalContext

    render() {
        const {t} = this.context

        return <>
            <Head>
                <title>{t('salonAndPromotion')}{TITLE_POSTFIX}</title>
            </Head>

            <PersonalPageLayout page={'promotion'}>
                salon and promotion
            </PersonalPageLayout>
        </>
    }
}

export default withRouter(PersonalInfoPage)
