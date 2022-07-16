import React from "react";
import {GlobalContext} from "../../contexts/Global.js";
import APIRequests from "../../helpers/APIRequests.js";

export default class VacancyEditor extends React.Component {
    static contextType = GlobalContext

    constructor(props) {
        super(props);

        this.state = {
            vacancy: {}
        }
    }

    componentDidMount() {
        // APIRequests.getMyVacancies().then(vacancies => {
        //     this.setState({vacancies: vacancies || []})
        // })
    }

    render() {
        const {t} = this.context

        return <>
            <div className="flex justify-between responsive-content">
                back
                <h1 className={'bigger inline-flex items-center'}>{t('myVacancies')}</h1>
            </div>
        </>
    }
}
