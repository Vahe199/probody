import React from "react"
import css from '../../../styles/kit/forms/checkbox.module.scss'
import PropTypes from "prop-types"
import Icon from "../Icon.jsx"
import {cnb} from "cnbuilder";
import {GlobalContext} from "../../../contexts/Global.js";

export default class Checkbox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            checked: false
        }

        this.toggle = this.toggle.bind(this);
    }

    static contextType = GlobalContext

    static propTypes = {
        reverse: PropTypes.bool,
        icon: PropTypes.string,
        name: PropTypes.string,
        value: PropTypes.bool,
        onUpdate: PropTypes.func
    }

    static defaultProps = {
        reverse: false,
        icon: undefined
    }

    componentDidUpdate(prevProps) {
        if (this.props.value !== prevProps.value) {
            this.setState({checked: this.props.value})
        }
    }

    componentDidMount() {
        if (this.props.value) {
            this.setState({checked: this.props.value})
        }
    }

    toggle() {
        if (this.props.value === undefined) {
            this.setState({
                    checked: !this.state.checked
                })
        } else {
            this.props.onUpdate(!this.state.checked)
        }
    }

    render() {
        const {theme} = this.context

        return <div className={'theme--' + theme}><div className={css.root}>
            <div>
                {this.props.icon && <Icon name={this.props.icon}/>}
                <span>{this.props.name}</span>
            </div>
            <div onClick={this.toggle} className={cnb(css.checkbox, this.state.checked ? css.checked : '')}>&nbsp;</div>
        </div></div>
    }
}
