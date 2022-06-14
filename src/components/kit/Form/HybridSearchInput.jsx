import css from '../../../styles/kit/forms/hybrid-search-input.module.scss';
import React from "react";
import Icon from "../Icon.jsx";
import PropTypes from "prop-types";
import {cnb} from "cnbuilder";
import {GlobalContext} from "../../../contexts/Global.js";
import Select from "./Select";
import APIRequests from "../../../helpers/APIRequests.js";

export default class HybridSearchInput extends React.Component {
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
    }

    componentDidMount() {
        APIRequests.getRegions().then(async regions => {
            regions.unshift({
                name: this.context.t('entireKZ'),
            })

            // let userLocation
            //
            // ymaps.geolocation.get({
            //     // Зададим способ определения геолокации
            //     // на основе ip пользователя.
            //     provider: 'yandex',
            //     // Включим автоматическое геокодирование результата.
            //     mapStateAutoApply: true
            // }).then(function (result) {
            //     // Выведем результат геокодирования.
            //     console.log(result.geoObjects.get(0).properties.get('metaDataProperty.GeocoderMetaData.AddressDetails.Country.AdministrativeArea.SubAdministrativeArea.Locality.LocalityName'));
            // });
            //
            // try {
            //     // userLocation = (await window.ymaps.geolocation.get()).geoObjects.position
            //     console.log(window.ymaps.geolocation.city)
            // } catch (e) {
            //     userLocation = [43.2177019, 76.9441652]
            // }

            this.setState({
                regions: regions.map(r => ({_id: r.name, name: r.name})),
                geo: regions[1].name
            })
        })
    }

    render() {
        const {theme, t} = this.context;

        return <div className={css['theme--' + theme]}>
            <div className={cnb('flex', css.root)}>
                <div bp={'fill flex'} className={css.inputGroup}>
                    <Icon name={'search'}/>
                    <input bp={'fill'} type="text" value={this.state.search}
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
