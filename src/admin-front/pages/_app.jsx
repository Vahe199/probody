import '../styles/globals.scss'
import React, {useEffect, useState} from "react"
import AdminLayout from "../layouts/AdminLayout";
import UserHelper from "../helpers/UserHelper";
import AdminLoginPage from "./index";
import {useRouter} from "next/router";

function ProbodyAdmin(props) {
    const {Component: Page, pageProps} = props,
        router = useRouter(),
        [isLoggedIn, setLoggedIn] = useState(false)

    useEffect(() => setLoggedIn(UserHelper.isLoggedIn()), [router])

    return isLoggedIn ? <AdminLayout>
        <Page {...pageProps} />
    </AdminLayout> : <AdminLoginPage {...pageProps} />
}

export default React.memo(ProbodyAdmin)
