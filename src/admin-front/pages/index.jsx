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

    render() {
        return <div>
            <button className={'btn btn-accent-violet'}>Admin Login</button>
        </div>
    }
}
