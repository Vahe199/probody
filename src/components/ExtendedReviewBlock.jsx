import React from "react";
import PropTypes from "prop-types";
import css from '../styles/reviewblock.module.scss';
import {DateTime} from "luxon";
import {GlobalContext} from "../contexts/Global.js";
import {cnb} from "cnbuilder";
import Icon from "./kit/Icon.jsx";
import {capitalize} from "../helpers/String.js";

export default class ExtendedReviewBlock extends React.Component {
    static contextType = GlobalContext

    static propTypes = {
        name: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        avg: PropTypes.number.isRequired,
        createdAt: PropTypes.string.isRequired,
        service: PropTypes.number.isRequired,
        interior: PropTypes.number.isRequired,
        massage: PropTypes.number.isRequired,
        targetType: PropTypes.oneOf(['master', 'salon']).isRequired,
        targetName: PropTypes.string.isRequired
    }

    render() {
        const {t, theme} = this.context;

        return <div className={css['theme--' + theme]}>
            <div className={css.root}>
                <div style={{gap: 20}} className={cnb("flex", css.gradeContainer)}>
                    <div style={{marginRight: 12}}>
                        <span className={css.general}>{t('generalGrade')}</span>
                        <div className={'flex vertical-center'}>
                            <span className={css.star}><Icon name={'star'}/></span>
                            <span className={css.general}>{this.props.avg.toFixed(1)}</span>
                        </div>
                    </div>
                    <div>
                        <span>{t('service')}</span>
                        <div>{this.props.service.toFixed(1)}</div>
                    </div>
                    <div>
                        <span>{t('massage')}</span>
                        <div>
                            {this.props.massage.toFixed(1)}
                        </div>
                    </div>
                    <div>
                        <span>{t('interior')}</span>
                        <div>
                            {this.props.interior.toFixed(1)}
                        </div>
                    </div>
                </div>

                <div style={{marginTop: 16}} className="flex justify-between align-end">
                    <span className={css.name}>{this.props.name}</span>
                    <span
                        className={css.date}>{DateTime.fromISO(this.props.createdAt).toFormat('d.MM.yyyy')}</span>
                </div>

                <div className={cnb(css.withSpacer, css.text)} style={{paddingBottom: this.props.text ? 16 : 0}}>
                    {this.props.text}
                </div>

                <div className={cnb(css.withSpacer, 'flex', 'justify-between')} style={{padding: '16px 0'}}>
                    <b>{t('review')}</b>
                    <b>{t('for' + capitalize(this.props.targetType))}{this.props.targetType === 'master' && ' ' + this.props.targetName}</b>
                </div>

                <div style={{marginTop: 16}}></div>
            </div>
        </div>
    }
}
