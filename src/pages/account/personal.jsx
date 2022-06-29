import React from "react"
import {withRouter} from "next/router"
import PersonalPageLayout from "../../layouts/secondary/PersonalPageLayout.jsx"
import {TITLE_POSTFIX} from "../../helpers/constants.js"
import Head from "next/head.js"
import {GlobalContext} from "../../contexts/Global.js"
import RangeInput from "../../components/kit/Form/RangeInput";

class PersonalInfoPage extends React.Component {
    static contextType = GlobalContext

    constructor(props) {
        super(props);

        this.state = {
            val: 40
        }
    }

    render() {
        const {t} = this.context

        return <>
            <Head>
                <title>{t('personalInfo')}{TITLE_POSTFIX}</title>
            </Head>

            <PersonalPageLayout page={'personal'}>
                <RangeInput value={this.state.val} max={100} min={0} onUpdate={val => this.setState({val})} />
            </PersonalPageLayout>
        </>
    }
}

export default withRouter(PersonalInfoPage)
