import React from "react";
import {cnb} from "cnbuilder";
import css from "../styles/about-us.module.scss";
import InfoBlock from "./kit/InfoBlock.jsx";
import {GlobalContext} from "../contexts/Global.js";
import Icon from "./kit/Icon.jsx";

export default class ShareInSocialMedia extends React.Component {
    static contextType = GlobalContext

    render() {
        const {t, theme} = this.context;

        return <InfoBlock>
            <div className={css['theme--' + theme]}>
                <h3 style={{marginBottom: 12}}>{t('shareInSocial')}</h3>
                <div className={cnb(css.socialBlock)}>
                    <div>
                        {/*<img src={"/icons/vk_" + theme + ".svg"} alt={t('vk')}/>*/}
                        <div className={css.img}>
                            <Icon name={'vk_' + theme} />
                        </div>
                    </div>
                    <div>
                        {/*<img src={"/icons/fb_" + theme + ".svg"} alt={t('fb')}/>*/}
                        <div className={css.img}>
                            <Icon name={'fb_' + theme} />
                        </div>
                    </div>
                    <div>
                        {/*<img src={"/icons/ok_" + theme + ".svg"} alt={t('ok')}/>*/}
                        <div className={css.img}>
                            <Icon name={'ok_' + theme} />
                        </div>
                    </div>
                    <div>
                        {/*<img src={"/icons/vi_" + theme + ".svg"} alt={t('vi')}/>*/}
                        <div className={css.img}>
                            <Icon name={'vi_' + theme} />
                        </div>
                    </div>
                    <div>
                        {/*<img src={"/icons/wa_" + theme + ".svg"} alt={t('wa')}/>*/}
                        <div className={css.img}>
                            <Icon name={'wa_' + theme} />
                        </div>
                    </div>
                    <div>
                        {/*<img src={"/icons/tg_" + theme + ".svg"} alt={t('tg')}/>*/}
                        <div className={css.img}>
                            <Icon name={'tg_' + theme} />
                        </div>
                    </div>
                </div>
            </div>
        </InfoBlock>
    }
}
