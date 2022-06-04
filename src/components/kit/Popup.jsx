import React from "react"
import css from '../../styles/kit/popup.module.scss'
import PropTypes from "prop-types"
import {cnb} from "cnbuilder";

export default class Popup extends React.Component {
    static propTypes = {
        isOpen: PropTypes.bool,
        fullSize: PropTypes.bool
    }

    static defaultProps = {
        isOpen: false,
        fullSize: false
    }

    render() {
        return <div className={cnb(css.root, this.props.fullSize ? css.fullsize : '')}>
            <div style={this.props.style} className={cnb(css.popup, this.props.isOpen ? css.open : '', this.props.fullSize ? css.fullsize : '')}>{this.props.children}</div>
        </div>
    }
}
