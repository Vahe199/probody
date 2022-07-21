import React from "react";
import {GlobalContext} from "../../contexts/Global.js";

export default class RaiseArchive extends React.Component {
    static contextType = GlobalContext

    constructor(props) {
        super(props);

        this.state = {}
    }

    render() {
        const {t, theme, isMobile} = this.context

        return <div className={css['theme--' + theme]}>
            raise archive
        </div>
    }
}
