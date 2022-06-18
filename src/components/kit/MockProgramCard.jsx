import React from "react";
import PropTypes from "prop-types";
import {cnb} from "cnbuilder";
import css from '../../styles/kit/programcard.module.scss';
import Icon from "./Icon.jsx";
import Link from "next/link.js";
import {GlobalContext} from "../../contexts/Global.js";

export default class MockProgramCard extends React.Component {
    static contextType = GlobalContext

    static propTypes = {
        cnt: PropTypes.number.isRequired,
        link: PropTypes.string.isRequired
    }

    render() {
        const {theme, t} = this.context

        return <div className={css['theme--' + theme]}>
            <div className={cnb(css.root, css.mock)}>
                <div className={css.label}>{t('nMore', this.props.cnt)}</div>
                <div className={cnb(css.value)}>
                    &nbsp;
                </div>
                <div className={cnb(css.value, 'flex', 'justify-between')}>
                    <div>
                        &nbsp;
                    </div>
                    <div>
                        <Link href={this.props.link}><Icon className={css.plusIcon} name={'plus'}/></Link>
                    </div>
                </div>
            </div>
        </div>
    }
}
