import React from "react"
import PropTypes from "prop-types"
import css from '../../styles/kit/textsection.module.scss'
import {GlobalContext} from "../../contexts/Global.js";

class TextSection extends React.Component {
    lineHeight = 24

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            textRef: React.createRef()
        }
    }

    static propTypes = {
        lines: PropTypes.number,
        style: PropTypes.object
    }

    static defaultProps = {
        lines: 7,
        style: {}
    }

    render() {
        return (
            <section className={css.text} style={this.props.style}>
                <div ref={this.state.textRef} style={{
                    lineHeight: this.lineHeight + 'px',
                    maxHeight: this.state.isOpen ? this.state.textRef.current?.scrollHeight : this.lineHeight * this.props.lines
                }} className={this.state.isOpen ? css.expanded : ''}>
                    {this.props.children}
                </div>
                <a className={css.showMore} bp={this.state.isOpen ? 'hide' : ''} onClick={() => this.setState({isOpen: true})}>{this.context.t('showMore')}</a>
            </section>
        )
    }
}

TextSection.contextType = GlobalContext

export default TextSection
