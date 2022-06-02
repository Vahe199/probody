import React from "react"
import css from '../../styles/kit/infoblock.module.scss'
import {cnb} from "cnbuilder";

class Icon extends React.Component {
    render() {
        return <section style={this.props.style} className={cnb('non-selectable', css.infoBlock)}>
            {this.props.children}
        </section>
    }
}

export default Icon
