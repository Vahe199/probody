import React from "react";
import PropTypes from "prop-types";
import {cnb} from "cnbuilder";
import css from '../../styles/kit/tagcard.module.scss';
import Icon from "./Icon.jsx";
import Link from "next/link.js";

export default class TagCard extends React.Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]).isRequired,
        accent: PropTypes.bool,
        dark: PropTypes.bool,
        link: PropTypes.string
    }

    static defaultProps = {
        accent: false,
        dark: false
    }

    render() {
        return <div className={cnb(css.root, this.props.dark ? css.dark : '')}>
            <div className={css.label}>{this.props.title}</div>
            <div className={cnb(css.value, this.props.accent ? css.accent : '', 'flex', 'justify-between')}>
                <div>{this.props.value}</div>
                {this.props.link && <div><Link href={this.props.link}><Icon className={css.arrowDown} name={'arrow_right'} /></Link></div>}
            </div>
        </div>
    }
}