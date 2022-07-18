import React from "react";
import {GlobalContext} from "../contexts/Global.js";
import PropTypes from "prop-types";
import InfoBlock from "./kit/InfoBlock";
import TextInput from "./kit/Form/TextInput";
import TextArea from "./kit/Form/TextArea";
import Button from "./kit/Button.jsx";
import APIRequests from "../helpers/APIRequests.js";
import {isValidNumber} from "libphonenumber-js";

export default class ContactUs extends React.Component {
    static contextType = GlobalContext

    static propTypes = {
        single: PropTypes.bool
    }

    constructor(props) {
        super(props);

        this.state = {
            phone: '+7',
            messageText: '',
            successDialogOpen: false
        }

        this.sendMessage = this.sendMessage.bind(this)
        this.validateInputs = this.validateInputs.bind(this)
    }

    validateInputs() {
        return this.state.messageText.length !== 0 && isValidNumber(this.state.phone);
    }

    sendMessage() {
        if (!this.validateInputs()) {
            return
        }

        APIRequests.leaveSupportMessage(this.state.phone, this.state.messageText).then(() => this.setState({
            phone: '+7',
            messageText: '',
            successDialogOpen: true
        }))
    }

    render() {
        const {t, isMobile} = this.context
        return <div bp={'grid'} className={'responsive-content'}>
            <div bp={'12 8@md'} style={{maxWidth: isMobile ? 'unset' : "calc(100% - 135px)"}}>
                <h1 className={'text-xl'} style={{marginBottom: 12}}>{this.props.single ? t('wellBeHappyToHearYou') : t('ifYouHaveQuestions')}</h1>
                <p style={{marginBottom: 32}} className={'text-disabled'}>{t('pleaseSelectMessageChannel')}</p>

                <InfoBlock>
                    fred
                </InfoBlock>
            </div>
            <div bp={'12 4@md'}>
                <h2 className="subtitle2" style={{marginBottom: 8}}>{t('rapidConnection')}</h2>
                <p className={'text-disabled'} style={{marginBottom: 16}}>{t('wellContactYou')}</p>
                <TextInput style={{marginBottom: 12}} label={t('yourPhoneNumber')} placeholder={''} type={'phone'} value={this.state.phone} onUpdate={phone => this.setState({phone})} />
                <TextArea label={t('message')} max={200} placeholder={t('enterMessageText')} type={'phone'} value={this.state.messageText} onUpdate={messageText => this.setState({messageText})} />

                <Button size={'large'} style={{marginTop: 16}} onClick={this.sendMessage}>{t('sendMessageLong')}</Button>
            </div>
        </div>
    }
}
