import React from "react"
import css from '../../../styles/kit/forms/radio.module.scss'
import PropTypes from "prop-types"
import {cnb} from "cnbuilder"
import {GlobalContext} from "../../../contexts/Global.js";

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
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        onUpdate: PropTypes.func,
        options: PropTypes.arrayOf(PropTypes.shape({
            label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
        }))
    }

    static defaultProps = {
        columnView: false
    }

    static contextType = GlobalContext

    componentDidUpdate(prevProps) {
        if (this.props.value !== prevProps.value) {
            this.setState({value: this.props.value})
        }
    }

    componentDidMount() {
        if (this.props.value) {
            this.setState({value: this.props.value})
        }
    }

    select(value) {
        if (this.props.value === undefined) {
            this.setState({value})
        } else {
            this.props.onUpdate(value)
        }
    }

    render() {
        const {theme} = this.context

        return <div style={this.props.style} className={css['theme--' + theme]}>
            <div style={{marginBottom: 8}}>
                <span className={css.caption}>{this.props.name}</span>
            </div>
            <div className={cnb(css.root, this.props.columnView ? css.column : '')}>
                {Object.keys(this.props.options).map(key =>
                    <div onClick={() => this.select(this.props.options[key].value)} className={css.radioItem} key={key}>
                        <div
                            className={cnb(css.radio, this.props.options[key].value === this.state.value ? css.checked : '')}>&nbsp;</div>
                        <span>{this.props.options[key].label}</span>
                    </div>
                )}
            </div>
        </div>
    }
}
