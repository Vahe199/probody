import css from '../../../styles/kit/forms/hybrid-search-input.module.scss';
import React from "react";
import Icon from "../Icon.jsx";
import PropTypes from "prop-types";
import {cnb} from "cnbuilder";
import {GlobalContext} from "../../../contexts/Global.js";
import Select from "./Select";
import APIRequests from "../../../helpers/APIRequests.js";
import {withRouter} from "next/router.js";
import ControlledInput from "./ControlledInput.jsx";
import Numbers from "../../../helpers/Numbers.js";

class HybridSearchInput extends React.Component {
    static contextType = GlobalContext

    static propTypes = {
        searchPlaceholder: PropTypes.string.isRequired,
        geoPlaceholder: PropTypes.string.isRequired
    }

    constructor(props) {
        super(props);

        this.state = {
            regions: [],
            myRegion: '',
        }

        this.setRegion = this.setRegion.bind(this)
        this.handleKeyUp = this.handleKeyUp.bind(this)
        this.clearQuery = this.clearQuery.bind(this)
    }

    componentDidUpdate() {
        if (!this.props.router.query.region && this.state.myRegion) {
            this.props.router.push({
                query: Object.assign({}, this.props.router.query, {
                    region: this.state.myRegion,
                })
            })
        }
    }

    componentDidMount() {
        APIRequests.getRegions().then(regions => {
            regions.unshift({
                name: this.context.t('entireKZ'),
            })

            this.setState({
                regions: regions.map(r => ({_id: r.name, name: r.name}))
            })

            // if (window.ymaps.geolocation) {
            //     window.ymaps.geolocation.get({
            //         provider: 'yandex'
            //     }).then(result => {
            //         const ipCoords = result.geoObjects.get(0).geometry.getCoordinates()
            //
            //         APIRequests.getNearestCity(ipCoords).then(async city => {
            //             const geo = this.props.router.query['region'] || (regions.findIndex(r => r.name === city) > -1 ? city : this.context.t('entireKZ'))
            //             const newQuery = {}
            //
            //             if (!this.props.router.query['region']) {
            //                 newQuery['region'] = geo
            //             }
            //
            //             this.props.router.push({
            //                 query: Object.assign({}, this.props.router.query, newQuery)
            //             })
            //
            //             this.setState({
            //                 myRegion: city
            //             })
            //         })
            //     });
            // } else {
                this.setState({
                    myRegion: this.context.t('entireKZ')
                })
            // }
        })
    }

    async setRegion(region) {
        this.props.router.push({
            // pathname: '/',
            query: Object.assign({}, this.props.router.query, {
                region,
            })
        })
    }

    async clearQuery() {
        this.props.router.push({
            query: Object.assign({}, this.props.router.query, {
                search: '',
            })
        })
    }

    handleKeyUp(e) {
        if (e.key === 'Enter') {
            this.props.router.push({pathname: '/', query: this.props.router.query})
        }
    }

    render() {
        const {theme, t} = this.context;
        const inputId = 'text-input-' + Numbers.random(0, 99999),
            selectId = 'select-' + Numbers.random(0, 99999)

        return <div className={css['theme--' + theme]}>
            <div className={cnb('flex', css.root)}>
                <label htmlFor={inputId} bp={'fill flex'} className={css.inputGroup} style={{paddingLeft: 16}}>
                        <Icon name={'search'}/>
                        <ControlledInput id={inputId} bp={'fill'} type="text" value={this.props.router.query.search}
                                         onKeyUp={this.handleKeyUp}
                                         onChange={e => this.props.router.push({query: Object.assign({}, this.props.router.query, {search: e.target.value, page: 1})})}
                                         placeholder={this.props.searchPlaceholder}/>
                        <div onClick={this.clearQuery}><Icon name={'close'}/></div>
                </label>
                <div className={css.rightSplitter}>&nbsp;</div>
                <div className={cnb(css.inputGroup, 'flex')} style={{paddingRight: 16}} onClick={() => window.document.getElementById(selectId).click()}>
                        <Icon name={'geo'}/>
                        {this.state.regions.length &&
                            <Select className={css.customSelect} label={''} options={this.state.regions} id={selectId}
                                    placeholder={this.props.geoPlaceholder} value={this.props.router.query.region}
                                    onUpdate={val => this.setRegion(val)}/>}
                        <div onClick={() => this.setRegion(t('entireKZ'))}><Icon name={'close'}/></div>
                </div>
            </div>
        </div>
    }
}

export default withRouter(HybridSearchInput);
