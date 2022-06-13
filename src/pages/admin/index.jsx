import React from "react";

export default class AdminLoginPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
            error: '',
        };
    }

    static layout = 'Admin';

    render() {
        return <div>
            <h1>Admin Login</h1>
        </div>
    }
}
