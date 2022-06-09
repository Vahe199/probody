import React from "react";
import {GlobalContext} from "../contexts/Global.js";
import css from '../styles/articlecard.module.scss';
import PropTypes from "prop-types";
import Button from "./kit/Button.jsx";
import Link from "next/link.js";
import {DateTime} from "luxon";

export default class ArticleCard extends React.Component {
    static contextType = GlobalContext

    static propTypes = {
        title: PropTypes.string.isRequired,
        photos: PropTypes.arrayOf(PropTypes.string).isRequired,
        text: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
    }

    render() {
        const {theme, t} = this.context;

        return <div className={css['theme--' + theme]}>
            <div className={css.cardRoot}>
                <Link href={'/blog/' + this.props.slug}><img src={this.props.photos[0]} className={css.pic}/></Link>

                <div className={css.content}>
                    <div className="flex justify-between non-selectable">
                        <span className={css.caption}>
                            Тег новости
                        </span>
                        <span className={css.caption}>
                            {DateTime.fromISO(this.props.createdAt).toFormat('d MMM, y')}
                        </span>
                    </div>
                    <Link href={'/blog/' + this.props.slug}><h2>{this.props.title}</h2></Link>
                    <p style={{marginBottom: 12}}>{this.props.text}</p>
                    <Link href={'/blog/' + this.props.slug}><Button>{t('detail')}</Button></Link>
                </div>
            </div>
        </div>
    }
}
