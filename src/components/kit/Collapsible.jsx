import React from "react";
import css from '../../styles/kit/collapsible.module.scss';
import PropTypes from "prop-types";
import Icon from "./Icon.jsx";
import Checkbox from "./Form/Checkbox";
import {cnb} from "cnbuilder";
import {GlobalContext} from "../../contexts/Global.js";

export default class Collapsible extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            bodyRef: React.createRef()
        }

        this.toggle = this.toggle.bind(this);
    }

    static propTypes = {
        children: PropTypes.node.isRequired,
        title: PropTypes.string.isRequired,
        defaultOpen: PropTypes.bool,
        value: PropTypes.bool,
        onUpdate: PropTypes.func,
    }

    static defaultProps = {
        selectable: false
    }

    static contextType = GlobalContext

    componentDidMount() {
        if (this.props.defaultOpen) {
            this.setState({
                isOpen: true
            })
        }
    }

    toggle() {
        this.setState({isOpen: !this.state.isOpen})
    }

    render() {
        const {theme} = this.context

        return <div className={css['theme--' + theme]}>
            <div className={cnb(css.head, this.props.value ? css.checked : '')}>
                <div className={'flex grow-1 vertical-center'}>
                    {this.props.selectable && <Checkbox onUpdate={this.props.onUpdate} value={this.props.value} />}
                    <span onClick={this.toggle} className={'subtitle2 fullwidth'} style={{marginLeft: 12}}>{this.props.title}</span>
                </div>
                <div onClick={this.toggle} className={'flex vertical-center'}>
                    <Icon className={cnb(css.chevron, this.state.isOpen ? css.open : '')} name={'chevron_down'}/>
                </div>
            </div>
            <div ref={this.state.bodyRef} className={css.body} style={{
                maxHeight: this.state.isOpen ? this.state.bodyRef.current?.scrollHeight : 0
            }}>
                {this.props.children}
            </div>
        </div>
    }
}
