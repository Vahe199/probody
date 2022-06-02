import React from "react"
import css from '../../styles/kit/stats.infoblock.module.scss'
import InfoBlock from "./InfoBlock";
import PropTypes from "prop-types";
import {cnb} from "cnbuilder";

class StatsInfoBlock extends React.Component {
    static propTypes = {
        title: PropTypes.string,
        stats: PropTypes.arrayOf(PropTypes.shape({
            title: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
            accent: PropTypes.bool
        })).isRequired
    }

    render() {
        const {stats} = this.props

        return <InfoBlock>
            <h3 style={{marginBottom: 12}}>{this.props.title}</h3>
            <div bp={'grid ' + 12 / stats.length}>
                {stats.map((stat, index) =>
                    <p className={css.caption} key={index}>{stat.title}</p>
                )}
            </div>
            <div bp={'grid ' + 12 / stats.length}>
                {stats.map((stat, index) =>
                    <h1 key={index}
                        className={cnb('number-font', css[stat.accent ? 'accent' : 'default'])}>{stat.value}</h1>
                )}
            </div>
        </InfoBlock>
    }
}

export default StatsInfoBlock
