import React from "react"
import {withRouter} from "next/router"
import {TITLE_POSTFIX} from "../../helpers/constants.js"
import Head from "next/head.js"
import {GlobalContext} from "../../contexts/Global.js"
import PersonalPageLayout from "../../layouts/secondary/PersonalPageLayout.jsx"
import Button from "../../components/kit/Button.jsx";
import APIRequests from "../../helpers/APIRequests.js";

class MyVacanciesPage extends React.Component {
    static contextType = GlobalContext

    constructor(props) {
        super(props);

        this.state = {
            vacancies: []
        }
    }

    componentDidMount() {
        APIRequests.getMyVacancies().then(vacancies => {
            this.setState({vacancies})
        })
    }

    render() {
        const {t} = this.context

        return <>
            <Head>
                <title>{t('creatingVacancy')}{TITLE_POSTFIX}</title>
            </Head>

            <PersonalPageLayout page={'vacancies'}>
                <div className="flex justify-between responsive-content">
                    <h1 className={'bigger inline-flex items-center'}>{t('myVacancies')}</h1>

                    <Button iconLeft={'plus'}>
                        {t('addVacancy')}
                    </Button>
                </div>
            </PersonalPageLayout>
        </>
    }
}

export default withRouter(MyVacanciesPage)
