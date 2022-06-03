import React from "react";
import css from '../../../styles/kit/forms/input.module.scss'
import PropTypes from "prop-types"
import {cnb} from "cnbuilder"
import Icon from "../Icon.jsx";
import {formatIncompletePhoneNumber, isValidPhoneNumber} from "libphonenumber-js";
import {GlobalContext} from "../../../contexts/Global.js";

export default class TextInput extends React.Component {
    static contextType = GlobalContext

    constructor(props) {
        super(props);

        this.state = {
            errored: false,
            errorMsg: '',
            locked: false,
            visible: false,
            value: ''
        }

        this.toggleLock = this.toggleLock.bind(this)
        this.handleUpdate = this.handleUpdate.bind(this)
        this.validateInput = this.validateInput.bind(this)
        this.clear = this.clear.bind(this)
        this.toggleVisibility = this.toggleVisibility.bind(this)
    }

    componentDidUpdate(prevProps) {
        if (this.props.value !== prevProps.value) {
            this.setState({value: this.props.value})
        }
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
        if (this.state.errored) {
            this.validateInput(e.target.value)
        }

        if (!this.props.value) {
            this.setState({value:
            this.props.type === 'phone' ? formatIncompletePhoneNumber(e.target.value, 'KZ') : e.target.value})
        } else {
            this.props.onUpdate(e.target.value)
        }
    }

    toggleVisibility () {
        this.setState({visible: !this.state.visible})
    }

    validateInput() {
        switch (this.props.type) {
            case 'email':
                if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.state.value)) {
                    this.setState({errored: true, errorMsg: this.context.t('incorrectEmail')})
                } else {
                    this.setState({errored: false})
                }

                break

            case 'phone':
                if (!isValidPhoneNumber(this.state.value, 'KZ')) {
                    this.setState({errored: true, errorMsg: this.context.t('incorrectPhone')})
                } else {
                    this.setState({errored: false})
                }
                break

            case 'password':
                if (this.state.value.length < 6) {
                    this.setState({errored: true, errorMsg: this.context.t('shortPassword')})
                } else {
                    this.setState({errored: false})
                }
        }
    }

    clear() {
        this.setState({value: ''})
    }

    static propTypes = {
        label: PropTypes.string.isRequired,
        lock: PropTypes.bool,
        value: PropTypes.string,
        type: PropTypes.string, // text, password, email
        onUpdate: PropTypes.func,
        variant: PropTypes.string, // 'outlined' || 'underline'
        placeholder: PropTypes.string.isRequired
    }

    static defaultProps = {
        lock: false,
        variant: 'outlined',
        type: 'text',
        value: ''
    }

    render() {
        return <div>
            <div className={cnb(css.inputRoot, this.state.errored ? css.errored : '', this.state.locked ? css.locked : '', this.props.variant === 'underline' ? css.underline : css.outlined)}>
                <div className={css.label}>{this.props.label}</div>
                <div className={'flex'}>
                    <input onBlur={this.validateInput} type={this.state.visible ? 'text' : this.props.type} value={this.state.value} onChange={this.handleUpdate} disabled={this.state.locked} placeholder={this.props.placeholder} />
                    {this.props.type === 'password' && <Icon name={this.state.visible ? 'visible' : 'hidden'} className={css.hideIcon} onClick={this.toggleVisibility} />}
                    {this.props.type !== 'text' ? <Icon onClick={this.clear} className={css.closeIcon} name={'close'}/> : null}
                    {this.state.locked ? <Icon onClick={this.toggleLock} className={css.editIcon} name={'edit'}/> : null}
                </div>
        </div>

            {this.state.errored && <span>
                    <Icon name={'error'} />
                {this.state.errorMsg}</span>}
        </div>
    }
}
