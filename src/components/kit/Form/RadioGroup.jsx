import React from "react"
import css from '../../../styles/kit/forms/radio.module.scss'
import PropTypes from "prop-types"
import {cnb} from "cnbuilder"

export default class RadioGroup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: undefined
        }

        this.select = this.select.bind(this);
    }

    static propTypes = {
        name: PropTypes.string,
        columnView: PropTypes.bool,
        options: PropTypes.arrayOf(PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired
        }))
    }

    static defaultProps = {
        columnView: false
    }

    select(value) {
        this.setState({
            value
        })
    }

    render() {
        return <div>
            <div style={{marginBottom: 8}}>
                <span className={css.caption}>{this.props.name}</span>
            </div>
            <div className={cnb(css.root, this.props.columnView ? css.column : '')}>
                {Object.keys(this.props.options).map(key =>
                    <div onClick={() => this.select(this.props.options[key].value)} className={css.radioItem} key={key}>
                        <div className={cnb(css.radio, this.props.options[key].value === this.state.value ? css.checked : '')}>&nbsp;</div>
                        <span>{this.props.options[key].label}</span>
                    </div>
                )}
            </div>
        </div>
    }
}
