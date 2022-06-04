import css from '../../../styles/kit/forms/input.module.scss'
import React from "react";
import PropTypes from "prop-types";
import {cnb} from "cnbuilder";
import Icon from "../Icon.jsx";
import Popup from "../Popup";

export default class Select extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '',
            open: false,
            locked: false
        }

        this.toggleLock = this.toggleLock.bind(this)
        this.handleUpdate = this.handleUpdate.bind(this)
    }

    static propTypes = {
        label: PropTypes.string.isRequired,
        options: PropTypes.shape().isRequired,
        variant: PropTypes.string, // 'outlined' || 'underline'
        placeholder: PropTypes.string.isRequired,
        value: PropTypes.string,
        lock: PropTypes.bool
    }

    componentDidUpdate(prevProps) {
        if (this.props.value !== prevProps.value) {
            this.setState({value: this.props.value})
        }
    }

    async handleUpdate(key) {
        if (this.props.value === undefined) {
            await this.setState({value: key})
        } else {
            this.props.onUpdate(key)
        }

        await this.setState({open: false})
    }

    toggleLock() {
        this.setState({locked: !this.state.locked})
    }

    render() {
        return <div className={cnb(css.inputRoot, this.props.variant === 'underline' ? css.underline : css.outlined)}>
            <div className={css.label}>{this.props.label}</div>
            <div className={'flex'}>
                <div style={{
                    width: '100%'
                }} onClick={() => this.setState({open: true})}>{this.props.options[this.state.value]}&nbsp;</div>
                {this.state.locked ? <Icon onClick={this.toggleLock} className={css.editIcon} name={'edit'}/> : null}
            </div>

            <Popup isOpen={this.state.open} style={{
                top: 16,
                left: -23
            }}>
                    {Object.keys(this.props.options).map((key) =>
                        <div style={{
                            minWidth: 300,
                            cursor: 'pointer',
                            marginBottom: 8
                        }} key={key} onClick={() => this.handleUpdate(key)}>{this.props.options[key]}</div>
                    )}
            </Popup>
        </div>
    }
}
