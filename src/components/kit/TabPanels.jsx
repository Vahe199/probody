import {withRouter} from "next/router.js"
import css from '../../styles/kit/tabpanels.module.scss'
import React from "react"
import {GlobalContext} from "../../contexts/Global.js"
import PropTypes from "prop-types"

class TabPanels extends React.Component {
    static contextType = GlobalContext

    static propTypes = {
        head: PropTypes.object.isRequired,
        body: PropTypes.object.isRequired,
        tabKey: PropTypes.string.isRequired,
    }

    render() {
        const {theme} = this.context

        return <div className={css['theme--' + theme]}>
            <div id={this.props.tabKey} className={css.head}>
                {Object.keys(this.props.head).map((key, index) =>
                        this.props.head[key] && <div
                            onClick={() => this.props.router.push({hash: this.props.tabKey, query: Object.assign({}, this.props.router.query, {[this.props.tabKey]: key})}, undefined, {shallow: true})}
                            key={index}
                            className={(this.props.router.query[this.props.tabKey] === key || (!this.props.router.query[this.props.tabKey] && index === 0)) ? css.enabled : ''}>
                            {this.props.head[key].cnt !== undefined && <span className={css.cnt}>
                            {this.props.head[key].cnt}
                        </span>}
                            <span className={'va-middle'}>{this.props.head[key].title}</span>
                        </div>
                )}
            </div>
            <div className={css.body}>
                {this.props.body[this.props.router.query[this.props.tabKey] || Object.keys(this.props.body)[0]]}
            </div>
        </div>
    }
}

export default withRouter(TabPanels);
