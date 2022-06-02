import React from "react"
import PropTypes from 'prop-types'
import css from '../../styles/kit/icon.module.scss'

class Icon extends React.Component {
    static propTypes = {
        name: PropTypes.string.isRequired
    }

    render() {
        return <i className={css.icon} style={{
            WebkitMaskImage: `url(/icons/${this.props.name}.svg)`,
            maskImage: `url(/icons/${this.props.name}.svg)`,
            backgroundColor: 'currentColor',
            ...this.props.style
        }}>&nbsp;</i>
    }
}

export default Icon
