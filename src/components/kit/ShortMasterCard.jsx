import React from "react";
import css from '../../styles/kit/mc.module.scss'
import Icon from "./Icon.jsx";
import PropTypes from "prop-types";

export default class ShortMasterCard extends React.Component {
    static propTypes = {
        pic: PropTypes.string.isRequired,
        photoCnt: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
    }

    render() {
        return <div
            style={{backgroundImage: 'linear-gradient(45deg, rgba(0,0,0,1) 0%, rgba(255,255,255,1) 30%, rgba(255,255,255,1) 70%, rgba(0,0,0,1) 100%), url(' + this.props.pic + ')'}}
            className={css.root}>
            <div>
                <Icon name={'camera'}/>
                {this.props.photoCnt}
            </div>
            <div>
                {this.props.name}
            </div>
        </div>
    }
}
