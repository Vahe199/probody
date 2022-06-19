import React from "react"
import PropTypes from "prop-types"
import css from '../../../styles/kit/forms/range.module.scss'
import {GlobalContext} from "../../../contexts/Global.js";
import {cnb} from "cnbuilder";
import {formatPrice} from "../../../helpers/String";

export default class MultipleRangeInput extends React.Component {
    static contextType = GlobalContext

    static propTypes = {
        onUpdate: PropTypes.func.isRequired,
        from: PropTypes.number.isRequired,
        to: PropTypes.number.isRequired,
        min: PropTypes.number,
        max: PropTypes.number,
        step: PropTypes.number
    }

    static defaultProps = {
        min: 1,
        max: 10,
        step: 1
    }

    render() {
        const {theme, t} = this.context

        return <div style={{margin: '2px 0 5px 0'}} className={cnb(css['theme--' + theme], 'non-selectable')}>
            <div className={css.multipleContainer}>
                <input value={this.props.from} step={this.props.step} min={this.props.min} max={this.props.max}
                       className={cnb(css.range, css.multiple)}
                       type={"range"} onInput={e => this.props.onUpdate(Number(e.target.value))}/>
                <input value={this.props.to} step={this.props.step} min={this.props.min} max={this.props.max}
                       className={cnb(css.range, css.multiple)} style={{background: 'none'}}
                       type={"range"} onInput={e => this.props.onUpdate(undefined, Number(e.target.value))}/>
            </div>

            <div className="flex justify-between">
                <div className={css.limit}>{formatPrice(this.props.from)} {t('kzt')}</div>
                <div className={css.limit}>{formatPrice(this.props.to)} {t('kzt')}</div>
            </div>
        </div>
    }
}
