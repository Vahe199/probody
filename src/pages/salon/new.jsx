import React from "react";
import {GlobalContext} from "../../contexts/Global.js";
import Stepper from "../../components/kit/Stepper.jsx";
import css from '../../styles/new.page.module.css';
import TextInput from "../../components/kit/Form/TextInput.jsx";
import Select from "../../components/kit/Form/Select.jsx";
import Collapsible from "../../components/kit/Collapsible.jsx";
import TextArea from "../../components/kit/Form/TextArea";
import RadioGroup from "../../components/kit/Form/RadioGroup";
import {capitalize, formatPrice} from "../../helpers/String";

export default class NewSalonPage extends React.Component {
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
                programs: []
            },
            prefetched: {
                regions: [
                    {
                        _id: 'ejkfneiu43i4un4',
                        name: 'Алматы'
                    },
                    {
                        _id: 'ejkfneid43i4un4',
                        name: 'Астана'
                    },
                    {
                        _id: 'ejkfnei43i4uf4',
                        name: 'Актобе'
                    },
                    {
                        _id: 'ejkfnei43i4uf7',
                        name: 'Актау'
                    }
                ]
            }
        }

        this.stepChangeHandler = this.stepChangeHandler.bind(this);
        this.setField = this.setField.bind(this);
        this.updatePrograms = this.updatePrograms.bind(this);
    }

    componentDidMount() {
        this.setState({//will be replaced with fetch
            model: {
                ...this.state.model,
                programs: [
                    {
                        _id: 'erfijoef5io4j9854j10',
                        name: 'Стандарт',
                        description: 'Стандартный программа для проведения красоты и здоровья',
                    },
                    {
                        _id: 'erfijoef5io4j9854j11',
                        name: 'Микс'
                    },
                    {
                        _id: 'erfijoef5io4j9854j12',
                        name: 'Ветка сакуры'
                    }
                ].map(i => ({...i, duration: 15, eroticCnt: 1, classicCnt: 1, relaxCnt: 1, enabled: false}))
            }
        })
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

    updatePrograms(id, index, field, val) {
        const newModel = {...this.state.model};

        console.log(id, index, field, val);

        if (newModel.programs[index]._id === id) {
            newModel.programs[newModel.programs.findIndex(program => program._id === id)][field] = val;
        } else {
            newModel.programs[index][field] = val;
        }

        this.setState({model: newModel})
    }

    render() {
        const {t, isMobile} = this.context;

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
                                 <Select options={this.state.prefetched.regions} label={t('city')}
                                         placeholder={t('inWhichCity')} value={this.state.model.region}
                                         onUpdate={(val) => this.setField('region', val)}/>
                                 <TextInput label={t('streetAndAddress')} placeholder={t('salonAddress')}
                                            value={this.state.model.address}
                                            onUpdate={(val) => this.setField('address', val)}/>
                                 <TextInput label={t('phone')} type={'phone'} placeholder={t('typeYourPhoneNumber')}
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
                         (<div>
                             <h2 style={{
                                 marginBottom: 16,
                                 marginTop: isMobile ? 0 : 32,
                                 padding: isMobile ? '0 16px' : 0
                             }}>{t('whichMassageTypesYouProvide')}</h2>

                             <div bp={'grid 12 6@md'}>
                                 {this.state.model.programs.map((program, i) =>
                                     <Collapsible defaultOpen={i === 0} selectable={true} key={i} value={this.state.model.programs[i].enabled} onUpdate={(state) => this.updatePrograms(program._id, i, 'enabled', state)}
                                                  title={program.name}>
                                         <div style={{marginTop: 12}}>
                                             <TextArea disabled
                                                       onUpdate={val => this.updatePrograms(program._id, i, 'description', val)}
                                                       value={this.state.model.programs[i].description}
                                                       label={t('description')} placeholder={t('tellAboutService')}/>
                                             <RadioGroup
                                                 onUpdate={val => this.updatePrograms(program._id, i, 'eroticCnt', val)}
                                                 value={this.state.model.programs[i].eroticCnt}
                                                 style={{marginTop: 12}}
                                                 name={capitalize(t('eroticMassage')) + ' (' + t('pc') + ')'}
                                                 options={[
                                                     {
                                                         label: 1,
                                                         value: 1
                                                     },
                                                     {
                                                         label: 2,
                                                         value: 2
                                                     },
                                                     {
                                                         label: '3+',
                                                         value: 3
                                                     }
                                                 ]}/>
                                             <RadioGroup
                                                 onUpdate={val => this.updatePrograms(program._id, i, 'classicCnt', val)}
                                                 name={capitalize(t('classicMassage')) + ' (' + t('pc') + ')'}
                                                 value={this.state.model.programs[i].classicCnt}
                                                 options={[
                                                     {
                                                         label: 1,
                                                         value: 1
                                                     },
                                                     {
                                                         label: 2,
                                                         value: 2
                                                     },
                                                     {
                                                         label: '3+',
                                                         value: 3
                                                     }
                                                 ]}/>
                                             <RadioGroup
                                                 onUpdate={val => this.updatePrograms(program._id, i, 'relaxCnt', val)}
                                                 name={capitalize(t('relaxMassage')) + ' (' + t('pc') + ')'}
                                                    value={this.state.model.programs[i].relaxCnt}
                                                 options={[
                                                     {
                                                         label: 1,
                                                         value: 1
                                                     },
                                                     {
                                                         label: 2,
                                                         value: 2
                                                     },
                                                     {
                                                         label: '3+',
                                                         value: 3
                                                     }
                                                 ]}/>
                                             <RadioGroup
                                                 onUpdate={val => this.updatePrograms(program._id, i, 'duration', val)}
                                                 name={capitalize(t('duration')) + ' (' + t('minutesShort') + ')'}
                                                    value={this.state.model.programs[i].duration}
                                                 options={[
                                                     {
                                                         label: '15',
                                                         value: 15
                                                     },
                                                     {
                                                         label: '30',
                                                         value: 30
                                                     },
                                                     {
                                                         label: '60',
                                                         value: 60
                                                     },
                                                     {
                                                         label: '90+',
                                                         value: 90
                                                     }
                                                 ]}/>
                                         </div>
                                         <TextInput onUpdate={val => this.updatePrograms(program._id, i, 'cost', val)}
                                                    value={this.state.model.programs[i].cost}
                                                    style={{marginBottom: 6}} label={t('massageCost') + ' (' + t('kzt') + ')'}
                                                    placeholder={t('from')} type={'number'}/>
                                     </Collapsible>
                                 )}
                             </div>
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
