import React from "react";
import APIRequests from "../../helpers/APIRequests.js";
import {withRouter} from "next/router.js";
import {TITLE_POSTFIX} from "../../helpers/constants.js";
import Head from "next/head.js";
import {GlobalContext} from "../../contexts/Global.js";

class SalonView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            salon: {},
            slaves: []
        }
    }

    static contextType = GlobalContext

    componentDidMount() {
        if (!this.props.router.query.slug) {
            return
        }

        APIRequests.getWorker(this.props.router.query.slug).then(res => {
            this.setState({
                salon: res.worker,
                slaves: res.slaves
            })
        })
    }

    render() {
        const {t} = this.context

        return <div>
            <Head>
                <title>{this.state.salon.name || t('salon2')}{TITLE_POSTFIX}</title>
            </Head>

                <h1>Salon View</h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Pellentesque euismod, nisi vel consectetur euismod,
                </p>
            </div>
    }
}

export default withRouter(SalonView);
