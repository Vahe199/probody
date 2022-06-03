import React from "react";
import css from '../../../styles/kit/forms/input.module.scss'
import PropTypes from "prop-types"
import {cnb} from "cnbuilder"
import Icon from "../Icon.jsx";

export default class TextInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            errored: false,
            locked: false,
            value: ''
        }

        this.toggleLock = this.toggleLock.bind(this)
        this.handleUpdate = this.handleUpdate.bind(this)
    }

    componentDidMount() {
        if (this.props.lock) {
            this.setState({locked: true})
        }

        if (this.props.value) {
            this.setState({value: this.props.value})
        }
    }

    toggleLock() {
        this.setState({locked: !this.state.locked})
    }

    handleUpdate(e) {
        if (!this.props.value) {
            this.setState({value: e.target.value})
        } else {
            this.props.onUpdate(e.target.value)
        }
    }

    static propTypes = {
        label: PropTypes.string.isRequired,
        lock: PropTypes.bool,
        value: PropTypes.string,
        onUpdate: PropTypes.func,
        placeholder: PropTypes.string.isRequired
    }

    static defaultProps = {
        lock: false,
        value: ''
    }

    render() {
        return <div className={cnb(css.inputRoot, this.state.errored ? css.errored : '', this.state.locked ? css.locked : '')}>
            <div className={css.label}>{this.props.label}</div>
            <div className={'flex'}>
                <input type={'text'} value={this.state.value} onChange={this.handleUpdate} disabled={this.state.locked} placeholder={this.props.placeholder} />
                {this.state.locked ? <Icon onClick={this.toggleLock} className={css.editIcon} name={'edit'}/> : null}
            </div>
        </div>
    }
}
