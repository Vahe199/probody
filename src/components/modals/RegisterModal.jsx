import React from "react";
import {GlobalContext} from "../../contexts/Global.js";
import Icon from "../kit/Icon.jsx";
import css from '../../styles/kit/modal-content.module.scss';
import TextInput from "../kit/Form/TextInput";
import Button from "../kit/Button.jsx";
import {isValidPhoneNumber} from "libphonenumber-js";
import APIRequests from "../../helpers/APIRequests.js";
import {cnb} from "cnbuilder";

export default class RegisterModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            step: 0,
            phone: '+7',
            password: '',
            code: '',
            errors: {
                phone: '',
                password: '',
                code: ''
            }
        }

        this.setField = this.setField.bind(this)
        this.validateCredentials = this.validateCredentials.bind(this)
        this.signUp = this.signUp.bind(this)
    }

    static contextType = GlobalContext

    setField(field, value) {
        this.setState({
            [field]: value
        })
    }

    validateCredentials(field) {
        switch (field) {
            case 'phone':
                return isValidPhoneNumber(this.state.phone)
        }
    }

    async signUp() {
        await this.setState({
            errors: {
                phone: '',
                password: ''
            }
        })

        try {
            const response = await APIRequests.signUp(this.state.phone)

            if (!response.ok) {
                    this.setState({
                        errors: {
                            phone: this.context.t('phone_' + (await response.json()).message)
                        }
                    })
            } else {
                this.setState({
                    step: this.state.step + 1
                })
            }
        } catch (e) {
        }
    }

    render() {
        const {t, openModal, theme, isMobile} = this.context

        return <div className={css['theme--' + theme]}>
            <div className={cnb(css.modalHead, isMobile ? css.mobile : css.desktop)}>
                {(isMobile && this.state.step > 0) && <div>&nbsp;</div>}

                <h2>{t('registration')}</h2>

                <Icon name={'close'} onClick={() => openModal('')}/>
            </div>

            <div className={cnb(css.body, isMobile ? css.mobile : css.desktop)}>
                {this.state.step === 0 && <div>
                    <h1>{t('enterYourPhoneNumber')}</h1>
                    <p>{t('wellSendCodeThere')}</p>

                    <TextInput autoFocus error={this.state.errors.phone} style={{marginTop: 12}}
                               label={t('phoneNumber')}
                               placeholder={t('enterYourPhoneNumber')}
                               value={this.state.phone} onUpdate={val => this.setField('phone', val)} type={'phone'}
                               variant={'underline'}/>

                    <Button color={theme === 'dark' ? 'primary' : 'secondary'}
                            isDisabled={!this.validateCredentials('phone')}
                            style={{marginTop: 24}} onClick={this.signUp}
                            size={'fill'}>
                        <div className={'flex justify-between vertical-center'}>
                            <span>{t('getCode')}</span>
                            <Icon name={'arrow_right'} className={css.arrowRight}/>
                        </div>
                    </Button>
                </div>}
            </div>
        </div>
    }
}
