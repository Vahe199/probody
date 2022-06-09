import React from "react";
import PropTypes from "prop-types";
import css from '../../styles/kit/imagecarousel.module.scss';
import {cnb} from "cnbuilder";

export default class ImageCarousel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentSlide: 0,
        }
    }

    static propTypes = {
        pics: PropTypes.arrayOf(PropTypes.string).isRequired,
    }

    render() {
        return <div className={cnb('flex', this.props.className)}>
            {this.props.pics.map((image, index) =>
                <div key={index}>
                    <img className={css.pic} src={image} />
                </div>
            )}
        </div>
    }
}
