import React from "react";
import {GlobalContext} from "../../contexts/Global.js";
import Stepper from "../../components/kit/Stepper.jsx";
import css from '../../styles/new.page.module.css';
import TextInput from "../../components/kit/Form/TextInput.jsx";

export default class New extends React.Component {
    static contextType = GlobalContext

    constructor(props) {
        super(props);

        this.state = {
            step: 0,
        }

        this.stepChangeHandler = this.stepChangeHandler.bind(this);
    }

    stepChangeHandler(step) {
        this.setState({step})
    }

    render() {
        const {t} = this.context;

        return <div>
            <Stepper step={this.state.step} onStepChange={this.stepChangeHandler} title={t('addingSalon')}
                     steps={[
                         (<div className={css.stepBody}>
                             <h2>{t('fillCommonInfo')}</h2>
                             <div bp={'grid 12 6@md'}>
                                 <TextInput label={t('salonName')} placeholder={t('howYourSalonNamed')}/>
                             </div>
                         </div>),
                         (<div className={css.stepBody}>
                             <h1>Шаг 2</h1>
                         </div>),
                         (<div className={css.stepBody}>
                             <h1>Шаг 3</h1>
                         </div>),
                         (<div className={css.stepBody}>
                             <h1>Шаг 4</h1>
                         </div>),
                         (<div className={css.stepBody}>
                             <h1>Шаг 5</h1>
                         </div>),
                         (<div className={css.stepBody}>
                             <h1>Шаг 6</h1>
                         </div>),
                         (<div className={css.stepBody}>
                             <h1>Шаг 7</h1>
                         </div>),
                         (<div className={css.stepBody}>
                             <h1>Шаг 8</h1>
                         </div>),
                         (<div className={css.stepBody}>
                             <h1>Шаг 9</h1>
                         </div>)
                     ]}/>
        </div>
    }
}
