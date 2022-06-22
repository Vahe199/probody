import React from "react";
import PropTypes from "prop-types";
import css from '../../styles/kit/imagecarousel.module.scss';
import {cnb} from "cnbuilder";
import {GlobalContext} from "../../contexts/Global.js";
import {withRouter} from "next/router.js";

class ImageCarousel extends React.Component {
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
        link: PropTypes.any,
    }

    setSlide(index) {
        this.setState({currentSlide: index})

        this.state.slider.current.style.transform = `translateX(-${index * 100}%)`
    }

    render() {
        const {theme, isMobile} = this.context

        const height = isMobile ? 250 : 350;

        return <div className={css['theme--' + theme]}>
            <div className={cnb(this.props.className, 'overflow-hidden', 'relative')} onClick={() => {

            }}>
                <div ref={this.state.slider} className={css.transformTransition}>
                    {this.props.pics.map((image, index) =>
                        <div className={css.slide} style={{
                            backgroundImage: `url(${this.props.pics[index]})`,
                            marginTop: index === 0 ? 0 : -height,
                            height,
                            marginLeft: index * 100 + '%',
                            cursor: this.props.link ? 'cursor' : 'zoom-in'
                        }} key={index}>
                            &nbsp;
                        </div>
                    )}
                </div>
                {this.props.pics.length > 1 && <div className={css.navigation}>
                    {this.props.pics.map((image, index) =>
                        <div className={cnb(css.navigationItem, index === this.state.currentSlide ? css.current : '')} key={index}
                             onClick={() => this.setSlide(index)}>
                            &nbsp;
                        </div>
                    )}
                </div>}
            </div>
        </div>
    }
}

export default withRouter(ImageCarousel);
