const API_URL = 'https://probody.kz/v1';
const PAGE_SIZE = 10;

export default class APIRequests {
    static async getPrograms() {
        return (await fetch(`${API_URL}/program`)).json()
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
}
