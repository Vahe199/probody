import React from "react";
import {GlobalContext} from "../../contexts/Global.js";
import css from "../../styles/pages/personal.promotion.module.scss";
import Icon from "../kit/Icon.jsx";
import Link from "next/link.js";
import APIRequests from "../../helpers/APIRequests.js";

export default class Promotion extends React.Component {
    static contextType = GlobalContext

    constructor(props) {
        super(props);

        this.state = {
            mySalon: {
            },
            personalInfo: {}
        }
    }

    componentDidMount() {
        this.getSalonInfo()
        this.getMe()
    }

    getSalonInfo() {
        APIRequests.getMySalonInfo().then(mySalon => {
            this.setState({mySalon})
        })
    }

    getMe() {
        APIRequests.getMe().then(personalInfo => {
            this.setState({personalInfo})
        })
    }

    render() {
        const {t, theme, isMobile} = this.context

        return <div className={css['theme--' + theme]}>
            <div className="responsive-content" bp={'grid'}>
                <h1 bp={'12 4@md'} className={'bigger inline-flex items-center lineheight-1'}>{t('salonArticle')}</h1>

                <div bp={'12 8@md'} className={'flex gap-12 justify-' + (isMobile ? 'start' : 'end')}>
                    <p className={css.editSalonLink}>
                        <Icon name={'edit'}/>

                        {t('editSalon')}
                    </p>

                    <Link href={'/salon/' + this.state.mySalon.slug}><p className={css.editSalonLink}>
                        <Icon name={'arrow_right_square'}/>

                        {t('toSalon')}
                    </p></Link>
                </div>
            </div>
        </div>
    }
}
