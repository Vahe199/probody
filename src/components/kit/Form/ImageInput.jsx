import React from "react";
import css from '../../../styles/kit/forms/imageinput.module.scss';
import Numbers from "../../../helpers/Numbers.js";
import Button from "../Button.jsx";
import PropTypes from "prop-types";
import {GlobalContext} from "../../../contexts/Global.js";
import {cnb} from "cnbuilder";
import APIRequests from "../../../helpers/APIRequests.js";

export default class ImageInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            preview: '',
            uploaded: false,
        }

        this.handleChange = this.handleChange.bind(this);
    }

    static contextType = GlobalContext

    static propTypes = {
        onUpload: PropTypes.func.isRequired
    }

    handleChange(e) {
        if (e.target.files && e.target.files[0]) {
            let reader = new FileReader();
            this.setState({uploaded: false});

            reader.onload = function (ev) {
                this.setState({preview: ev.target.result});
            }.bind(this);

            reader.readAsDataURL(e.target.files[0]);

            APIRequests.uploadPic(e.target.files[0]).then(res => {
                const newImageURL = 'https://probody.kz/pic/' + res

                this.setState({uploaded: true, preview: newImageURL});
                this.props.onUpload(newImageURL);
            })
        }
    }

    render() {
        const inputId = 'image-input-' + Numbers.random(0, 99999),
            inputRef = React.createRef(),
            {theme} = this.context

        return <div className={cnb(css['theme--' + theme], 'grid')}>
            <label className={'inline-block relative'} htmlFor={inputId}>
                <div className={css.root}>
                    {this.state.preview ? <img className={cnb(css.thumb, this.state.uploaded ? '' : css.uploading)}
                                               src={this.state.preview}/> : ' '}
                </div>

                <Button className={this.state.preview ? css.edit : css.plus} focus={false} size={'x-small'}
                        iconLeft={this.state.preview ? 'edit' : 'plus'} mapClick={inputRef}/>

                <input accept="image/png, image/jpg, image/jpeg" onChange={this.handleChange} ref={inputRef} type='file'
                       id={inputId} className={'d-none'}/>
            </label>
        </div>
    }
}
