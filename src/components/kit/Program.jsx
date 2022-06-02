import React from "react";
import PropTypes from "prop-types";
import InfoBlock from "./InfoBlock";
import css from '../../styles/kit/program.module.scss'
import {GlobalContext} from "../../contexts/Global.js";
import Button from "./Button.jsx";
import Icon from "./Icon.jsx";
import {cnb} from "cnbuilder";

class Program extends React.Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        duration: PropTypes.number.isRequired,
        classicCnt: PropTypes.number.isRequired,
        eroticCnt: PropTypes.number.isRequired,
        relaxCnt: PropTypes.number.isRequired
    }

    render() {
        const {t} = this.context

        return <InfoBlock style={{maxWidth: 400}}>
            <p className="subtitle2" style={{marginBottom: 16}}>{this.props.title}</p>
            <p>{this.props.description}</p>
            <ul className={css.massageList}>
                <li>{this.props.eroticCnt}&nbsp;{t('eroticMassage')}</li>
                <li>{this.props.classicCnt}&nbsp;{t('classicMassage')}</li>
                <li>{this.props.relaxCnt}&nbsp;{t('relaxMassage')}</li>
            </ul>
            <div style={{
                borderBottom: '1px solid #616161',
                width: '100%',
                marginBottom: 16,
                height: 0,
            }}>&nbsp;</div>
            <div className={cnb('flex', 'justify-between', css.secondSection)}>
                <div>
                    <div className={'items-center'} style={{marginBottom: 12}}>
                        <Icon style={{width: 20, height: 20, marginRight: 5, marginLeft: -3}} name={'clock'}/>
                        <p className={'subtitle2 number-font'}>{this.props.duration}&nbsp;{t('minutesShort')}</p>
                    </div>
                    <div className={'items-center'}>
                        <Icon style={{width: 14, height: 14, marginRight: 8}} name={'kzt'} />
                        <p className={'subtitle2 number-font'}>{this.props.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</p>
                    </div>
                </div>
                <div className={css.flexEnd}>
                    <Button size={'medium'}>{t('apply')}</Button>
                </div>
            </div>
        </InfoBlock>
    }
}
Program.contextType = GlobalContext

export default Program
