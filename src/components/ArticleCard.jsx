import React from "react";
import {GlobalContext} from "../contexts/Global.js";
import css from '../styles/articlecard.module.scss';
import PropTypes from "prop-types";
import Button from "./kit/Button.jsx";
import Link from "next/link.js";
import {DateTime} from "luxon";
import ImageCarousel from "./kit/ImageCarousel.jsx";

export default class ArticleCard extends React.Component {
    static contextType = GlobalContext

    static propTypes = {
        title: PropTypes.string.isRequired,
        photos: PropTypes.arrayOf(PropTypes.string).isRequired,
        text: PropTypes.string,
        slug: PropTypes.string.isRequired,
        single: PropTypes.bool,
        createdAt: PropTypes.string.isRequired,
    }

    static defaultProps = {
        single: false
    }

    render() {
        const {theme, t} = this.context;

        return <div className={css['theme--' + theme]}>
            <div className={css.cardRoot}>
                {!this.props.single ?
                    <Link href={'/blog/' + this.props.slug}><img src={this.props.photos[0]} className={css.pic}/></Link>
                    : <ImageCarousel pics={this.props.photos}/>}

                <div className={css.content}>
                    <div className="flex justify-between non-selectable">
                        <span className={css.caption}>
                            Тег новости
                        </span>
                        <span className={css.caption}>
                            {DateTime.fromISO(this.props.createdAt).toFormat('d MMM, y')}
                        </span>
                    </div>

                    {!this.props.single ? <Link href={'/blog/' + this.props.slug}><h2>{this.props.title}</h2></Link>
                        : <h1>{this.props.title}</h1>}

                    {this.props.text && <p style={{marginBottom: 12}}>{this.props.text}</p>}

                    {!this.props.single &&
                        <Link href={'/blog/' + this.props.slug}><Button>{t('detail')}</Button></Link>}
                </div>
            </div>
        </div>
    }
}
