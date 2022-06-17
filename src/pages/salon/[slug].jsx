import React from "react";
import APIRequests from "../../helpers/APIRequests.js";
import {withRouter} from "next/router.js";

class SalonView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            salonInfo: {}
        }
    }

    componentDidMount() {
        APIRequests.getWorker(this.props.router.query.slug).then(salon => {
            this.setState({
                salonInfo: salon
            })
        })
    }

    render() {
        return <div>
                <h1>Salon View</h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Pellentesque euismod, nisi vel consectetur euismod,
                </p>
            </div>
    }
}

export default withRouter(SalonView);
