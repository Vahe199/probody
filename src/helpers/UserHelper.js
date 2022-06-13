export default class UserHelper {
    static logIn(jwt) {
        localStorage.setItem('authToken', jwt);
    }

    static isLoggedIn() {
        return !!window.localStorage.getItem('authToken')?.length
    }
}
