import React from "react";
import PropTypes from "prop-types";
import TextSection from "./TextSection.jsx";
import {cnb} from "cnbuilder";
import css from "../../styles/kit/socialblock.module.scss";
import {GlobalContext} from "../../contexts/Global.js";
import Link from "next/link.js";

class SocialBlock extends React.Component {
    static propTypes = {
        entities: PropTypes.shape({
            [PropTypes.string]: PropTypes.string
        }).isRequired
    }

    render() {
        const {t, theme} = this.context;
        console.log(theme);

        return <TextSection style={{paddingBottom: 0}}>
            <h3 style={{marginBottom: 12}}>{t('social')}</h3>
            <div className={cnb(css.socialBlock)}>
                {Object.keys(this.props.entities).map(name =>
                    <div key={name}>
                        <a target="_blank" href={this.props.entities[name]}>
                            <img src={'/icons/' + name + '_' + theme + '.svg'} alt={t(name)} />
                        </a>
                    </div>
                )}
            </div>
        </TextSection>
    }
}

SocialBlock.contextType = GlobalContext;

export default SocialBlock;
