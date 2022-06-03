import React from "react";
import PropTypes from "prop-types";
import {cnb} from "cnbuilder";
import css from '../../styles/kit/tagcard.module.scss';

export default class TagCard extends React.Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]).isRequired,
        accent: PropTypes.bool,
        dark: PropTypes.bool
    }

    static defaultProps = {
        accent: false,
        dark: false
    }

    render() {
        return <div className={cnb(css.root, this.props.dark ? css.dark : '')}>
            <div className={css.label}>{this.props.title}</div>
            <div className={cnb(css.value, this.props.accent ? css.accent : '')}>{this.props.value}</div>
        </div>
    }
}
