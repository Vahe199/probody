import React from "react";
import {GlobalContext} from "../../contexts/Global.js";
import Stepper from "../../components/kit/Stepper.jsx";
import css from '../../styles/new.page.module.css';
import TextInput from "../../components/kit/Form/TextInput.jsx";
import Select from "../../components/kit/Form/Select.jsx";

export default class New extends React.Component {
    static contextType = GlobalContext

    constructor(props) {
        super(props);

        this.state = {
            step: 0,
            model: {
                kind: '',
                name: '',
                region: '',
                phone: '+7',
                address: '',
            }
        }

        this.stepChangeHandler = this.stepChangeHandler.bind(this);
        this.setField = this.setField.bind(this);
    }

    stepChangeHandler(step) {
        this.setState({step})
    }

    setField(field, value) {
        this.setState({
            model: {
                ...this.state.model,
                [field]: value
            }
        })
    }

    render() {
        const {t} = this.context;

        return <div>
            <Stepper step={this.state.step} onStepChange={this.stepChangeHandler} title={t('addingSalon')}
                     steps={[
                         (<div className={css.stepBody}>
                             <h1>Шаг 1</h1>
                         </div>),
                         (<div className={css.stepBody}>
                             <h2>{t('fillCommonInfo')}</h2>
                             <div bp={'grid 12 6@md'}>
                                 <TextInput label={t('salonName')} placeholder={t('howYourSalonNamed')}
                                            value={this.state.model.name}
                                            onUpdate={(val) => this.setField('name', val)}/>
                                 <Select options={{
                                     'erfijoef5io4j9854j04': 'Алматы',
                                     'erfijoef5io4j9854j34': 'Астана',
                                     'erfijoef5io4j9854j05': 'Актау',
                                     'erfijoef5io4j9854j06': 'Актобе',
                                     'erfijoef5io4j9854j07': 'Атырау',
                                     'erfijoef5io4j9854j08': 'Караганда',
                                     'erfijoef5io4j9854j09': 'Костанай',
                                     'erfijoef5io4j9854j20': 'Кызылорда',
                                 }} label={t('city')} placeholder={t('inWhichCity')} value={this.state.model.region}
                                         onUpdate={(val) => this.setField('region', val)}/>
                                 <TextInput label={t('streetAndAddress')} placeholder={t('salonAddress')}
                                            value={this.state.model.address}
                                            onUpdate={(val) => this.setField('address', val)}/>
                                 <TextInput label={t('phone')} type={'phone'} placeholder={'typeYourPhoneNumber'}
                                            value={this.state.model.phone}
                                            onUpdate={(val) => this.setField('phone', val)}/>
                             </div>
                         </div>),
                         (<div className={css.stepBody}>
                             <h1>Шаг 3</h1>
                         </div>),
                         (<div className={css.stepBody}>
                             <h1>Шаг 4</h1>
                         </div>),
                         (<div className={css.stepBody}>
                             <h1>Шаг 5</h1>
                         </div>),
                         (<div className={css.stepBody}>
                             <h1>Шаг 6</h1>
                         </div>),
                         (<div className={css.stepBody}>
                             <h1>Шаг 7</h1>
                         </div>),
                         (<div className={css.stepBody}>
                             <h1>Шаг 8</h1>
                         </div>),
                         (<div className={css.stepBody}>
                             <h1>Шаг 9</h1>
                         </div>)
                     ]}/>
        </div>
    }
}
