import React from "react";
import {GlobalContext} from "../../contexts/Global.js";
import APIRequests from "../../helpers/APIRequests.js";
import css from '../../styles/pages/personal.vacancy.module.scss'
import Icon from "../kit/Icon.jsx";
import TextInput from "../kit/Form/TextInput";
import TextArea from "../kit/Form/TextArea";
import ImageInput from "../kit/Form/ImageInput";
import Button from "../kit/Button.jsx";
import {cnb} from "cnbuilder";
import Select from "../kit/Form/Select.jsx";
import Numbers from "../../helpers/Numbers.js";
import UserHelper from "../../helpers/UserHelper.js";
import Checkbox from "../kit/Form/Checkbox";
import RadioGroup from "../kit/Form/RadioGroup";
import {isValidPhoneNumber} from "libphonenumber-js";
import Modal from "../kit/Modal.jsx";

export default class Raises extends React.Component {
    static contextType = GlobalContext

    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        const {t, theme} = this.context

        return <div className={css['theme--' + theme]}>
            {/*<Modal open={this.state.savedDialogOpen} isMobile={false} desktopWidth={375}*/}
            {/*       onUpdate={this.closeSuccessDialog}>*/}
            {/*    <div>*/}
            {/*        <div className={css.modalBody}>*/}
            {/*            <p>{t('cool')}</p>*/}

            {/*            <h1>{t('youEditedVacancy')}</h1>*/}

            {/*            <p style={{paddingTop: 16}}>{t('itWillAppearAfterModeration')}</p>*/}

            {/*            <Button size={'fill'} onClick={this.closeSuccessDialog}>{t('returnToPA')}</Button>*/}

            {/*            <Icon name={'close'} className={css.modalClose} onClick={this.closeSuccessDialog}/>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</Modal>*/}

            <div className="responsive-content" bp={'grid'}>
                <div bp={'12 3@md'} className={css.arrowBack} onClick={() => this.props.setView('vacancylist', '')}>
                    <Icon name={'arrow_left'}/>
                    <span>{t('toSalon')}</span>
                </div>
                <h1 bp={'12 9@md'}
                    className={'bigger inline-flex items-center'}>{t('addingVacancy')}</h1>
            </div>
        </div>
    }
}
