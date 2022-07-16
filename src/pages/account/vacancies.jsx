import React from "react"
import {TITLE_POSTFIX} from "../../helpers/constants.js"
import Head from "next/head.js"
import {GlobalContext} from "../../contexts/Global.js"
import PersonalPageLayout from "../../layouts/secondary/PersonalPageLayout.jsx"
import VacancyList from "../../components/vacancies/VacancyList";
import VacancyEditor from "../../components/vacancies/VacancyEditor.jsx";

class MyVacanciesPage extends React.Component {
    static contextType = GlobalContext

    constructor(props) {
        super(props);

        this.state = {
            view: 'vacancylist',
            setView: name => this.setState({view: name})
        }
    }

    render() {
        const {t} = this.context

        return <>
            <Head>
                <title>{t('creatingVacancy')}{TITLE_POSTFIX}</title>
            </Head>

            <PersonalPageLayout page={'vacancies'}>
                {this.state.view === 'vacancylist' ? <VacancyList setView={this.state.setView} /> : <VacancyEditor setView={this.state.setView} />}
            </PersonalPageLayout>
        </>
    }
}

export default MyVacanciesPage
