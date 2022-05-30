import React from "react"
import css from '../../styles/kit/infoblock.module.scss'

class Icon extends React.Component {
    render() {
        return <section className={css.infoBlock}>
            {this.props.children}
        </section>
    }
}

export default Icon
