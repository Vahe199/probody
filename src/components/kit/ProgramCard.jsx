import React from "react";
import PropTypes from "prop-types";
import {cnb} from "cnbuilder";
import css from '../../styles/kit/programcard.module.scss';
import Icon from "./Icon.jsx";
import {formatPrice} from "../../helpers/String";
import Link from "next/link.js";

export default class ProgramCard extends React.Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        duration: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        link: PropTypes.string.isRequired
    }

    render() {
        return <div className={cnb(css.root)}>
            <div className={css.label}>{this.props.title}</div>
            <div className={cnb(css.value)}>
                <Icon style={{
                marginLeft: -2,
                    width: 18,
                    height: 18,
                    marginRight: 2
                }} name={'clock'}/>
                {this.props.duration}
            </div>
            <div className={cnb(css.value, 'flex', 'justify-between')}>
                <div>
                <Icon name={'kzt'}/>
                {formatPrice(this.props.price)}
                </div>
                <div>
                    <Link href={this.props.link}><Icon className={css.arrowRight} name={'arrow_right'} /></Link>
                </div>
            </div>
        </div>
    }
}
