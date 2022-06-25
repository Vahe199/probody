import React from "react"
import {withRouter} from "next/router"
import PersonalPageLayout from "../../layouts/secondary/PersonalPageLayout.jsx"
import {TITLE_POSTFIX} from "../../helpers/constants.js"
import Head from "next/head.js"
import {GlobalContext} from "../../contexts/Global.js"
import css from '../../styles/articlecard.module.scss'
import APIRequests from "../../helpers/APIRequests.js";
import PlusCollapsible from "../../components/kit/Collapses/PlusCollapsible";
import {cnb} from "cnbuilder";
import Button from "../../components/kit/Button.jsx";
import Icon from "../../components/kit/Icon.jsx";

class FAQ extends React.Component {
    static contextType = GlobalContext

    constructor(props) {
        super(props);

        this.state = {
            faq: []
        }

        this.answerQuestion = this.answerQuestion.bind(this)
    }

    async componentDidMount() {
        let faq = await APIRequests.getFAQ()

        faq[0].quality = (await APIRequests.getFAQQuality(faq[0]._id)).quality * 100

        this.setState({
            faq
        })
    }

    async getQuality(index) {
        const faq = [...this.state.faq]

        if (faq[index].quality) {
            return
        }

        faq[index].quality = (await APIRequests.getFAQQuality(faq[index]._id)).quality * 100

        this.setState({
            faq
        })
    }

    async answerQuestion(index, useful, text) {
        const faq = [...this.state.faq]

        APIRequests.answerQuestion(faq[index]._id, useful, text).then(() => {
            faq[index].gotResponse = true

            this.setState({faq})
        })
    }


    render() {
        const {t, theme} = this.context

        return <div className={css['theme--' + theme]}>
            <Head>
                <title>{t('faq')}{TITLE_POSTFIX}</title>
            </Head>

            <PersonalPageLayout page={'faq'}>
                <div>
                    <p style={{marginBottom: 32}} className={'text-xl lack responsive-content'}>{t('needHelp')}</p>

                    <div>
                        {this.state.faq.map((question, i) =>
                            <PlusCollapsible title={question.name} defaultOpen={i === 0} key={i} onOpen={() => this.getQuality(i)}>
                                <p>{question.description}</p>

                                {question.gotResponse === false && <div style={{marginTop: 16, marginBottom: 12, maxWidth: 375}} className={cnb(css.cardRoot, css.padded)}>
                                    <h2>{t('wasThisAnswerUseful')}</h2>

                                    <p className={css.textDisabled}>
                                        {t('nUsersThinkThatsUseful', question.quality !== undefined ? question.quality.toFixed(0) : '-')}
                                    </p>

                                    <div className="flex" style={{marginTop: 24}}>
                                        <Button onClick={() => this.answerQuestion(i, true)}>{t('yes')}</Button>
                                        <Button color={'tertiary'}>{t('no')}</Button>
                                        <Button color={'tertiary'}><Icon name={'tg_light'} /></Button>
                                    </div>
                                </div>}
                            </PlusCollapsible>
                        )}
                    </div>
                </div>
            </PersonalPageLayout>
        </div>
    }
}

export default withRouter(FAQ)
