import React from "react"
import {withRouter} from "next/router"
import PersonalPageLayout from "../../layouts/secondary/PersonalPageLayout.jsx"
import {TITLE_POSTFIX} from "../../helpers/constants.js"
import Head from "next/head.js"
import {GlobalContext} from "../../contexts/Global.js"
import APIRequests from "../../helpers/APIRequests.js";
import PlusCollapsible from "../../components/kit/Collapses/PlusCollapsible";

class FAQ extends React.Component {
    static contextType = GlobalContext

    constructor(props) {
        super(props);

        this.state = {
            faq: []
        }
    }

    async componentDidMount() {
        this.setState({
            faq: await APIRequests.getFAQ()
        })
    }

    render() {
        const {t} = this.context

        console.log(this.state.faq)

        return <>
            <Head>
                <title>{t('faq')}{TITLE_POSTFIX}</title>
            </Head>

            <PersonalPageLayout page={'faq'}>
                <div className="responsive-content">
                    <p style={{marginBottom: 32}} className={'text-xl lack'}>{t('needHelp')}</p>

                    <div>
                        {this.state.faq.map((question, i) =>
                            <PlusCollapsible title={question.name} defaultOpen={i === 0}>
                                <p>{question.description}</p>
                            </PlusCollapsible>
                        )}
                    </div>
                </div>
            </PersonalPageLayout>
        </>
    }
}

export default withRouter(FAQ)
