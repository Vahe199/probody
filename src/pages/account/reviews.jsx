import React from "react"
import {withRouter} from "next/router"
import PersonalPageLayout from "../../layouts/secondary/PersonalPageLayout.jsx"
import {TITLE_POSTFIX} from "../../helpers/constants.js"
import Head from "next/head.js"
import {GlobalContext} from "../../contexts/Global.js"
import APIRequests from "../../helpers/APIRequests.js";

class ReviewPage extends React.Component {
    static contextType = GlobalContext

    constructor(props) {
        super(props);

        this.state = {
            reviews: []
        }
    }


    componentDidMount() {
        APIRequests.getReviewsByUser().then(rev => {
            console.log(rev)
        })
    }

    render() {
        const {t} = this.context

        return <>
            <Head>
                <title>{t('reviewsAndRating')}{TITLE_POSTFIX}</title>
            </Head>

            <PersonalPageLayout page={'reviews'}>
                reviews & rating
            </PersonalPageLayout>
        </>
    }
}

export default withRouter(ReviewPage)
