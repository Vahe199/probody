import React from "react";
import css from '../../../styles/kit/forms/input.module.scss'
import PropTypes from "prop-types"
import {cnb} from "cnbuilder"
import Icon from "../Icon.jsx";
import {AsYouType, isValidPhoneNumber} from "libphonenumber-js";
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
            value: '',
            success: false
        }

        this.toggleLock = this.toggleLock.bind(this)
        this.handleUpdate = this.handleUpdate.bind(this)
        this.validateInput = this.validateInput.bind(this)
        this.clear = this.clear.bind(this)
        this.toggleVisibility = this.toggleVisibility.bind(this)
    }

    async componentDidUpdate(prevProps) {
        if (this.props.value !== prevProps.value) {
            await this.setState({value: this.props.value})

            if (this.state.errored) {
                await this.validateInput()
            }
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

    async handleUpdate(e) {
        const value = this.props.type === 'phone' ? (new AsYouType('KZ')).input(e.target.value) : e.target.value

        if (this.props.value === undefined) {
            await this.setState({value})

            if (this.state.errored) {
                await this.validateInput()
            }
        } else {
            this.props.onUpdate(value)
        }
    }

    toggleVisibility () {
        this.setState({visible: !this.state.visible})
    }

    async validateInput(e) {
        switch (this.props.type) {
            case 'email':
                if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.state.value)) {
                    await this.setState({errored: true, success: false, errorMsg: this.context.t('incorrectEmail')})
                } else {
                    await this.setState({errored: false})
                }

                break

            case 'phone':
                if (!isValidPhoneNumber(this.state.value, 'KZ')) {
                    await this.setState({errored: true, success: false, errorMsg: this.context.t('incorrectPhone')})
                } else {
                    await this.setState({errored: false})
                }
                break

            case 'password':
                if (this.state.value.length < 6) {
                    await this.setState({errored: true, success: false, errorMsg: this.context.t('shortPassword')})
                } else {
                    await this.setState({errored: false})
                }
        }

        if (e && !this.state.errored && this.state.value.length > 0) {
            this.setState({success: true})
        } else if (e && !this.state.errored && this.state.value.length === 0) {
            this.setState({success: false})
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
        const {theme} = this.context

        return <div style={this.props.style} className={'theme--' + theme}>
            <div className={cnb(css.inputRoot, this.state.errored ? css.errored : '', this.state.success ? css.success : '', this.state.locked ? css.locked : '', this.props.variant === 'underline' ? css.underline : css.outlined)}>
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
