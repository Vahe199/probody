import React, {useEffect, useState} from "react";
import UserHelper from "../helpers/UserHelper";
import {useRouter} from "next/router";
import APIRequests from "../../helpers/APIRequests";

export default function AdminLoginPage() {
    const router = useRouter()
    const [validationErrors, setValidationErrors] = useState({
        phone: '',
        password: ''
    })

    const [credentials, setCredentials] = useState({
        phone: '',
        password: ''
    })

    useEffect(() => {
        if (UserHelper.isLoggedIn() && router.pathname === '/') {
            router.push('/workers')
        }
    }, [router])

    async function logIn() {
        setValidationErrors({
            phone: '',
            password: ''
        })

        try {
            const response = await APIRequests.logIn(credentials.phone, credentials.password)

            if (response.type === 'Error') {
                if (response.field === 'password') {
                    this.setState({
                            ...validationErrors,
                            password: 'Неверный пароль'
                        })
                } else {
                    this.setState({
                        errors: {
                            ...this.state.errors,
                            phone: 'Аккаунт не найден'
                        }
                    })
                }
            } else {
                UserHelper.logIn(response.jwt)

                router.push('/workers')
            }
        } catch (e) {
        }
    }

    return <div>
        <form onSubmit={e => {
            e.preventDefault()
            logIn()
        }}>
            <h4>Вход в личный кабинет</h4>
            <input type="text" value={credentials.phone} onInput={e => setCredentials({
                ...credentials,
                phone: e.target.value
            })} placeholder={'phone'}/>
            <br/>
            <input type="password" value={credentials.password} onInput={e => setCredentials({
                ...credentials,
                password: e.target.value
            })} placeholder={'password'}/>
            <button type={'submit'}>log in</button>
        </form>
    </div>
}
