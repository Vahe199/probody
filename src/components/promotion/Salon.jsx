import React from "react";
import {GlobalContext} from "../../contexts/Global.js";
import css from '../../styles/pages/personal.promotion.module.scss'
import Icon from "../kit/Icon.jsx";

export default class Salon extends React.Component {
    static contextType = GlobalContext

    constructor(props) {
        super(props);

        this.state = {}
    }

    render() {
        const {t, theme} = this.context

        return <div className={css['theme--' + theme]}>
            {/*<Modal open={this.state.deleteDialogOpen} isMobile={false} desktopWidth={375}*/}
            {/*       onUpdate={this.closeDeleteDialog}>*/}
            {/*    <div>*/}
            {/*        <div className={css.modalBody}>*/}
            {/*            <h1>{t('doYouWantToDeleteThisVacancy')}</h1>*/}

            {/*            <p style={{paddingTop: 16}}>{t('itCannotBeUndone')}</p>*/}

            {/*            <Button size={'fill'} onClick={async () => {*/}
            {/*                await APIRequests.deleteVacancy(this.state.deletingVacancy)*/}
            {/*                this.getMyVacancies()*/}
            {/*                this.closeDeleteDialog()*/}
            {/*            }}>{t('delete')}</Button>*/}

            {/*            <Icon name={'close'} className={css.modalClose} onClick={this.closeDeleteDialog}/>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</Modal>*/}
            <div className="flex justify-between responsive-content">
                <h1 className={'bigger inline-flex items-center lineheight-1'}>{t('salonArticle')}</h1>

                <p className={css.editSalonLink}>
                    {t('editSalon')}

                    <Icon name={'edit'}/>
                </p>
            </div>
        </div>
    }
}
