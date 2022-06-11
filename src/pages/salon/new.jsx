import React from "react";
import {GlobalContext} from "../../contexts/Global.js";
import Stepper from "../../components/kit/Stepper.jsx";
import css from '../../styles/new.page.module.scss';
import TextInput from "../../components/kit/Form/TextInput.jsx";
import Select from "../../components/kit/Form/Select.jsx";
import Collapsible from "../../components/kit/Collapsible.jsx";
import TextArea from "../../components/kit/Form/TextArea";
import RadioGroup from "../../components/kit/Form/RadioGroup";
import {capitalize} from "../../helpers/String";
import Breadcrumbs from "../../components/kit/Breadcrumbs.jsx";
import {cnb} from "cnbuilder";
import Button from "../../components/kit/Button.jsx";
import {isValidNumber} from "libphonenumber-js";
import Icon from "../../components/kit/Icon.jsx";
import Checkbox from "../../components/kit/Form/Checkbox";
import RangeInput from "../../components/kit/Form/RangeInput";
import APIRequests from "../../helpers/APIRequests.js";

export default class NewSalonPage extends React.Component {
    static contextType = GlobalContext

    constructor(props) {
        super(props);

        this.state = {
            step: 2,
            model: {
                kind: 'salon',

                name: '',
                region: '',
                phone: '+7',
                address: '',

                programs: [],
                services: [],
                leads: [],
                rooms: 3,

                social: {
                    vk: '',
                    inst: '',
                    tgCh: '',
                    ws: ''
                },
                messengers: {
                    tg: '',
                    wa: ''
                }
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
                ],
                leads: [
                    {
                        _id: ("6291f742d269a9f2db961c09"),
                        name: 'Мужчинам',
                        icon: 'man'
                    },
                    {
                        _id: ("6291f74ed269a9f2db961c0a"),
                        name: 'Женщинам',
                        icon: 'woman'
                    },
                    {
                        _id: ("6291f760d269a9f2db961c0b"),
                        name: 'Парам',
                        icon: 'couple'
                    }
                ],
                services: [
                    {
                        _id: ("628f8a08662b0abe9636d8f7"),
                        name: 'Джакузи',
                        icon: 'jacuzzi'
                    },
                    {
                        _id: ("628f8a08662b0abe9636d8f8"),
                        name: 'Сауна',
                        icon: 'sauna'
                    },
                    {
                        _id: ("628f8a08662b0abe9636d8f9"),
                        name: 'Круглосуточно',
                        icon: 'roundclock'
                    },
                    {
                        _id: ("628f8a08662b0abe9636d8fa"),
                        name: 'Оплата картой',
                        icon: 'creditcard'
                    },
                    {
                        _id: ("628f8a08662b0abe9636d8fb"),
                        name: 'Kaspi red',
                        icon: 'kaspired'
                    },
                    {
                        _id: ("628f8a08662b0abe9636d8fc"),
                        name: 'Алкоголь',
                        icon: 'alcohol'
                    },
                    {
                        _id: ("628f8a08662b0abe9636d8fd"),
                        name: 'Кальян',
                        icon: 'hookah'
                    },
                    {
                        _id: ("628f8a08662b0abe9636d8fe"),
                        name: 'Зона для курения',
                        icon: 'cigarette'
                    }
                ]
            }
        }

        this.stepChangeHandler = this.stepChangeHandler.bind(this);
        this.setField = this.setField.bind(this);
        this.updatePrograms = this.updatePrograms.bind(this);
        this.validateStep = this.validateStep.bind(this);
        this.toggleLead = this.toggleLead.bind(this);
        this.toggleService = this.toggleService.bind(this);
        this.setSocialMedia = this.setSocialMedia.bind(this);
        this.setMessenger = this.setMessenger.bind(this);
    }

    async componentDidMount() {
        const programs = (await APIRequests.getPrograms()).map(i => ({...i, duration: 15, eroticCnt: 1, classicCnt: 1, relaxCnt: 1, enabled: false})),
            services = await APIRequests.getServices(),
            leads = await APIRequests.getLeads(),
            regions = await APIRequests.getRegions();

        this.setState({//will be replaced with fetch
            model: {
                ...this.state.model,
                programs
            },
            prefetched: {
                services,
                leads,
                regions
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

    toggleService(serviceId) {
        let services = this.state.model.services;

        if (services.includes(serviceId)) {
            services = services.filter(i => i !== serviceId);
        } else {
            services.push(serviceId);
        }

        this.setState({
            model: {
                ...this.state.model,
                services
            }
        })
    }

    toggleLead(leadId) {
        let leads = this.state.model.leads;

        if (leads.includes(leadId)) {
            leads = leads.filter(i => i !== leadId);
        } else {
            leads.push(leadId);
        }

        this.setState({
            model: {
                ...this.state.model,
                leads
            }
        })
    }

    validateStep(step) {
        let isValid = true

        switch (step) {
            case 0:
                if (this.state.model.name.length < 3 || this.state.model.name.length > 64) {
                    isValid = false
                    break
                }

                if (!this.state.model.region) {
                    isValid = false
                    break
                }

                if (this.state.model.address.length < 3 || this.state.model.address.length > 128) {
                    isValid = false
                    break
                }

                if (!isValidNumber(this.state.model.phone, 'KZ')) {
                    isValid = false
                    break
                }
                break;

            case 1:
                if (this.state.model.leads.length < 1) {
                    isValid = false
                    break
                }
                break

            case 2:
                if (!this.state.model.messengers.tg.length || !this.state.model.messengers.wa.length) {
                    isValid = false
                    break
                }

                if (!Object.values(this.state.model.social).some(Boolean)) {
                    isValid = false
                    break
                }

                if (this.state.model.social.inst.length >= 1 && !/^https:\/\/instagram\.com\//.test(this.state.model.social.inst)) {
                    isValid = false
                    break
                }

                if (this.state.model.social.vk.length >= 1 && !/^https:\/\/vk\.com\//.test(this.state.model.social.vk)) {
                    isValid = false
                    break
                }

                if (this.state.model.social.tgCh.length >= 1 && !/^https:\/\/t\.me\//.test(this.state.model.social.tgCh)) {
                    isValid = false
                    break
                }

                if (this.state.model.social.ws.length >= 1 && !/^https?:\/\//.test(this.state.model.social.ws)) {
                    isValid = false
                    break
                }
        }

        return !isValid
    }

    setMessenger(messenger, val) {
        this.setState({
            model: {
                ...this.state.model,
                messengers: {
                    ...this.state.model.messengers,
                    [messenger]: val
                }
            }
        })
    }

    setSocialMedia(socialMedia, val) {
        this.setState({
            model: {
                ...this.state.model,
                social: {
                    ...this.state.model.social,
                    [socialMedia]: val
                }
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
        const {t, isMobile, theme} = this.context;

        return <div className={css['theme--' + theme]}>
            <Breadcrumbs items={[
                {
                    name: t('mainPage'),
                    href: '/',
                },
                {
                    name: t('addingSalon'),
                    href: '/salon/new',
                },
            ]}/>
            {this.state.step === -1 ? <div className={css.stepBody}>
                <h2>{t('addingSalon')}</h2>
                <div bp={'grid 12 4@md'}>
                    <div onClick={() => this.setField('kind', 'salon')}
                         className={cnb('flex cursor-pointer justify-between vertical-center', css.secondLayer)}>
                        <div>
                            <h4>{t('salon')}</h4>
                            <p>{t('ifYouAreOrganization')}</p>
                        </div>
                        <div>
                            <div className={css.radioItem}>
                                <div
                                    className={cnb(css.radio, this.state.model.kind === 'salon' ? css.checked : '')}>&nbsp;</div>
                            </div>
                        </div>
                    </div>

                    <div onClick={() => this.setField('kind', 'master')}
                         className={cnb('flex cursor-pointer justify-between vertical-center', css.secondLayer)}>
                        <div>
                            <h4>{t('privateMaster')}</h4>
                            <p>{t('ifYouArePrivateSpec')}</p>
                        </div>
                        <div>
                            <div className={css.radioItem}>
                                <div
                                    className={cnb(css.radio, this.state.model.kind === 'master' ? css.checked : '')}>&nbsp;</div>
                            </div>
                        </div>
                    </div>
                </div>

                <Button className={css.proceedBtn} color={'secondary'}
                        onClick={() => this.stepChangeHandler(this.state.step + 1)}>
                    {t('pass')}
                    <Icon name={'arrow_right'}/>
                </Button>
            </div> : <Stepper step={this.state.step} title={t('addingSalon')}
                              steps={[
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
                                          <TextInput label={t('phone')} type={'phone'}
                                                     placeholder={t('typeYourPhoneNumber')}
                                                     value={this.state.model.phone}
                                                     onUpdate={(val) => this.setField('phone', val)}/>
                                      </div>

                                      <Button isDisabled={this.validateStep(0)} className={css.proceedBtn}
                                              color={'secondary'}
                                              onClick={() => this.stepChangeHandler(this.state.step + 1)}>
                                          {t('pass')}
                                          <Icon name={'arrow_right'}/>
                                      </Button>
                                  </div>),
                                  (<div className={css.stepBody}>
                                      <h2>{t('whichServicesYouProvide')}</h2>
                                      <div bp={'grid 12 4@md'} style={{gridGap: 45}}>
                                          <div>
                                              <h3 style={{marginBottom: 12}}>{t('services')}</h3>

                                              {this.state.prefetched.services.map((service, index) =>
                                                  <Checkbox style={{marginBottom: 12}} name={service.name} key={index}
                                                            onUpdate={() => this.toggleService(service._id)}
                                                            value={this.state.model.services.includes(service._id)}
                                                            icon={service.icon}/>
                                              )}
                                          </div>
                                          <div>
                                              <h3>{t('massageFor')}</h3>

                                              {this.state.prefetched.leads.map((lead, index) =>
                                                  <Checkbox style={{marginBottom: 12}} name={lead.name} key={index}
                                                            onUpdate={() => this.toggleLead(lead._id)}
                                                            value={this.state.model.leads.includes(lead._id)}
                                                            icon={lead.icon}/>
                                              )}

                                              <h3>{t('roomCnt')}</h3>

                                              <RangeInput max={20} onUpdate={val => this.setField('rooms', val)}
                                                          value={this.state.model.rooms}/>
                                          </div>
                                      </div>

                                      <Button isDisabled={this.validateStep(1)} className={css.proceedBtn}
                                              color={'secondary'}
                                              onClick={() => this.stepChangeHandler(this.state.step + 1)}>
                                          {t('pass')}
                                          <Icon name={'arrow_right'}/>
                                      </Button>
                                  </div>),
                                  (<div className={css.stepBody}>
                                      <h2>{t('fillContactInfo')}</h2>
                                      <div bp={'grid 12 4@md'} style={{gridGap: 45}}>
                                          <div>
                                              <h3 style={{marginBottom: 12}}>{t('socialMedia')}</h3>

                                              <TextInput style={{marginBottom: 12}} label={t('vkFull')} placeholder={'https://vk.com/'}
                                                         value={this.state.model.social.vk}
                                                         onUpdate={(val) => this.setSocialMedia('vk', val)}/>

                                              <TextInput style={{marginBottom: 12}} label={t('instagram')} placeholder={'https://instagram.com/'}
                                                         value={this.state.model.social.inst}
                                                         onUpdate={(val) => this.setSocialMedia('inst', val)}/>

                                              <TextInput style={{marginBottom: 12}} label={t('tgChannel')} placeholder={'https://t.me/'}
                                                         value={this.state.model.social.tgCh}
                                                         onUpdate={(val) => this.setSocialMedia('tgCh', val)}/>

                                              <TextInput label={t('site')} placeholder={'https://'}
                                                         value={this.state.model.social.ws}
                                                         onUpdate={(val) => this.setSocialMedia('ws', val)}/>
                                          </div>
                                          <div bp={'first last@md'}>
                                              <h3 style={{marginBottom: 12}}>{t('messengers')}</h3>

                                              <TextInput style={{marginBottom: 12}} label={t('tg')} placeholder={'@'}
                                                         value={this.state.model.messengers.tg}
                                                         onUpdate={(val) => this.setMessenger('tg', val)}/>

                                              <TextInput type={'phone'} label={t('whatsapp')} placeholder={'+7'}
                                                         value={this.state.model.messengers.wa}
                                                         onUpdate={(val) => this.setMessenger('wa', val)}/>
                                          </div>
                                      </div>

                                      <Button isDisabled={this.validateStep(2)} className={css.proceedBtn}
                                              color={'secondary'}
                                              onClick={() => this.stepChangeHandler(this.state.step + 1)}>
                                          {t('pass')}
                                          <Icon name={'arrow_right'}/>
                                      </Button>
                                  </div>),
                                  (<div>
                                      <h2 style={{
                                          marginBottom: 16,
                                          marginTop: isMobile ? 0 : 32,
                                          padding: isMobile ? '0 16px' : 0
                                      }}>{t('whichMassageTypesYouProvide')}</h2>

                                      <div bp={'grid 12 6@md'}>
                                          {this.state.model.programs.map((program, i) =>
                                              <Collapsible defaultOpen={i === 0} selectable={true} key={i}
                                                           value={this.state.model.programs[i].enabled}
                                                           onUpdate={(state) => this.updatePrograms(program._id, i, 'enabled', state)}
                                                           title={program.name}>
                                                  <div style={{marginTop: 12}}>
                                                      <TextArea disabled
                                                                onUpdate={val => this.updatePrograms(program._id, i, 'description', val)}
                                                                value={this.state.model.programs[i].description}
                                                                label={t('description')}
                                                                placeholder={t('tellAboutService')}/>
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
                                                  <TextInput
                                                      onUpdate={val => this.updatePrograms(program._id, i, 'cost', val)}
                                                      value={this.state.model.programs[i].cost}
                                                      style={{marginBottom: 6}}
                                                      label={t('massageCost') + ' (' + t('kzt') + ')'}
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
                              ]}/>}
        </div>
    }
}
