import React from "react";
import css from '../../../styles/kit/forms/imageinput.module.scss';
import Numbers from "../../../helpers/Numbers.js";
import Button from "../Button.jsx";
import PropTypes from "prop-types";

export default class ImageInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            imageURI: ''
        }

        this.handleChange = this.handleChange.bind(this);
    }

    static propTypes = {
        onChange: PropTypes.func
    }

    readURI(e) {
        if (e.target.files && e.target.files[0]) {
            let reader = new FileReader();
            reader.onload = function (ev) {
                this.setState({imageURI: ev.target.result});
            }.bind(this);
            reader.readAsDataURL(e.target.files[0]);
        }
    }

    handleChange(e){
        this.readURI(e); // maybe call this with webworker or async library?
        if (this.props.onChange !== undefined)
            this.props.onChange(e); // propagate to parent component
    }

    render() {
        const inputId = 'image-input-' + Numbers.random(0, 99999),
            inputRef = React.createRef()

        return <label className={'inline-block relative'} htmlFor={inputId}>
            <div className={css.root}>
                {this.state.imageURI ? <img className={css.thumb} src={this.state.imageURI} /> : ' '}
            </div>

            <Button className={this.state.imageURI ? css.edit : css.plus} focus={false} size={'x-small'} iconLeft={this.state.imageURI ? 'edit' : 'plus'} mapClick={inputRef}/>

            <input onChange={this.handleChange} ref={inputRef} type='file' id={inputId} className={'d-none'}/>
        </label>
    }
}
