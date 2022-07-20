import React from "react"
import {TITLE_POSTFIX} from "../../helpers/constants.js"
import Head from "next/head.js"
import {GlobalContext} from "../../contexts/Global.js"
import PersonalPageLayout from "../../layouts/secondary/PersonalPageLayout.jsx"
import css from "../../styles/pages/personal.promotion.module.scss";
import Icon from "../../components/kit/Icon.jsx";

class PromotionPage extends React.Component {
    static contextType = GlobalContext

    constructor(props) {
        super(props);

        this.state = {
        }
    }

    render() {
        const {t} = this.context

        return <>
            <Head>
                <title>{t('salonAndPromotion')}{TITLE_POSTFIX}</title>
            </Head>

            <PersonalPageLayout page={'promotion'}>
                <div className="flex justify-between responsive-content">
                    <h1 className={'bigger inline-flex items-center lineheight-1'}>{t('salonArticle')}</h1>

                    <p className={css.editSalonLink}>
                        {t('editSalon')}

                        <Icon name={'edit'}/>
                    </p>
                </div>
            </PersonalPageLayout>
        </>
    }
}

export default PromotionPage
