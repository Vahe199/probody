import React from "react"
import { cnb } from "cnbuilder"
import PropTypes from 'prop-types'
import css from '../../styles/kit/button.module.scss'

class Button extends React.Component {
    static propTypes = {
        color: PropTypes.string // primary | secondary | tertiary
    }

    static defaultProps = {
        color: 'primary'
    }

    render() {
        return <button className={cnb(css.btn, css[this.props.color])}>{this.props.children}</button>
    }
}

export default Button
