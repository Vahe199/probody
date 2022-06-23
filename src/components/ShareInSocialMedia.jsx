import React from "react";
import {cnb} from "cnbuilder";
import css from "../styles/about-us.module.scss";
import InfoBlock from "./kit/InfoBlock.jsx";
import {GlobalContext} from "../contexts/Global.js";

export default class ShareInSocialMedia extends React.Component {
    static contextType = GlobalContext

    render() {
        const {t, theme} = this.context;

        return <InfoBlock>
            <div className={css['theme--' + theme]}>
                <h3 style={{marginBottom: 12}}>{t('shareInSocial')}</h3>
                <div className={cnb(css.socialBlock)}>
                    <div>
                        <img src={"/icons/vk_" + theme + ".svg"} alt={t('vk')}/>
                    </div>
                    <div>
                        <img src={"/icons/fb_" + theme + ".svg"} alt={t('fb')}/>
                    </div>
                    <div>
                        <img src={"/icons/ok_" + theme + ".svg"} alt={t('ok')}/>
                    </div>
                    <div>
                        <img src={"/icons/vi_" + theme + ".svg"} alt={t('vi')}/>
                    </div>
                    <div>
                        <img src={"/icons/wa_" + theme + ".svg"} alt={t('wa')}/>
                    </div>
                    <div>
                        <img src={"/icons/tg_" + theme + ".svg"} alt={t('tg')}/>
                    </div>
                </div>
            </div>
        </InfoBlock>
    }
}
