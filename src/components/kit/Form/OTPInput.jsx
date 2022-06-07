import React from "react";
import css from '../../../styles/kit/forms/OTPInput.module.scss';
import {GlobalContext} from "../../../contexts/Global.js";
import {cnb} from "cnbuilder";

export default class OTPInput extends React.Component {
    static contextType = GlobalContext

    constructor(props) {
        super(props);

        this.state = {
            values: ['', '', '', '', ''],
            refs: [React.createRef(), React.createRef(), React.createRef(), React.createRef(), React.createRef()],
        }

        this.handleInputFrom = this.handleInputFrom.bind(this);
    }

    handleInputFrom(index, event) {
        if (event.target.value.length > 0 && isNaN(Number(event.target.value[0]))) {
            return
        }

        const {values} = this.state;

        this.setState({values: values.slice(0, index).concat(event.target.value.split('').length > 0 ? event.target.value.split('') : '').concat(values.slice(index + 1)).slice(0, 5)});
        console.log(values.slice(0, index).concat(event.target.value.split('').length > 0 ? event.target.value.split('') : '').concat(values.slice(index + 1)).slice(0, 5))

        if (index < 4 && event.target.value.length > 0) {
            this.state.refs[index + 1].current.focus();
        }
    }

    handleKeyDown(index, key) {
        if (key === 'Backspace' && this.state.values[index].length === 0) {
            this.state.refs[index - 1].current.focus();
        }
    }

    render() {
        const {t, theme} = this.context

        return <div className={css['theme--' + theme]}>
            <div className={css.root}>
                <span className={css.subtitle}>{t('verificationCode')}</span>

                <div className="flex justify-between" style={{gap: 4}}>
                    <input value={this.state.values[0]} ref={this.state.refs[0]}
                           onInput={e => this.handleInputFrom(0, e)} autoComplete={'one-time-code'}
                           autoFocus={true} type="text"/>
                    <input value={this.state.values[1]} ref={this.state.refs[1]}
                           onKeyDown={e => this.handleKeyDown(1, e.key)} onInput={e => this.handleInputFrom(1, e)}
                           maxLength={1} type="text"/>
                    <input value={this.state.values[2]} ref={this.state.refs[2]}
                           onKeyDown={e => this.handleKeyDown(2, e.key)} onInput={e => this.handleInputFrom(2, e)}
                           maxLength={1} type="text"/>
                    <input value={this.state.values[3]} ref={this.state.refs[3]}
                           onKeyDown={e => this.handleKeyDown(3, e.key)} onInput={e => this.handleInputFrom(3, e)}
                           maxLength={1} type="text"/>
                    <input value={this.state.values[4]} ref={this.state.refs[4]}
                           onKeyDown={e => this.handleKeyDown(4, e.key)} onInput={e => this.handleInputFrom(4, e)}
                           maxLength={1} type="text"/>
                </div>
            </div>
        </div>
    }
}
