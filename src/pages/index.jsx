import React from "react"
import Button from "../components/kit/Button.jsx";

export default class Home extends React.Component {
  render() {
    return (
        <div>
          Привет
            <Button size={'medium'} iconLeft={'couple'}>Зарегистрироваться</Button>
        </div>
    );
  }
}