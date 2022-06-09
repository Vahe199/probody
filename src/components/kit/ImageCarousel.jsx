import React from "react";
import PropTypes from "prop-types";
import css from '../../styles/kit/imagecarousel.module.scss';
import {cnb} from "cnbuilder";
import {GlobalContext} from "../../contexts/Global.js";

export default class ImageCarousel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentSlide: 0,
            slider: React.createRef()
        }
    }

    static contextType = GlobalContext

    static propTypes = {
        pics: PropTypes.arrayOf(PropTypes.string).isRequired,
    }

    setSlide(index) {
        this.setState({currentSlide: index})

        this.state.slider.current.style.transform = `translateX(-${index * 100}%)`
    }

    render() {
        const {theme} = this.context

        return <div className={css['theme--' + theme]}>
            <div className={cnb(this.props.className, 'overflow-hidden', 'relative')}>
                <div ref={this.state.slider} className={css.transformTransition}>
                    {this.props.pics.map((image, index) =>
                        <div className={css.slide} style={{
                            backgroundImage: `url(${this.props.pics[index]})`,
                            marginTop: index * -400,
                            marginLeft: index * 100 + '%',
                        }} key={index}>
                            &nbsp;
                        </div>
                    )}
                </div>
                <div className={css.navigation}>
                    {this.props.pics.map((image, index) =>
                        <div className={cnb(css.navigationItem, index === this.state.currentSlide ? css.current : '')} key={index}
                             onClick={() => this.setSlide(index)}>
                            &nbsp;
                        </div>
                    )}
                </div>
            </div>
        </div>
    }
}
