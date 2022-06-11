import css from '../../../styles/kit/forms/input.module.scss'
import React from "react";
import PropTypes from "prop-types";
import {cnb} from "cnbuilder";
import Icon from "../Icon.jsx";
import Popup from "../Popup";
import {GlobalContext} from "../../../contexts/Global.js";

export default class Select extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '',
            label: '',
            open: false,
            locked: false
        }

        this.toggleLock = this.toggleLock.bind(this)
        this.handleUpdate = this.handleUpdate.bind(this)
        this.openMenu = this.openMenu.bind(this)
    }

    static contextType = GlobalContext

    static propTypes = {
        label: PropTypes.string.isRequired,
        options: PropTypes.arrayOf(PropTypes.shape({
            _id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired
        })).isRequired,
        variant: PropTypes.string, // 'outlined' || 'underline'
        placeholder: PropTypes.string.isRequired,
        value: PropTypes.string,
        lock: PropTypes.bool
    }

    openMenu() {
        if (!this.state.locked && !this.props.disabled) {
            this.setState({open: true})
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.value !== prevProps.value) {
            this.setState({value: this.props.value, label: this.props.options.find(i => i._id === this.props.value).name})
        }
    }

    componentDidMount() {
        if (this.props.value) {
            this.setState({
                value: this.props.value,
                label: this.props.options.find(i => i._id === this.props.value).name
            })
        }
    }

    async handleUpdate(key) {
        if (this.props.value === undefined) {
            await this.setState({value: key, label: this.props.options.find(i => i._id === this.props.value).name})
        } else {
            this.props.onUpdate(key)
        }

        await this.setState({open: false})
    }

    toggleLock() {
        this.setState({locked: !this.state.locked})
    }

    render() {
        const {theme} = this.context

        return <div className={css['theme--' + theme]}><div style={{minWidth: 150}} className={cnb(css.inputRoot, 'non-selectable', this.props.variant === 'underline' ? css.underline : css.outlined, (this.state.locked || this.props.disabled) ? css.locked : '')}>
            <div className={css.label}>{this.props.label}</div>
            <div className={'flex'}>
                <div style={{
                    width: '100%'
                }} onClick={this.openMenu}>{this.state.label || <span className={css.caption}>{this.props.placeholder}</span>}</div>
                {this.state.locked ? <Icon onClick={this.toggleLock} className={css.editIcon} name={'edit'}/> : null}
            </div>

            <Popup isOpen={this.state.open} style={{
                top: 16,
                left: -23,
                maxHeight: 280,
                overflowX: 'scroll'
            }}>
                    {this.props.options.map(option =>
                        <div style={{
                            minWidth: 300,
                            cursor: 'pointer',
                            marginBottom: 8
                        }} key={option._id} onClick={() => this.handleUpdate(option._id)}>{option.name}</div>
                    )}
            </Popup>
        </div></div>
    }
}
