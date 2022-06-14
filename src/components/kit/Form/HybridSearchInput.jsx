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
    }

    componentDidMount() {
        APIRequests.getRegions().then(async regions => {
            regions.unshift({
                name: this.context.t('entireKZ'),
            })

            this.setState({
                regions: regions.map(r => ({_id: r.name, name: r.name})),
                geo: this.context.t('entireKZ')
            })

            if (window.ymaps.geolocation) {
                window.ymaps.geolocation.get({
                    provider: 'yandex'
                }).then(result => {
                    const ipCoords = result.geoObjects.get(0).geometry.getCoordinates()

                    APIRequests.getNearestCity(ipCoords).then(city => {
                        this.setState({
                            geo: regions.findIndex(r => r.name === city) > -1 ? city : this.context.t('entireKZ')
                        })
                    })
                });
            }
        })
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            console.log(this.state)
            this.props.router.push({
                pathname: '/',
                query: {
                    search: this.state.search,
                    'filters[region]': this.state.geo === this.context.t('entireKZ') ? undefined : this.state.geo
                }
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
                            onUpdate={val => this.setState({geo: val})}/>
                    <div onClick={() => this.setState({geo: t('entireKZ')})}><Icon name={'close'}/></div>
                </div>
            </div>
        </div>
    }
}

export default withRouter(HybridSearchInput);
