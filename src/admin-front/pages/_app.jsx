import '../styles/globals.scss'
import React from "react"
import AdminLayout from "../layouts/AdminLayout";

class ProbodyAdmin extends React.Component {
    render() {
        const {Component: Page, pageProps} = this.props

        return <AdminLayout>
            <Page {...pageProps} />
        </AdminLayout>
    }
}

export default React.memo(ProbodyAdmin)
