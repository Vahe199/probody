import css from '../../../styles/kit/forms/hybrid-search-input.module.scss';
import React from "react";
import Icon from "../Icon.jsx";
import PropTypes from "prop-types";
import {cnb} from "cnbuilder";
import {GlobalContext} from "../../../contexts/Global.js";
import Select from "./Select";
import APIRequests from "../../../helpers/APIRequests.js";
import {withRouter} from "next/router.js";

class HybridSearchInput extends React.Component {
    static contextType = GlobalContext

    static propTypes = {
        searchPlaceholder: PropTypes.string.isRequired,
        geoPlaceholder: PropTypes.string.isRequired
    }

    constructor(props) {
        super(props);

        this.state = {
            search: '',
            regions: []
        }

        this.handleKeyPress = this.handleKeyPress.bind(this)
        this.setRegion = this.setRegion.bind(this)
    }

    componentDidMount() {
        if (this.props.router.query?.search) {
            this.setState({search: this.props.router.query.search})
        }

        APIRequests.getRegions().then(async regions => {
            regions.unshift({
                name: this.context.t('entireKZ'),
            })

            if (window.ymaps.geolocation) {
                window.ymaps.geolocation.get({
                    provider: 'yandex'
                }).then(result => {
                    const ipCoords = result.geoObjects.get(0).geometry.getCoordinates()

                    APIRequests.getNearestCity(ipCoords).then(async city => {
                        await this.setState({
                            regions: regions.map(r => ({_id: r.name, name: r.name})),
                            geo: this.props.router.query['filters[region]'] || (regions.findIndex(r => r.name === city) > -1 ? city : this.context.t('entireKZ'))
                        })

                        const newQuery = {}

                        if (!this.props.router.query['filters[region]']) {
                            newQuery['filters[region]'] = this.state.geo
                        }

                        this.props.router.push({
                            pathname: '/',
                            query: Object.assign({}, this.props.router.query, newQuery)
                        })
                    })
                });
            }
        })
    }

    async setRegion(region) {
        await this.setState({geo: region})

        this.handleKeyPress({key: 'Enter'})
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.props.router.push({
                pathname: '/',
                query: Object.assign({}, this.props.router.query, {
                    search: this.state.search,
                    'filters[region]': this.state.geo
                })
            })
        }
    }

    render() {
        const {theme, t} = this.context;

        return <div className={css['theme--' + theme]}>
            <div className={cnb('flex', css.root)}>
                <div bp={'fill flex'} className={css.inputGroup}>
                    <Icon name={'search'}/>
                    <input bp={'fill'} type="text" value={this.state.search} onKeyUp={this.handleKeyPress}
                           onChange={e => this.setState({search: e.target.value})}
                           placeholder={this.props.searchPlaceholder}/>
                    <div onClick={() => this.setState({search: ''})}><Icon name={'close'}/></div>
                </div>
                <div className={css.rightSplitter}>&nbsp;</div>
                <div className={cnb(css.inputGroup, 'flex')}>
                    <Icon name={'geo'}/>
                    <Select className={css.customSelect} label={''} options={this.state.regions}
                            placeholder={this.props.geoPlaceholder} value={this.state.geo}
                            onUpdate={val => this.setRegion(val)}/>
                    <div onClick={() => this.setRegion(t('entireKZ'))}><Icon name={'close'}/></div>
                </div>
            </div>
        </div>
    }
}

export default withRouter(HybridSearchInput);
