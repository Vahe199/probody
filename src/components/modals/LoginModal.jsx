import React from "react";
import {GlobalContext} from "../../contexts/Global.js";
import Icon from "../kit/Icon.jsx";
import css from '../../styles/kit/modal-content.module.scss';
import TextInput from "../kit/Form/TextInput";
import Button from "../kit/Button.jsx";
import {isValidPhoneNumber} from "libphonenumber-js";
import APIRequests from "../../helpers/APIRequests.js";

export default class LoginModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            phone: '+7',
            password: '',
        }

        this.setField = this.setField.bind(this)
        this.validateCredentials = this.validateCredentials.bind(this)
        this.logIn = this.logIn.bind(this)
    }

    static contextType = GlobalContext

    setField(field, value) {
        this.setState({
            [field]: value
        })
    }

    validateCredentials() {
        return isValidPhoneNumber(this.state.phone) && this.state.password.length >= 6
    }

    async logIn() {
        try {
            await APIRequests.logIn(this.state.phone, this.state.password)
        } catch (e) {
            console.log('invalid credentials')
        }
    }

    render() {
        const {t, openModal, theme} = this.context

        return <div className={css['theme--' + theme]}>
            <div className={css.modalHead}>
                <h2>{t('toLogIn')}</h2>

                <Icon name={'close'} onClick={() => openModal('')}/>
            </div>

            <div className={css.body}>
                <h1>{t('enterYourCredentials')}</h1>
                <p>{t('forAuth')}</p>

                <TextInput style={{marginTop: 12}} label={t('phoneNumber')} placeholder={t('enterYourPhoneNumber')}
                           value={this.state.phone} onUpdate={val => this.setField('phone', val)} type={'phone'}
                           variant={'underline'}/>
                <TextInput style={{marginTop: 12}} label={t('password')} placeholder={t('enterYourPassword')}
                           value={this.state.password} onUpdate={val => this.setField('password', val)}
                           type={'password'} variant={'underline'}/>
                <p onClick={() => openModal('forgotPassword')} className={css.hint}>{t('qForgotPassword')}</p>

                <Button color={theme === 'dark' ? 'primary' : 'secondary'} isDisabled={!this.validateCredentials()}
                        style={{marginTop: 24}} onClick={this.logIn}
                        size={'fill'}>
                    <div className={'flex justify-between vertical-center'}>
                        <span>{t('logInFull')}</span>
                        <Icon name={'arrow_right'} className={css.arrowRight}/>
                    </div>
                </Button>

                <div style={{marginTop: 16}}>
                    <p className={css.caption}>{t('qDontHaveAccount')}</p>
                    <p className={'cursor-pointer'} onClick={() => openModal('register')}>{t('register')}</p>
                </div>
            </div>
        </div>
    }
}
