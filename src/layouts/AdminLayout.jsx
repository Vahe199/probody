import React from "react";

export default class AdminLayout extends React.Component {
    render() {
        return (
            <>
                {this.props.children}
            </>
        );
    }
}
