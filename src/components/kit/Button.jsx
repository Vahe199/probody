import React from "react"
import {cnb} from "cnbuilder"
import PropTypes from 'prop-types'
import css from '../../styles/kit/button.module.scss'
import Icon from "./Icon.jsx"

class Button extends React.Component {
    static propTypes = {
        color: PropTypes.string, // primary | secondary | tertiary | success | danger
        iconLeft: PropTypes.string,
        iconRight: PropTypes.string,
        size: PropTypes.string, // small | medium | large
        isDisabled: PropTypes.bool
    }

    static defaultProps = {
        color: 'primary',
        bordered: false,
        icon: null,
        size: 'medium',
        isDisabled: false
    }

    render() {
        const textMargins = {}

        if (this.props.children) {
            if (this.props.iconLeft) {
                textMargins.marginLeft = '10px'
            }

            if (this.props.iconRight) {
                textMargins.marginRight = '10px'
            }
        }

        return <button
            className={cnb(css.btn, css[this.props.size], css[this.props.color], this.props.isDisabled ? css.disabled : '')}>
            {this.props.iconLeft && <Icon name={this.props.iconLeft}/>}
            <span className={'va-middle'} style={textMargins}>{this.props.children}</span>
            {this.props.iconRight && <Icon name={this.props.iconRight}/>}
        </button>
    }
}

export default Button
