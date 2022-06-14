import React from "react";
import {GlobalContext} from "../../contexts/Global.js";
import css from '../../styles/kit/paginator.module.scss';
import Button from "./Button.jsx";
import PropTypes from "prop-types";
import Icon from "./Icon.jsx";
import {cnb} from "cnbuilder";

export default class Paginator extends React.Component {
    static contextType = GlobalContext

    static propTypes = {
        page: PropTypes.number.isRequired,
        pageCnt: PropTypes.number,
        onChange: PropTypes.func
    }

    render() {
        const {theme, t} = this.context

        const pages = [];

        for (let i = 1; i <= this.props.pageCnt; i++) {
            pages.push(i);
        }

        return <div className={css['theme--' + theme]} style={this.props.style}>
            <div className="flex justify-between" style={{gap: 6}}>
                <div>
                    <Button isDisabled={this.props.page === 1} className={css.btn} onClick={() => this.props.onChange(this.props.page - 1)} color={'tertiary'}>
                        <Icon name={'arrow_left'} style={{width: 18, height: 12, marginRight: 8}} />
                        {t('backward')}
                    </Button>
                </div>
                <div className={cnb(css.pageList, theme === 'dark' ? css.bgSecondlayer : css.bgTertiary)}>
                    {pages.map(page =>
                        <div onClick={() => this.props.onChange(page)} key={page} className={cnb(css.page, page === this.props.page ? css.current : '')}>{page}</div>
                    )}
                </div>
                <div>
                    <Button isDisabled={this.props.page === this.props.pageCnt} className={css.btn} onClick={() => this.props.onChange(this.props.page + 1)} color={'tertiary'}>
                        {t('forward')}
                        <Icon name={'arrow_right'} style={{width: 18, height: 12, marginLeft: 8}} />
                    </Button>
                </div>
            </div>
        </div>
    }
}
