const API_URL = 'https://probody.kz/v1';
// const API_URL = 'http://0.0.0.0:4119/v1';
const PAGE_SIZES = {
    MAIN: 5,
    MAIN_MAP: 15,
    REVIEWS: 3
};

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

    static async top3Masters() {
        return (await fetch(`${API_URL}/worker/top3`)).json()
    }

    static async createReview(salonId, service, massage, interior, name, text) {
        if (name.length === 0) {
            name = 'Гость'
        }

        return (await fetch(`${API_URL}/review/${salonId}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                service, massage, interior, name, text
            })
        })).json()
    }

    static async getReviewsByUser() {
        return (await fetch(`${API_URL}/review/my`)).json()
    }

    static async getMapWorker(workerId) {
        return (await fetch(`${API_URL}/worker/${workerId}/map`)).json()
    }

    static async getReviewStats() {
        return (await fetch(`${API_URL}/review`)).json()
    }

    static async getFAQ() {
        return (await fetch(`${API_URL}/faq`, {
            headers: APIRequests.withCredentials()
        })).json()
    }

    static async getFAQQuality(id) {
        return (await fetch(`${API_URL}/faq/${id}/quality`)).json()
    }

    static async answerQuestion(id, isUseful, text) {
        return (await fetch(`${API_URL}/faq/${id}`, {
            headers: APIRequests.withCredentials({
                'Content-Type': 'application/json'
            }),
            method: 'POST',
            body: JSON.stringify({
                isUseful, text
            })
        })).json()
    }

    static async getLeads() {
        return (await fetch(`${API_URL}/lead`)).json()
    }

    static async getRegions() {
        return (await fetch(`${API_URL}/region`)).json()
    }

    static async getWorker(slug) {
        return (await fetch(`${API_URL}/worker/${slug}`)).json()
    }

    static async getReviews(id, page = 1) {
        return (await fetch(`${API_URL}/review/${id}?page=${page}&limit=${PAGE_SIZES.REVIEWS}`)).json()
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

    static getSuggestedWorkers(slug) {
        return fetch(`${API_URL}/worker/${slug}/suggestions`).then(res => res.json())
    }

    static logOut() {
        fetch(`https://probody.kz/auth/logout`, {
            method: 'POST',
            headers: APIRequests.withCredentials()
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
        if (model.kind === 'master') {
            model = Object.assign(model, model.masters[0])

            delete model.masters
        }

        return fetch(`${API_URL}/worker`, {
            method: 'POST',
            headers: APIRequests.withCredentials({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(model)
        })
    }

    static searchWorkers(page = 1, query = '', filters = {}, onlyCount = false) {
        if (filters.kind === 'all') {
            delete filters.kind
        }

        if (filters.region === 'Казахстан') {
            delete filters.region
        }

        return fetch(`${API_URL}/search/worker?page=${page}&limit=${filters.coords ? PAGE_SIZES.MAIN_MAP : PAGE_SIZES.MAIN}&onlyCount=${onlyCount}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({query, filters})
        }).then(res => res.json())
    }

    static getNearestCity(coords) {
        // return fetch(`https://api.rasp.yandex.net/v3.0/nearest_settlement/?apikey=${YANDEX_RASP_KEY}&lat=${coords[0]}&lng=${coords[1]}`).then(res => res.json()).then(res => 'Караганда')
        return new Promise(resolve => resolve('Астана'))
    }
}
