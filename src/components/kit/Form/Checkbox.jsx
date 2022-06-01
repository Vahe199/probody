import React from "react"
import css from '../../../styles/kit/forms/checkbox.module.scss'
import PropTypes from "prop-types"
import Icon from "../Icon.jsx"
import {cnb} from "cnbuilder";

export default class Checkbox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            checked: false
        }

        this.toggle = this.toggle.bind(this);
    }
    static propTypes = {
        reverse: PropTypes.bool,
        icon: PropTypes.string,
        name: PropTypes.string,
    }

    static defaultProps = {
        reverse: false,
        icon: undefined
    }

    toggle() {
        this.setState({
            checked: !this.state.checked
        })
    }

    render() {
        return <div className={css.root}>
            <div>
                {this.props.icon && <Icon name={this.props.icon}/>}
                <span>{this.props.name}</span>
            </div>
            <div onClick={this.toggle} className={cnb(css.checkbox, this.state.checked ? css.checked : '')}>&nbsp;</div>
        </div>
    }
}
