import React from "react"
import {withRouter} from "next/router"
import PersonalPageLayout from "../../layouts/secondary/PersonalPageLayout.jsx"
import {TITLE_POSTFIX} from "../../helpers/constants.js"
import Head from "next/head.js"
import {GlobalContext} from "../../contexts/Global.js"
import APIRequests from "../../helpers/APIRequests.js"
import css from '../../styles/pages/reviews.module.scss'
import ReviewBlock from "../../components/ReviewBlock";

class ReviewPage extends React.Component {
    static contextType = GlobalContext

    constructor(props) {
        super(props);

        this.state = {
            reviews: []
        }
    }


    componentDidMount() {
        APIRequests.getReviewsByUser().then(res => {
            this.setState({
                reviews: res.reviews
            })
        })
    }

    render() {
        const {t, theme, isMobile} = this.context

        return <div className={css['theme--' + theme]}>
            <Head>
                <title>{t('reviewsAndRating')}{TITLE_POSTFIX}</title>
            </Head>

            <PersonalPageLayout page={'reviews'}>
                <h1 className={css.salonReviews}>{t('salonReviews')} <span className={css.reviewCnt}>{this.state.reviews.length}</span></h1>

                <div bp={'grid 12 6@md'} style={{gap: isMobile ? 8 : 16}}>
                    {this.state.reviews.map((review, i) =>
                        <ReviewBlock {...review} key={i} />
                    )}
                </div>
            </PersonalPageLayout>
        </div>
    }
}

export default withRouter(ReviewPage)
