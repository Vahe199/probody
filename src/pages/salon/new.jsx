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
import ImageInput from "../../components/kit/Form/ImageInput";
import MockImageInput from "../../components/kit/Form/MockImageInput";

export default class NewSalonPage extends React.Component {
    static contextType = GlobalContext

    constructor(props) {
        super(props);

        this.state = {
            step: 5,
            model: {
                kind: 'salon',

                name: '',
                region: '',
                phone: '+7',
                address: '',

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
                },

                programs: [],

                workHours: {
                    from: '08:30',
                    to: '20:00',
                    roundclock: false
                },
                workDays: [],

                photos: [],
            },
            prefetched: {
                regions: [],
                leads: [],
                services: []
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
        this.updateWorkHours = this.updateWorkHours.bind(this);
        this.toggleWorkDay = this.toggleWorkDay.bind(this);
        this.addPhotoInput = this.addPhotoInput.bind(this);
        this.setPhoto = this.setPhoto.bind(this);
    }

    toggleWorkDay(day) {
        let workDays = this.state.model.workDays;

        if (workDays.includes(day)) {
            workDays = workDays.filter(i => i !== day);
        } else {
            workDays.push(day);
        }

        this.setState({
            model: {
                ...this.state.model,
                workDays
            }
        })
    }

    async componentDidMount() {
        const programs = (await APIRequests.getPrograms()).map(i => ({
                ...i,
                duration: 15,
                eroticCnt: 1,
                classicCnt: 1,
                relaxCnt: 1,
                enabled: false
            })),
            services = await APIRequests.getServices(),
            leads = await APIRequests.getLeads(),
            regions = await APIRequests.getRegions();

        programs.push({
            name: this.context.t('myVariant'),
            description: '',
            duration: 15,
            eroticCnt: 1,
            classicCnt: 1,
            relaxCnt: 1,
            enabled: false
        })

        this.setState({//will be replaced with fetch
            model: {
                ...this.state.model,
                programs,
                photos: Array(this.context.isMobile ? 5 : 3).fill(''),
            },
            prefetched: {
                services,
                leads,
                regions
            }
        })
    }

    addPhotoInput() {
        this.setState({
            model: {
                ...this.state.model,
                photos: [...this.state.model.photos, '']
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
                break

            case 3:
                const enabledPrograms = this.state.model.programs.filter(i => i.enabled)

                if (enabledPrograms.length < 1) {
                    isValid = false
                    break
                }

                if (!enabledPrograms.every(i => i.cost > 0 && i.description.length > 0 && i.name.length > 0)) {
                    isValid = false
                    break
                }
                break

            case 4:
                if (this.state.model.workDays.length === 0) {
                    isValid = false
                    break
                }
                break

            case 5:
                if (this.state.model.photos.every(i => i.length === 0)) {
                    isValid = false
                    break
                }
                break

            case 6:
                //validate master
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

    setPhoto(index, val) {
        this.setState({
            model: {
                ...this.state.model,
                photos: [...this.state.model.photos.slice(0, index), val, ...this.state.model.photos.slice(index + 1)]
            }
        })
    }

    updateWorkHours(workHours) {
        let newWorkHours = Object.assign({}, this.state.model.workHours, workHours);

        if (newWorkHours.from.replace(':', '') > newWorkHours.to.replace(':', '')) {
            let tmp = newWorkHours.to

            newWorkHours.to = newWorkHours.from
            newWorkHours.from = tmp
        }

        this.setState({
            model: {
                ...this.state.model,
                workHours: newWorkHours
            }
        })
    }

    updatePrograms(id, index, field, val) {
        const newModel = {...this.state.model};

        if (newModel.programs[index]._id === id) {
            newModel.programs[newModel.programs.findIndex(program => program._id === id)][field] = val;
        } else {
            newModel.programs[index][field] = val;
        }

        this.setState({model: newModel})
    }

    render() {
        const {t, isMobile, theme} = this.context;

        const workHours = ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
            '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30',
            '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30']
            .map(i => ({
                _id: i,
                name: i
            }))

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

                                              <TextInput style={{marginBottom: 12}} label={t('vkFull')}
                                                         placeholder={'https://vk.com/'}
                                                         value={this.state.model.social.vk}
                                                         onUpdate={(val) => this.setSocialMedia('vk', val)}/>

                                              <TextInput style={{marginBottom: 12}} label={t('instagram')}
                                                         placeholder={'https://instagram.com/'}
                                                         value={this.state.model.social.inst}
                                                         onUpdate={(val) => this.setSocialMedia('inst', val)}/>

                                              <TextInput style={{marginBottom: 12}} label={t('tgChannel')}
                                                         placeholder={'https://t.me/'}
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

                                      <div bp={'grid 12 6@md'} style={{gridGap: 30}}>
                                          <div className={'flex gap-12 column'}>
                                              {this.state.model.programs.filter(i => i._id).map((program, i) =>
                                                  <Collapsible defaultOpen={i === 0} selectable={true} key={i}
                                                               value={this.state.model.programs[i].enabled}
                                                               onUpdate={(state) => this.updatePrograms(program._id, i, 'enabled', state)}
                                                               title={program.name}>
                                                      <div style={{marginTop: 12}}>
                                                          <TextArea disabled={true}
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
                                          <div>
                                              {this.state.model.programs.map((program, i) => {
                                                  return program._id ? '' :
                                                      <Collapsible defaultOpen={i === 0} selectable={true} key={i}
                                                                   value={this.state.model.programs[i].enabled}
                                                                   onUpdate={(state) => this.updatePrograms('', i, 'enabled', state)}
                                                                   title={program.name}>
                                                          <div style={{marginTop: 12}}>
                                                              <TextInput
                                                                  style={{marginBottom: 12}}
                                                                  onUpdate={val => this.updatePrograms('', i, 'name', val)}
                                                                  value={this.state.model.programs[i].name}
                                                                  label={t('name')}
                                                                  placeholder={t('nameYourProgram')}/>

                                                              <TextArea
                                                                  onUpdate={val => this.updatePrograms('', i, 'description', val)}
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
                                              })}
                                          </div>
                                      </div>

                                      <Button isDisabled={this.validateStep(3)} className={css.proceedBtn}
                                              color={'secondary'}
                                              onClick={() => this.stepChangeHandler(this.state.step + 1)}>
                                          {t('pass')}
                                          <Icon name={'arrow_right'}/>
                                      </Button>
                                  </div>),
                                  (<div className={css.stepBody}>
                                      <h2 style={{margin: '24px 0'}}>{t('salonSchedule')}</h2>

                                      <div bp={'grid 12 6@md'} style={{gridGap: 45}}>
                                          <div>
                                              <h3 style={{marginBottom: 12}}>{t('workTime')}</h3>
                                              <div className="flex gap-12">
                                                  <Select disabled={this.state.model.workHours.roundclock}
                                                          value={this.state.model.workHours.from}
                                                          onUpdate={val => this.updateWorkHours({from: val})}
                                                          label={t('opening')} options={workHours} placeholder={''}/>
                                                  <Select disabled={this.state.model.workHours.roundclock}
                                                          value={this.state.model.workHours.to}
                                                          onUpdate={val => this.updateWorkHours({to: val})}
                                                          label={t('closing')}
                                                          options={workHours.slice(1 + workHours.findIndex(i => i.name === this.state.model.workHours.from))}
                                                          placeholder={''}/>
                                              </div>

                                              <div className={'flex'} style={{marginTop: 16}}>
                                                  <Checkbox value={this.state.model.workHours.roundclock}
                                                            onUpdate={() => this.updateWorkHours({roundclock: !this.state.model.workHours.roundclock})}/>
                                                  <span className={'non-selectable'}
                                                        onClick={() => this.updateWorkHours({roundclock: !this.state.model.workHours.roundclock})}
                                                        style={{
                                                            marginLeft: 12,
                                                            cursor: 'pointer'
                                                        }}>{t('roundclock')}</span>
                                              </div>
                                          </div>

                                          <div>
                                              <h3 style={{marginBottom: 12}}>{t('salonWorkDays')}</h3>

                                              <div className="flex wrap gap-12">
                                                  <Checkbox reverse value={this.state.model.workDays.includes('mon')}
                                                            name={t('mon')} onUpdate={() => this.toggleWorkDay('mon')}/>
                                                  <Checkbox reverse value={this.state.model.workDays.includes('tue')}
                                                            name={t('tue')} onUpdate={() => this.toggleWorkDay('tue')}/>
                                                  <Checkbox reverse value={this.state.model.workDays.includes('wed')}
                                                            name={t('wed')} onUpdate={() => this.toggleWorkDay('wed')}/>
                                                  <Checkbox reverse value={this.state.model.workDays.includes('thu')}
                                                            name={t('thu')} onUpdate={() => this.toggleWorkDay('thu')}/>
                                                  <Checkbox reverse value={this.state.model.workDays.includes('fri')}
                                                            name={t('fri')} onUpdate={() => this.toggleWorkDay('fri')}/>
                                                  <Checkbox reverse value={this.state.model.workDays.includes('sat')}
                                                            name={t('sat')} onUpdate={() => this.toggleWorkDay('sat')}/>
                                                  <Checkbox reverse value={this.state.model.workDays.includes('sun')}
                                                            name={t('sun')} onUpdate={() => this.toggleWorkDay('sun')}/>
                                              </div>
                                          </div>
                                      </div>

                                      <Button isDisabled={this.validateStep(4)} className={css.proceedBtn}
                                              color={'secondary'}
                                              onClick={() => this.stepChangeHandler(this.state.step + 1)}>
                                          {t('pass')}
                                          <Icon name={'arrow_right'}/>
                                      </Button>
                                  </div>),
                                  (<div className={css.stepBody}>
                                      <h2>{t('uploadSalonPhotos')}</h2>

                                      <div bp={'grid 6 3@md'}>
                                          {this.state.model.photos.map((photo, i) =>
                                              <ImageInput onUpload={url => this.setPhoto(i, url)} key={i}/>
                                          )}
                                          {this.state.model.photos.length < 12 && <MockImageInput onClick={this.addPhotoInput}/>}
                                      </div>

                                      <Button isDisabled={this.validateStep(5)} className={css.proceedBtn}
                                              color={'secondary'}
                                              onClick={() => this.stepChangeHandler(this.state.step + 1)}>
                                          {t('pass')}
                                          <Icon name={'arrow_right'}/>
                                      </Button>
                                  </div>),
                                  (<div className={css.stepBody}>
                                      <h2>добавление мастера</h2>

                                      <Button isDisabled={this.validateStep(6)} className={css.proceedBtn}
                                              color={'secondary'}
                                              onClick={() => this.stepChangeHandler(this.state.step + 1)}>
                                          {t('pass')}
                                          <Icon name={'arrow_right'}/>
                                      </Button>
                                  </div>),
                                  (<div className={css.stepBody}>
                                      <h2>повторная проверка</h2>

                                      <Button className={css.proceedBtn}
                                              color={'secondary'}
                                              onClick={() => this.stepChangeHandler(this.state.step + 1)}>
                                          {t('finish')}
                                          <Icon name={'arrow_right'}/>
                                      </Button>
                                  </div>)
                              ]}/>}
        </div>
    }
}
