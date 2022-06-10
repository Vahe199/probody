import React from "react";
import PropTypes from "prop-types";
import Link from "next/link.js";
import css from '../../styles/kit/breadcrumbs.module.scss';
import {GlobalContext} from "../../contexts/Global.js";

export default class Breadcrumbs extends React.Component {
    static contextType = GlobalContext

    static propTypes = {
        items: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string.isRequired,
            href: PropTypes.string.isRequired,
        })).isRequired
    }

    render() {
        const {theme, isMobile} = this.context;
        const {items} = this.props;

        return isMobile ? '' : <div className={css['theme--' + theme]}>
            <div className={css.body}>
                {items.map((item, index) =>
                    <Link href={item.href} key={index}><span className={css.item}>{item.name}</span></Link>
                )}
            </div>
        </div>
    }
}
