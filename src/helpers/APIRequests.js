const API_URL = 'https://probody.kz/v1';
// const API_URL = 'http://0.0.0.0:4119/v1';
const PAGE_SIZE = 10;

export default class APIRequests {
    static async getPrograms() {
        return (await fetch(`${API_URL}/program`)).json()
    }

    static withCredentials(headers) {
        return {
            'X-Auth-Token': localStorage.getItem('authToken'),
            ...headers
        }
    }

    static async getServices() {
        return (await fetch(`${API_URL}/service`)).json()
    }

    static async getLeads() {
        return (await fetch(`${API_URL}/lead`)).json()
    }

    static async getRegions() {
        return (await fetch(`${API_URL}/region`)).json()
    }

    static async uploadPic(file, asReplacementFor = undefined) {
        const formData = new FormData();

        formData.append('pic', file);

        return fetch(`https://probody.kz/pic`, {
            method: 'POST',
            headers: APIRequests.withCredentials({
                'X-Replacement-For': asReplacementFor
            }),
            body: formData
        })
    }

    static getFilters() {
        return fetch(`${API_URL}/search/filter`).then(res => res.json())
    }

    static async logIn(phone, password) {
        return (await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                phone,
                password
            })
        })).json()
    }

    static async signUp(phone) {
        return fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                phone
            })
        })
    }

    static async changePassword(phone, code, password) {
        return fetch(`${API_URL}/auth/update-password`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                phone,
                code,
                password
            })
        })
    }

    static async requestPasswordReset(phone) {
        return fetch(`${API_URL}/auth/request-reset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                phone
            })
        })
    }

    static async verifyCode(phone, code) {
        return fetch(`${API_URL}/auth/checkcode`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                phone,
                code
            })
        })
    }

    static async verifyResetCode(phone, code) {
        return fetch(`${API_URL}/auth/checkcode/reset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                phone,
                code
            })
        })
    }

    static async approveAccount(phone, code, password) {
        return fetch(`${API_URL}/auth/approve`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                phone,
                code,
                password
            })
        })
    }

    static resendCode(phone, target) {
        return fetch(`${API_URL}/auth/resend-sms`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                phone,
                target
            })
        })
    }

    static async createWorker(model) {
        return fetch(`${API_URL}/worker`, {
            method: 'POST',
            headers: APIRequests.withCredentials({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(model)
        })
    }

    static searchWorkers(page = 1, query = {}) {
        return fetch(`${API_URL}/search/worker?page=${page}&limit=${PAGE_SIZE}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({query})
        }).then(res => res.json())
    }
}
