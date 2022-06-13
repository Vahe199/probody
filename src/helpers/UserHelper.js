export default class UserHelper {
    static logIn(jwt) {
        localStorage.setItem('authToken', jwt);
    }
}
