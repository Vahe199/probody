import React from "react"
import {TITLE_POSTFIX} from "../../helpers/constants.js"
import Head from "next/head.js"
import {GlobalContext} from "../../contexts/Global.js"
import PersonalPageLayout from "../../layouts/secondary/PersonalPageLayout.jsx"
import Salon from "../../components/promotion/Salon";
import Raises from "../../components/promotion/Raises";

class PromotionPage extends React.Component {
    static contextType = GlobalContext

    constructor(props) {
        super(props);

        this.state = {
            view: 'salon',
            editingVacancy: '',
            setView: (name) => this.setState({view: name})
        }
    }

    render() {
        const {t} = this.context

        return <>
            <Head>
                <title>{t('salonAndPromotion')}{TITLE_POSTFIX}</title>
            </Head>

            <PersonalPageLayout page={'promotion'}>
                {this.state.view === 'salon' ? <Salon setView={this.state.setView} /> : <Raises setView={this.state.setView} />}
            </PersonalPageLayout>
        </>
    }
}

export default PromotionPage
