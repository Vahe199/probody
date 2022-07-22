import React from "react";
import {GlobalContext} from "../../contexts/Global.js";
import css from '../../styles/pages/personal.promotion.module.scss'
import Icon from "../kit/Icon.jsx";

export default class RaiseArchive extends React.Component {
    static contextType = GlobalContext

    constructor(props) {
        super(props);

        this.state = {}
    }

    render() {
        const {t, theme, isMobile} = this.context

        return <div className={css['theme--' + theme]}>
            <div className={css.arrowBack} onClick={() => this.props.setView('promotion', '')}>
                <Icon name={'arrow_left'}/>
                <span>{t('back')}</span>
            </div>

            <h1 className={'bigger'} style={{marginTop: isMobile ? 32 : 48}}>{t('archive')}</h1>
            <p className="subtitle2" style={{marginTop: 20}}>{t('raiseHistory')}</p>
        </div>
    }
}
