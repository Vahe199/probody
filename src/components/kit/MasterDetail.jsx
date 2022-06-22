import React from "react";
import {withRouter} from "next/router.js";
import {GlobalContext} from "../../contexts/Global.js";
import PropTypes from "prop-types";
import css from '../../styles/kit/masterdetail.module.scss'
import Icon from "./Icon.jsx";
import Link from "next/link.js";

class MasterDetail extends React.Component {
    static contextType = GlobalContext

    static propTypes = {
        photos: PropTypes.arrayOf(PropTypes.string).isRequired,
        name: PropTypes.string.isRequired,
        characteristics: PropTypes.object.isRequired,
        slug: PropTypes.string.isRequired
    }

    render() {
        const {t, isMobile, theme} = this.context

        return <Link href={'/salon/' + this.props.slug}>
            <div className={css['theme--' + theme]}>
                <div style={{
                    background: `url(${this.props.photos[0]}) rgb(37 36 32 / 39%) no-repeat center / cover`
                }} className={css.root}>
                    <div className={'flex justify-between'}>
                        <div className={'subtitle2'}>{isMobile ? ' ' : this.props.name}</div>
                        <div className={css.withIcon}>
                            <Icon name={'pic'}/>
                            {this.props.photos.length}
                        </div>
                    </div>
                    <div>
                        {isMobile ? <div className={'subtitle2'}>{this.props.name}</div> : <div bp={'grid 6'}>
                            <div>
                                <div className={css.label}>{t('age')}</div>
                                <div className={css.value}>{this.props.characteristics.age}&nbsp;{t('years')}</div>
                            </div>
                            <div>
                                <div className={css.label}>{t('weight')}</div>
                                <div className={css.value}>{this.props.characteristics.weight}&nbsp;{t('kg')}</div>
                            </div>
                            <div>
                                <div className={css.label}>{t('bust')}</div>
                                <div className={css.value}>{this.props.characteristics.bust}&nbsp;{t('size')}</div>
                            </div>
                            <div>
                                <div className={css.label}>{t('height')}</div>
                                <div className={css.value}>{this.props.characteristics.height}&nbsp;{t('cm')}</div>
                            </div>
                            <div>
                                <div className={css.label}>{t('eyes')}</div>
                                <div className={css.value}>{this.props.characteristics.eyes}</div>
                            </div>
                            <div>
                                <div className={css.label}>{t('hair')}</div>
                                <div className={css.value}>{this.props.characteristics.hair}</div>
                            </div>
                        </div>}
                    </div>
                </div>
            </div>
        </Link>
    }
}

export default withRouter(MasterDetail)