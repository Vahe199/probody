import React from "react";
import APIRequests from "../../helpers/APIRequests.js";
import {TITLE_POSTFIX} from "../../helpers/constants.js";
import Head from "next/head.js";
import {GlobalContext} from "../../contexts/Global.js";
import Breadcrumbs from "../../components/kit/Breadcrumbs.jsx";
import css from "../../styles/salonview.module.scss";
import ImageCarousel from "../../components/kit/ImageCarousel.jsx";
import {cnb} from "cnbuilder";
import Icon from "../../components/kit/Icon.jsx";
import Link from "next/link.js";
import {withRouter} from "next/router.js";
import Button from "../../components/kit/Button.jsx";
import {parsePhoneNumber} from "libphonenumber-js";
import TextSection from "../../components/kit/TextSection.jsx";
import WeekView from "../../components/kit/WeekView";
import Dates from "../../helpers/Dates.js";
import Tag from "../../components/kit/Tag";
import TagCard from "../../components/kit/TagCard";

class SalonView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            salon: {
                photos: []
            },
            allPrograms: []
        }

        this.fetchWorkerInfo = this.fetchWorkerInfo.bind(this)
    }

    static contextType = GlobalContext

    componentDidMount() {
        if (!this.props.router.query.slug) {
            return
        }

        this.fetchWorkerInfo()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.router.query.slug !== this.props.router.query.slug) {
            this.fetchWorkerInfo()
        }
    }

    fetchWorkerInfo() {
        APIRequests.getWorker(this.props.router.query.slug).then(res => {
            this.setState({
                salon: res.worker[0],
                reviews: res.reviews[0],
                allPrograms: res.allPrograms
            })
        })
    }

    render() {
        const {t, theme, isMobile} = this.context
        const themeAccent = theme === 'dark' ? 'light' : 'dark'

        return <div className={css['theme--' + theme]}>
            <Head>
                <title>{this.state.salon.name || t('salon2')}{TITLE_POSTFIX}</title>
            </Head>

            <Breadcrumbs items={[
                {
                    name: t('mainPage'),
                    href: '/',
                },
                {
                    name: this.state.salon.name || t('salonView'),
                    href: '/salon/' + this.props.router.query.slug,
                },
            ]}/>

            <div bp={'grid'} style={{gridGap: 8}}>
                <div bp={'12 5@md'}>
                    <div className={css.cardRoot}>
                        <ImageCarousel pics={this.state.salon.photos}/>

                        {isMobile && <div className={css.padded}>
                            {this.state.salon.isVerified && <div className={cnb(css.caption, 'non-selectable')}>
                                <Icon name={'round_check'} className={css.verifiedIcon}/>

                                <span>{t('verified')}</span>
                            </div>}

                            <h1 className={'cursor-pointer'}>{this.state.salon.name}</h1>
                        </div>}
                    </div>

                    {!isMobile && <div style={{marginTop: 8}} className={cnb(css.padded, css.cardRoot)}>
                        {this.state.salon.description &&
                            <div className={css.textSectionDecorator}>
                                <TextSection style={{padding: 0}} lines={5}>
                                    {this.state.salon.description}
                                </TextSection>
                            </div>
                        }

                        {this.state.salon.phone && <div className={css.stretchContainer}>
                            <div><a href={'tel:' + parsePhoneNumber(this.state.salon.phone).number}>
                                <Button>
                                    <Icon name={'call'}/>
                                    {t('call')}
                                </Button>
                            </a></div>
                            <div><a target="_blank"
                                    href={'https://wa.me/' + parsePhoneNumber(this.state.salon.messengers.wa).number.replace('+', '') + '?text=' + encodeURIComponent(t('salonAnswerPrefill') + ' "' + this.state.salon.name + '"')}>
                                <Button color={'tertiary'}>
                                    <Icon name={'wa_light'}/>
                                    {t('sendMessage')}
                                </Button>
                            </a></div>
                        </div>}
                    </div>}
                </div>

                <div bp={'12 7@md'}>
                    <div className={css.cardRoot}>
                        {!isMobile && <div className={css.padded}>
                            {this.state.salon.isVerified && <div className={cnb(css.caption, 'non-selectable')}>
                                <Icon name={'round_check'} className={css.verifiedIcon}/>

                                <span>{t('verified')}</span>
                            </div>}

                            <div bp={'grid'}>
                                <h1 bp={'7'}
                                    className={'cursor-pointer'}>{this.state.salon.name}</h1>

                                <div bp={'5'} style={{paddingTop: 8}}
                                     className="flex justify-end gap-12">
                                    {this.state.reviews ? <div className={css.avgRating}>
                                        <Icon name={'star'}/>
                                        <span>{this.state.reviews.avg || '–'}</span>
                                    </div> : <div>&nbsp;</div>}

                                    <Button size={'small'}>{t('onTheMap')}</Button>
                                </div>
                            </div>
                        </div>}

                        <div bp={'grid'}>
                            <div bp={'12 7@md'} className={cnb(css.padded, css.shortInfoBlock)}>
                                <div>
                                    <div>{t('address').toLowerCase()}</div>
                                    <div>{this.state.salon.address}</div>
                                </div>

                                <div>
                                    <div>{t('city').toLowerCase()}</div>
                                    <div>{this.state.salon.region?.name}</div>
                                </div>

                                {this.state.reviews && <div>
                                    <div>{t('reviews').toLowerCase()}</div>
                                    <Link href={'rr'}>
                                        <div
                                            className={css.linkUnderline}>{this.state.reviews.count || 0} отзывов
                                        </div>
                                    </Link>
                                </div>}

                                {this.state.reviews && <div bp={'hide@md'}>
                                    <div className={css.avgRating}>
                                        <Icon name={'star'}/>
                                        <span>{this.state.reviews.avg}</span>
                                    </div>

                                    <div><Button size={'small'}>{t('onTheMap').toLowerCase()}</Button>
                                    </div>
                                </div>}
                            </div>

                            <div bp={'5 show@md hide'}>
                                <div className={'flex align-end justify-end fit'}
                                     style={{paddingBottom: 16, paddingRight: 16}}>
                                    <div style={{marginTop: 16}} className={css.socialBlock}>
                                        {Object.keys(this.state.salon.social || []).filter(i => this.state.salon.social[i].length).map(name =>
                                            <div key={name}>
                                                <a target="_blank" href={this.state.salon.social[name]}>
                                                    <img
                                                        src={'/icons/' + name + '_' + themeAccent + '.svg'}
                                                        alt={t(name)}/>
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {this.state.salon.workHours && <div bp={'grid'} style={{marginTop: 8}} className={cnb(css.cardRoot, css.padded)}>
                        <div bp={'12 6@md'} className={css.shortInfoBlock}>
                            <div>
                                <div>{t('workSchedule').toLowerCase()}</div>
                                <div>{this.state.salon.workHours.roundclock ? t('roundclock') : this.state.salon.workHours?.from + '-' + this.state.salon.workHours?.to}</div>
                            </div>

                            <div>
                                <div>{t('status').toLowerCase()}</div>
                                <div>{Dates.isOpen(this.state.salon.workDays, this.state.salon.workHours) ? t('opened') : t('closed')}</div>
                            </div>
                        </div>

                        <div bp={'12 6@md'}>
                            <WeekView enabledDays={this.state.salon.workDays || []} />
                        </div>
                    </div>}

                    <div bp={'grid'} style={{marginTop: 8}}>
                        <div bp={'12 8@md'} className={cnb(css.padded)}>
                            {this.state.salon.services &&
                                <div>
                                    <p className="subtitle2" style={{marginBottom: 16}}>{t(this.state.salon.kind + 'ServiceAndServices')}</p>

                                    <div className="flex wrap" style={{gap: 4}}>
                                        {this.state.salon.leads.map((lead, i) =>
                                            <Tag key={i} icon={lead.icon} label={lead.name} />
                                        )}
                                        {this.state.salon.services.map((service, i) =>
                                            <Tag key={i} icon={service.icon} label={service.name} />
                                        )}
                                    </div>
                                </div>
                            }
                        </div>

                        <div bp={'12 4@md'}>
                            <TagCard title={t('avgCostLong')} value={this.state.salon.avgCost} dark={true} link={'fff'} />
                            <TagCard title={t('roomCount')} value={this.state.salon.rooms} dark={true} link={'fff'} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}

export default withRouter(SalonView);
