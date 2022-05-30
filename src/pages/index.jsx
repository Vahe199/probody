import React from "react"
import {withRouter} from "next/router.js"
import {GlobalContext} from "../contexts/Global.js"

class Home extends React.Component {
  render() {
    const {router} = this.props,
        {t} = this.context

    return (
        <div>
            <p className="subtitle additional-text">{t('greet')} 👋</p>
          <h1>Мы подобрали массажные салоны в Алматы</h1>
            <p className="subtitle additional-text">Привет 👋</p>
            <h1>Мы подобрали массажные салоны в Алматы</h1>
            <p className="subtitle additional-text">Привет 👋</p>
            <h1>Мы подобрали массажные салоны в Алматы</h1>
            <p className="subtitle additional-text">Привет 👋</p>
            <h1>Мы подобрали массажные салоны в Алматы</h1>
            <p className="subtitle additional-text">{t('greet')} 👋</p>
            <h1>Мы подобрали массажные салоны в Алматы</h1>
            <p className="subtitle additional-text">Привет 👋</p>
            <h1>Мы подобрали массажные салоны в Алматы</h1>
            <p className="subtitle additional-text">Привет 👋</p>
            <h1>Мы подобрали массажные салоны в Алматы</h1>
            <p className="subtitle additional-text">Привет 👋</p>
            <h1>Мы подобрали массажные салоны в Алматы</h1>
            <p className="subtitle additional-text">Привет 👋</p>
            <h1>Мы подобрали массажные салоны в Алматы</h1>
            <p className="subtitle additional-text">Привет 👋</p>
            <h1>Мы подобрали массажные салоны в Алматы</h1>
            <p className="subtitle additional-text">Привет 👋</p>
            <h1>Мы подобрали массажные салоны в Алматы</h1>
            <p className="subtitle additional-text">Привет 👋</p>
            <h1>Мы подобрали массажные салоны в Алматы</h1>
            <p className="subtitle additional-text">Привет 👋</p>
            <h1>Мы подобрали массажные салоны в Алматы</h1>
            <p className="subtitle additional-text">Привет 👋</p>
            <h1>Мы подобрали массажные салоны в Алматы</h1>
            <p className="subtitle additional-text">Привет 👋</p>
            <h1>Мы подобрали массажные салоны в Алматы</h1>
            <p className="subtitle additional-text">Привет 👋</p>
            <h1>Мы подобрали массажные салоны в Алматы</h1>
            <p className="subtitle additional-text">Привет 👋</p>
            <h1>Мы подобрали массажные салоны в Алматы</h1>
            <p className="subtitle additional-text">Привет 👋</p>
            <h1>Мы подобрали массажные салоны в Алматы</h1>
            <p className="subtitle additional-text">Привет 👋</p>
            <h1>Мы подобрали массажные салоны в Алматы</h1>
            <p className="subtitle additional-text">Привет 👋</p>
        </div>
    );
  }
}
Home.contextType = GlobalContext

export default withRouter(Home);
