import React from "react";
import css from '../../styles/kit/modal.module.scss'
import {GlobalContext} from "../../contexts/Global.js";
import {cnb} from "cnbuilder";
import PropTypes from "prop-types";

export default class Modal extends React.Component {
    static contextType = GlobalContext

    static propTypes = {
        open: PropTypes.bool.isRequired,
        onUpdate: PropTypes.func.isRequired
    }

    render() {
        const {theme} = this.context

        return <div className={css['theme--' + theme]}>
            <div onClick={(e) => {
                if (e.target.classList.contains(css.overlay)) {
                    this.props.onUpdate('')
                }
            }} className={cnb(css.overlay, this.props.open ? css.visible : '')}>
            <div className={css.modal}>
                {this.props.children}
            </div>
        </div>
        </div>
    }
}
