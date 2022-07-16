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

export default class VacancyEditor extends React.Component {
    static contextType = GlobalContext

    constructor(props) {
        super(props);

        this.state = {
            vacancy: {
                salary: 0,
                experience: "",
                description: "",
                title: "",
                withdrawalType: [],
                withdrawalPeriod: [],
                phone: "+7",
                whatsapp: "+7",
                employment: [],
                salonTitle: "",
                salonAddress: "",
                pic: "",
                region: "",
                workSchedule: [],
                social: {
                    inst: '',
                    vk: '',
                    tgCh: '',
                    ws: '',
                }
            },
            regions: [],
            selectId: 'select-' + Numbers.random(0, 99999),
        }

        this.updateProp = this.updateProp.bind(this)
        this.initRegionSelect = this.initRegionSelect.bind(this)
        this.toggleCheckbox = this.toggleCheckbox.bind(this)
        this.updateSocial = this.updateSocial.bind(this)
    }

    componentDidMount() {
        if (this.props.editingVacancy) {
            APIRequests.getVacancy(this.props.editingVacancy).then(vacancy => {
                if (!vacancy.social) {
                    vacancy.social = {
                        inst: '',
                        vk: '',
                        tgCh: '',
                        ws: '',
                    }
                }

                this.setState({vacancy})
            })
        }

        this.initRegionSelect()
    }

    toggleCheckbox(name, value) {
        this.setState({
            vacancy: {
                ...this.state.vacancy,
                [name]: this.state.vacancy[name].includes(value) ? this.state.vacancy[name].filter(i => i !== value) : [...this.state.vacancy[name], value]
            }
        })
    }

    initRegionSelect() {
        if (this.state.regions.length) {
            return
        }

        const regions = UserHelper.regions()

        if (regions) {
            this.setState({
                regions
            })
        }
    }

    updateProp(name, value) {
        this.setState({
            vacancy: {
                ...this.state.vacancy,
                [name]: value
            }
        })
    }

    updateSocial(name, value) {
        this.setState({
            vacancy: {
                ...this.state.vacancy,
                social: {
                    ...this.state.vacancy.social,
                    [name]: value
                }
            }
        })
    }

    render() {
        const {t, theme, isMobile} = this.context

        return <div className={css['theme--' + theme]}>
            <div className="responsive-content" bp={'grid'}>
                <div bp={'12 3@md'} className={css.arrowBack} onClick={() => this.props.setView('vacancylist', '')}>
                    <Icon name={'arrow_left'}/>
                    <span>{t('toVacancies')}</span>
                </div>
                <h1 bp={'12 9@md'}
                    className={'bigger inline-flex items-center'}>{this.props.editingVacancy ? t('editingVacancy') : t('addingVacancy')}</h1>
            </div>

            <div className={cnb(css.vacancyList, css.dense)}>
                <div>
                    <div bp={'grid 12 6@md'} className={'responsive-content'} style={{gap: isMobile ? 16 : 32}}>
                        <div>
                            <TextInput style={{marginBottom: 16}} label={t('vacancyName')}
                                       placeholder={t('nameYourVacancy')} value={this.state.vacancy.title}
                                       onUpdate={val => this.updateProp('title', val)}/>
                            <TextArea lines={6} label={t('vacancyDescription')} placeholder={t('describeYourVacancy')}
                                      max={500} value={this.state.vacancy.description}
                                      onUpdate={val => this.updateProp('description', val)}/>
                        </div>
                        <div>
                            <p className={'subtitle2'} style={{marginBottom: 16}}>{t('vacancyPhoto')}</p>
                            <ImageInput url={this.state.vacancy.pic} onUpload={val => this.updateProp('pic', val)}/>
                        </div>
                    </div>
                </div>

                <div className={'responsive-content'}>
                    <p className={'subtitle2'} style={{marginBottom: 16}}>{t('salonInfo')}</p>

                    <div bp={'grid 12 6@md'} style={{gap: isMobile ? 16 : 32}}>
                        <div>
                            <TextInput style={{marginBottom: 16}} label={t('salonName')}
                                       placeholder={t('enterYourSalonName')} value={this.state.vacancy.salonTitle}
                                       onUpdate={val => this.updateProp('salonTitle', val)}/>

                            <TextInput style={{marginBottom: 16}} label={t('salonAddress')}
                                       placeholder={t('enterSalonAddress')} value={this.state.vacancy.salonAddress}
                                       onUpdate={val => this.updateProp('salonAddress', val)}/>

                            {this.state.regions.length &&
                                <Select label={t('city')} options={this.state.regions} id={this.state.selectId}
                                        placeholder={t('chooseCity')} value={this.state.regions.find(i => i._id === this.state.vacancy.region)?._id}
                                        onUpdate={val => this.updateProp('region', val)}/>}
                        </div>
                        <div>
                            <TextInput style={{marginBottom: 16}} label={t('phone')} type={'phone'}
                                       placeholder={'+7'} value={this.state.vacancy.phone}
                                       onUpdate={val => this.updateProp('phone', val)}/>

                            <TextInput style={{marginBottom: 16}} label={t('whatsapp')} type={'phone'}
                                       placeholder={'+7'} value={this.state.vacancy.whatsapp}
                                       onUpdate={val => this.updateProp('whatsapp', val)}/>
                        </div>
                    </div>
                </div>

                <div className={'responsive-content'}>
                    <p className={'subtitle2'} style={{marginBottom: 16}}>{t('socialMedia')}</p>

                    <div bp={'grid 12 6@md'} style={{gap: isMobile ? 16 : 32}}>
                        <div>
                            <TextInput style={{marginBottom: 16}} label={t('instagram')}
                                       placeholder={'https://instagram.com/'} value={this.state.vacancy.social.inst}
                                       onUpdate={val => this.updateSocial('inst', val)}/>

                            <TextInput label={t('vk')}
                                       placeholder={'https://vk.com/'} value={this.state.vacancy.social.vk}
                                       onUpdate={val => this.updateSocial('vk', val)}/>
                        </div>
                        <div>
                            <TextInput style={{marginBottom: 16}} label={t('site')}
                                       placeholder={'https://'} value={this.state.vacancy.social.ws}
                                       onUpdate={val => this.updateSocial('ws', val)}/>

                            <TextInput label={t('tgChannel')}
                                       placeholder={'https://t.me/'} value={this.state.vacancy.social.tgCh}
                                       onUpdate={val => this.updateSocial('tgCh', val)}/>
                        </div>
                    </div>
                </div>

                <div className={'responsive-content'}>
                    <p className={'subtitle2'} style={{marginBottom: 16}}>{t('employment')}</p>

                    <div className="flex wrap" style={{gap: isMobile ? 16 : 32}}>
                        {['full', 'part', 'temp'].map((name, i) =>
                            <Checkbox value={this.state.vacancy.employment.includes(name)} reverse name={t('employment_' + name) + ' ' + t('business')} onUpdate={() => this.toggleCheckbox('employment', name)} key={i} />
                        )}
                    </div>
                </div>

                <div className={'responsive-content'}>
                    <p className={'subtitle2'} style={{marginBottom: 16}}>{t('workSchedule')}</p>

                    <div className="flex wrap" style={{gap: isMobile ? 16 : 32}}>
                        {['flexible', 'period', 'contract', 'constant'].map((name, i) =>
                            <Checkbox value={this.state.vacancy.workSchedule.includes(name)} reverse name={t('schedule_' + name)} onUpdate={() => this.toggleCheckbox('workSchedule', name)} key={i} />
                        )}
                    </div>
                </div>

                <div className={'responsive-content'}>
                    <p className={'subtitle2'} style={{marginBottom: 16}}>{t('experience')}</p>

                    <div bp={'grid 12 6@md'} style={{gap: isMobile ? 16 : 32}}>
                        <RadioGroup options={['no', 'yes', 'nomatter'].map(i => ({label: t('workExperience_' + i), value: i}))} value={this.state.vacancy.experience} onUpdate={val => this.updateProp('experience', val)} />
                    </div>
                </div>

                <div>
                    <div bp={'grid 12 6@md'} className={'responsive-content'} style={{gap: isMobile ? 16 : '0 32px'}}>
                        <div>
                            <p className={'subtitle2'} style={{marginBottom: 16}}>{t('salary')}</p>

                            <TextInput style={{marginBottom: 16}} label={t('workerSalary') + ' (' + t('kzt') + ')'}
                                       placeholder={t('from')} value={this.state.vacancy.salary}
                                       onUpdate={val => this.updateProp('salary', val)}/>
                        </div>
                        <div>
                            <p className={'subtitle2'} style={{marginBottom: 16}}>{t('withdrawalType')}</p>

                            <div className="flex wrap" style={{gap: 16}}>
                                {['cash', 'card', 'other'].map((name, i) =>
                                    <Checkbox value={this.state.vacancy.withdrawalType.includes(name)} reverse name={t('withdrawal_' + name)} onUpdate={() => this.toggleCheckbox('withdrawalType', name)} key={i} />
                                )}
                            </div>
                        </div>
                        <div>
                            <p className={'subtitle2'} style={{marginBottom: 16}}>{t('withdrawalPeriod')}</p>

                            <div className="flex wrap" style={{gap: 16}}>
                                {['daily', 'weekly', 'monthly'].map((name, i) =>
                                    <Checkbox value={this.state.vacancy.withdrawalPeriod.includes(name)} reverse name={t('withdrawalPeriod_' + name)} onUpdate={() => this.toggleCheckbox('withdrawalPeriod', name)} key={i} />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{maxWidth: 350, marginTop: 32}} className={'responsive-content'}>
                <Button size={'fill'}>{this.props.editingVacancy ? t('saveVacancy') : t('addVacancy')}</Button>
            </div>
        </div>
    }
}
