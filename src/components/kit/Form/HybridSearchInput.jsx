import css from '../../../styles/kit/forms/hybrid-search-input.module.scss';
import React from "react";
import Icon from "../Icon.jsx";
import PropTypes from "prop-types";

export default class HybridSearchInput extends React.Component {
    static propTypes = {
        searchPlaceholder: PropTypes.string.isRequired,
        geoPlaceholder: PropTypes.string.isRequired
    }

    constructor(props) {
        super(props);

        this.state = {
            geo: 'Алматы',
            search: ''
        }
    }

    render() {
        return <div className={css.root} bp={'flex'}>
            <div bp={'fill flex'} className={css.inputGroup}>
                <Icon name={'search'}/>
                <input bp={'fill'} type="text" value={this.state.search} onChange={e => this.setState({search: e.target.value})} placeholder={this.props.searchPlaceholder}/>
                <div onClick={() => this.setState({search: ''})}><Icon name={'close'}/></div>
            </div>
            <div className={css.rightSplitter}>&nbsp;</div>
            <div className={css.inputGroup} bp={'flex'}>
                <Icon name={'geo'}/>
                <input type="text" value={this.state.geo} onChange={e => this.setState({geo: e.target.value})} placeholder={this.props.geoPlaceholder}/>
                <div onClick={() => this.setState({geo: ''})}><Icon name={'close'}/></div>
            </div>
        </div>
    }
}
