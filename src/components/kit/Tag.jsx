import React from "react"
import css from '../../styles/kit/tag.module.scss'
import PropTypes from "prop-types"
import Icon from "./Icon.jsx"
import {cnb} from "cnbuilder";

export default class Tag extends React.Component {
    static propTypes = {
        icon: PropTypes.string,
        label: PropTypes.string,
        enabled: PropTypes.bool,
    }

    static defaultProps = {
        enabled: true,
    }

    render() {
        return <div className={cnb(css.root, 'non-selectable', this.props.enabled ? css.enabled : css.disabled)}>
            {this.props.icon && <Icon name={this.props.icon}/>}
            <span style={{marginLeft: this.props.icon ? 8 : 0}}>{this.props.label}</span>
        </div>
    }
}
