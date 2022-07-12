import React from "react"
import {withRouter} from "next/router"
import PersonalPageLayout from "../../layouts/secondary/PersonalPageLayout.jsx"
import {TITLE_POSTFIX} from "../../helpers/constants.js"
import Head from "next/head.js"
import {GlobalContext} from "../../contexts/Global.js"
import TextInput from "../../components/kit/Form/TextInput";
import Button from "../../components/kit/Button.jsx";
import APIRequests from "../../helpers/APIRequests.js";
import {formatIncompletePhoneNumber} from "libphonenumber-js";
import css from "../../styles/new.page.module.scss";
import Icon from "../../components/kit/Icon.jsx";
import Modal from "../../components/kit/Modal.jsx";
import Select from "../../components/kit/Form/Select";

class PersonalInfoPage extends React.Component {
    static contextType = GlobalContext

    constructor(props) {
        super(props);

        this.state = {
            personalInfo: {},
            staleData: {},
            successDialogOpen: false
        }

        this.saveInfo = this.saveInfo.bind(this)
        this.verifyEmail = this.verifyEmail.bind(this)
        this.closeSuccessDialog = this.closeSuccessDialog.bind(this)
    }

    componentDidMount() {
        APIRequests.getMe().then(personalInfo => {
            this.setState({personalInfo, staleData: personalInfo})
        })
    }

    verifyEmail() {
        APIRequests.verifyEmail(this.state.personalInfo.email).then(() => {
            this.setState({
                successDialogOpen: true
            })
        })
    }

    closeSuccessDialog() {
        this.setState({
            successDialogOpen: false
        })
    }

    saveInfo(field) {
        if (this.state.staleData[field] === this.state.personalInfo[field]) {
            return;
        }

        if (field === 'email') {
            if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.state.personalInfo[field])) {
                return
            }
        }

        APIRequests.updateAccountInfo(field, this.state.personalInfo[field])
    }

    render() {
        const {t} = this.context

        return <>
            <Head>
                <title>{t('personalInfo')}{TITLE_POSTFIX}</title>
            </Head>

            <Modal modalStyle={{maxWidth: 380, position: 'relative'}} open={this.state.dialogOpen}
                   onUpdate={this.closeSuccessDialog}>
                <div className={css.modalBody}>
                    <p>{t('cool')}</p>

                    <h1>{t('salonSentToModeration')}</h1>

                    <Button size={'fill'} onClick={this.closeSuccessDialog}>{t('toMainPage')}</Button>

                    <Icon name={'close'} className={css.modalClose} onClick={this.closeSuccessDialog}/>
                </div>
            </Modal>

            <PersonalPageLayout page={'personal'}>
                <h1 className={'bigger'} style={{marginBottom: 32}}>{t('profile')}</h1>

                <div className="flex column gap-12" style={{maxWidth: 400}}>
                    <TextInput value={this.state.personalInfo.paymentCode} label={t('login')} placeholder={''}
                               disabled/>
                    <Select value={this.state.personalInfo.internalRole} onUpdate={internalRole => {
                        this.setState({
                            personalInfo: {
                                ...this.state.personalInfo,
                                internalRole
                            }
                        })
                    }} label={t('role')} options={[
                        {
                            _id: 'owner',
                            name: t('role_owner')
                        },
                        {
                            _id: 'manager',
                            name: t('role_manager')
                        },
                        {
                            _id: 'admin',
                            name: t('role_admin')
                        },
                        {
                            _id: 'master',
                            name: t('role_master')
                        }
                    ]} placeholder={t('chooseFromList')} />
                    <TextInput value={formatIncompletePhoneNumber(this.state.personalInfo.phone || '', 'KZ')} disabled
                               label={t('phone')} placeholder={''}/>
                    <TextInput value={this.state.personalInfo.email} type={'email'} onUpdate={email => {
                        this.setState({
                            personalInfo: {
                                ...this.state.personalInfo,
                                email
                            }
                        })
                    }} lock={true} label={t('mail')}
                               placeholder={t('yourEMail')}/>

                    <Button style={{width: 335}} color={'secondary'} onClick={() => {
                        this.saveInfo('email')
                        this.saveInfo('internalRole')
                    }}>{t('save')}</Button>
                </div>
            </PersonalPageLayout>
        </>
    }
}

export default withRouter(PersonalInfoPage)
