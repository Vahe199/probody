import React from "react";
import PropTypes from "prop-types";
import css from "../styles/accountpage.module.scss";
import Link from "next/link.js";
import {GlobalContext} from "../contexts/Global.js";

export default class PersonalPageLayout extends React.Component {
    static propTypes = {
        children: PropTypes.any.isRequired,
        page: PropTypes.string.isRequired
    }

    static contextType = GlobalContext

    render() {
        const {t, theme} = this.context

        return <div className={css['theme--' + theme]} bp={'grid'}>
            <div bp={'4 hide show@md'}>
                <div className={css.menu}>
                    <ul className={css.list}>
                        <li className={this.props.page === 'personal' ? css.active : ''}><Link href={'/account/personal'}>{t('user')}</Link></li>
                        <li className={this.props.page === 'promotion' ? css.active : ''}><Link href={'/account/promotion'}>{t('salonAndPromotion')}</Link></li>
                        <li className={this.props.page === 'stats' ? css.active : ''}><Link href={'/account/stats'}>{t('stats')}</Link></li>
                        <li className={this.props.page === 'reviews' ? css.active : ''}><Link href={'/account/reviews'}>{t('reviewsAndRating')}</Link></li>
                        <li className={this.props.page === 'newvacancy' ? css.active : ''}><Link href={'/account/newvacancy'}>{t('addVacancy')}</Link></li>
                    </ul>
                </div>
            </div>
            <div bp={'12 8@md'}>
                {this.props.children}
            </div>
        </div>
    }
}
