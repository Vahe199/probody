import React from "react";
import {GlobalContext} from "../contexts/Global.js"
import css from '../styles/footer.module.scss'
import {cnb} from "cnbuilder"
import Link from "next/link.js";

export default class Footer extends React.Component {
    static contextType = GlobalContext

    render() {
        const {t, theme} = this.context;

        return <div className={css['theme--' + theme]}>
            <footer className={cnb('container', 'non-selectable', css.footer)}>
                <img alt={t('siteLogo')} className={cnb('cursor-pointer', css.textLogo)} src={'/text_logo--' + theme + '.svg'}/>
                <div bp={'grid'}>
                    <div bp={'8@md 12@sm'}>
                        <div bp={'grid 4@md 6'}>
                            <div><Link href={'/'}>{t('cities')}</Link></div>
                            <div><Link href={'/'}>{t('contacts')}</Link></div>
                            <div><Link href={'/'}>{t('aboutProject')}</Link></div>
                            <div><Link href={'/'}>{t('visitors')}</Link></div>
                            <div><Link href={'/'}>{t('salonAds')}</Link></div>
                            <div><Link href={'/'}>{t('salonVacancies')}</Link></div>
                            <div><Link href={'/'}>{t('records')}</Link></div>
                            <div><Link href={'/salon/new'}>{t('addSalon')}</Link></div>
                        </div>

                        <div bp={'hide@md'} style={{marginTop: 24}}>
                            <Link href={'/'}><span className={cnb(css.caption, 'cursor-pointer')}>{t('privacyPolicy')}</span></Link>
                        </div>
                    </div>
                    <div bp={'hide@md 12@sm'}>
                        <div className={css.splitter}/>
                    </div>
                    <div bp={'4@md 12@sm first@md'}>
                        <ul>
                            <li>
                                <div className="flex vertical-center">
                                    <div style={{marginRight: 8}}>
                                        {theme === 'light' ? <svg width="30" height="30" viewBox="0 0 30 30" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M0 8C0 3.58172 3.58172 0 8 0H22C26.4183 0 30 3.58172 30 8V22C30 26.4183 26.4183 30 22 30H8C3.58172 30 0 26.4183 0 22V8Z"
                                                fill="#252420"/>
                                            <path
                                                d="M7.27441 18.5397H9.67441V12.1797L7.27441 13.8897V11.6997L9.80941 9.89973H11.9244V18.5397H13.8744V20.3997H7.27441V18.5397Z"
                                                fill="white"/>
                                            <path
                                                d="M18.8977 20.5797C18.2677 20.5797 17.6977 20.5097 17.1877 20.3697C16.6877 20.2197 16.2627 20.0147 15.9127 19.7547C15.5727 19.4847 15.3077 19.1647 15.1177 18.7947C14.9377 18.4147 14.8477 17.9947 14.8477 17.5347C14.8477 16.9447 15.0277 16.4197 15.3877 15.9597C15.7477 15.4897 16.2827 15.1597 16.9927 14.9697C16.4627 14.7997 16.0227 14.5047 15.6727 14.0847C15.3227 13.6647 15.1477 13.1647 15.1477 12.5847C15.1477 12.1647 15.2277 11.7797 15.3877 11.4297C15.5577 11.0797 15.8027 10.7797 16.1227 10.5297C16.4427 10.2697 16.8327 10.0697 17.2927 9.92973C17.7627 9.78973 18.2977 9.71973 18.8977 9.71973C19.4977 9.71973 20.0277 9.78973 20.4877 9.92973C20.9577 10.0697 21.3527 10.2697 21.6727 10.5297C22.0027 10.7797 22.2477 11.0797 22.4077 11.4297C22.5777 11.7797 22.6627 12.1647 22.6627 12.5847C22.6627 13.1647 22.4877 13.6597 22.1377 14.0697C21.7877 14.4697 21.3427 14.7697 20.8027 14.9697C22.2327 15.4097 22.9477 16.2647 22.9477 17.5347C22.9477 17.9947 22.8527 18.4147 22.6627 18.7947C22.4827 19.1647 22.2177 19.4847 21.8677 19.7547C21.5277 20.0147 21.1077 20.2197 20.6077 20.3697C20.1077 20.5097 19.5377 20.5797 18.8977 20.5797ZM18.8977 18.6897C19.5177 18.6897 19.9727 18.5697 20.2627 18.3297C20.5527 18.0897 20.6977 17.7647 20.6977 17.3547C20.6977 16.9047 20.5277 16.5497 20.1877 16.2897C19.8577 16.0197 19.4277 15.8447 18.8977 15.7647C18.3677 15.8447 17.9327 16.0197 17.5927 16.2897C17.2627 16.5497 17.0977 16.9047 17.0977 17.3547C17.0977 17.7647 17.2477 18.0897 17.5477 18.3297C17.8477 18.5697 18.2977 18.6897 18.8977 18.6897ZM18.8977 14.2347C19.3477 14.1547 19.7127 13.9997 19.9927 13.7697C20.2727 13.5297 20.4127 13.1997 20.4127 12.7797C20.4127 12.3897 20.2777 12.0997 20.0077 11.9097C19.7477 11.7097 19.3777 11.6097 18.8977 11.6097C18.4277 11.6097 18.0577 11.7097 17.7877 11.9097C17.5277 12.0997 17.3977 12.3897 17.3977 12.7797C17.3977 13.1997 17.5327 13.5297 17.8027 13.7697C18.0827 13.9997 18.4477 14.1547 18.8977 14.2347Z"
                                                fill="white"/>
                                        </svg> :
                                            <svg width="30" height="30" viewBox="0 0 30 30" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M0 8C0 3.58172 3.58172 0 8 0H22C26.4183 0 30 3.58172 30 8V22C30 26.4183 26.4183 30 22 30H8C3.58172 30 0 26.4183 0 22V8Z"
                                                    fill="#f7f7f7"/>
                                                <path
                                                    d="M7.27441 18.5397H9.67441V12.1797L7.27441 13.8897V11.6997L9.80941 9.89973H11.9244V18.5397H13.8744V20.3997H7.27441V18.5397Z"
                                                    fill="#252420"/>
                                                <path
                                                    d="M18.8977 20.5797C18.2677 20.5797 17.6977 20.5097 17.1877 20.3697C16.6877 20.2197 16.2627 20.0147 15.9127 19.7547C15.5727 19.4847 15.3077 19.1647 15.1177 18.7947C14.9377 18.4147 14.8477 17.9947 14.8477 17.5347C14.8477 16.9447 15.0277 16.4197 15.3877 15.9597C15.7477 15.4897 16.2827 15.1597 16.9927 14.9697C16.4627 14.7997 16.0227 14.5047 15.6727 14.0847C15.3227 13.6647 15.1477 13.1647 15.1477 12.5847C15.1477 12.1647 15.2277 11.7797 15.3877 11.4297C15.5577 11.0797 15.8027 10.7797 16.1227 10.5297C16.4427 10.2697 16.8327 10.0697 17.2927 9.92973C17.7627 9.78973 18.2977 9.71973 18.8977 9.71973C19.4977 9.71973 20.0277 9.78973 20.4877 9.92973C20.9577 10.0697 21.3527 10.2697 21.6727 10.5297C22.0027 10.7797 22.2477 11.0797 22.4077 11.4297C22.5777 11.7797 22.6627 12.1647 22.6627 12.5847C22.6627 13.1647 22.4877 13.6597 22.1377 14.0697C21.7877 14.4697 21.3427 14.7697 20.8027 14.9697C22.2327 15.4097 22.9477 16.2647 22.9477 17.5347C22.9477 17.9947 22.8527 18.4147 22.6627 18.7947C22.4827 19.1647 22.2177 19.4847 21.8677 19.7547C21.5277 20.0147 21.1077 20.2197 20.6077 20.3697C20.1077 20.5097 19.5377 20.5797 18.8977 20.5797ZM18.8977 18.6897C19.5177 18.6897 19.9727 18.5697 20.2627 18.3297C20.5527 18.0897 20.6977 17.7647 20.6977 17.3547C20.6977 16.9047 20.5277 16.5497 20.1877 16.2897C19.8577 16.0197 19.4277 15.8447 18.8977 15.7647C18.3677 15.8447 17.9327 16.0197 17.5927 16.2897C17.2627 16.5497 17.0977 16.9047 17.0977 17.3547C17.0977 17.7647 17.2477 18.0897 17.5477 18.3297C17.8477 18.5697 18.2977 18.6897 18.8977 18.6897ZM18.8977 14.2347C19.3477 14.1547 19.7127 13.9997 19.9927 13.7697C20.2727 13.5297 20.4127 13.1997 20.4127 12.7797C20.4127 12.3897 20.2777 12.0997 20.0077 11.9097C19.7477 11.7097 19.3777 11.6097 18.8977 11.6097C18.4277 11.6097 18.0577 11.7097 17.7877 11.9097C17.5277 12.0997 17.3977 12.3897 17.3977 12.7797C17.3977 13.1997 17.5327 13.5297 17.8027 13.7697C18.0827 13.9997 18.4477 14.1547 18.8977 14.2347Z"
                                                    fill="#252420"/>
                                            </svg>}
                                    </div>
                                    <span>{t('onlyMature')}</span>
                                </div>
                            </li>
                            <li>
                                <div className="flex vertical-center">
                                    <div style={{marginRight: 8}}>
                                        {theme === 'light' ? <svg width="30" height="31" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M0 8.03809C0 3.61981 3.58172 0.0380859 8 0.0380859H22C26.4183 0.0380859 30 3.61981 30 8.03809V22.0381C30 26.4564 26.4183 30.0381 22 30.0381H8C3.58172 30.0381 0 26.4564 0 22.0381V8.03809Z" fill="#252420"/>
                                            <g clipPath="url(#clip0_986_24845)">
                                                <path d="M13.8479 20.0418H12.5718V18.8363C15.1022 18.3797 17.0183 16.1665 17.0183 13.5128C17.0183 12.7953 16.8812 12.1105 16.6255 11.4837C16.3467 11.3787 16.0496 11.3225 15.7428 11.3225C15.2559 11.3225 14.7925 11.4607 14.3927 11.7177C14.7282 12.2356 14.9232 12.8515 14.9232 13.5128C14.9232 15.3389 13.4395 16.8238 11.6134 16.8238C9.78849 16.8238 8.30422 15.3389 8.30422 13.5128C8.30422 12.1232 9.16507 10.9325 10.3804 10.4422C10.6281 10.0539 10.9201 9.68914 11.2538 9.35592C11.7092 8.90112 12.2231 8.52374 12.78 8.23181C12.4049 8.14923 12.0149 8.10449 11.6157 8.10449C8.63399 8.10449 6.19824 10.5316 6.19824 13.5134C6.19824 16.108 8.0381 18.2794 10.4635 18.8013V20.0424H9.27462C8.69479 20.0424 8.2245 20.5178 8.2245 21.0965C8.2245 21.6769 8.69479 22.1518 9.27462 22.1518H10.4635V22.9903C10.4635 23.569 10.9384 24.0387 11.5177 24.0387C12.0975 24.0387 12.5718 23.569 12.5718 22.9903V22.1518H13.8479C14.4277 22.1518 14.8969 21.6769 14.8969 21.0965C14.8969 20.5172 14.4271 20.0418 13.8479 20.0418Z" fill="white"/>
                                                <path d="M22.7067 6.03819C22.6585 6.03589 19.3533 6.07374 19.3533 6.07374C18.766 6.08063 18.2935 6.65644 18.3015 7.24602C18.3089 7.82987 18.785 8.39078 19.3665 8.39078C19.37 8.39078 19.3757 8.39078 19.3803 8.39078L19.9957 8.28926L18.8744 9.36576C17.9602 8.7303 16.8791 8.36038 15.7436 8.36038C14.2759 8.36038 12.896 8.92071 11.858 9.95821C10.1993 11.6163 9.82539 14.0744 10.7327 16.0961C10.7912 16.1156 10.8503 16.1339 10.9105 16.1505C11.1107 16.205 11.3171 16.2343 11.523 16.2412C11.5528 16.2423 11.5832 16.2429 11.6136 16.2429C12.1195 16.2429 12.6127 16.1024 13.0429 15.8362C12.0661 14.5206 12.1728 12.6486 13.3663 11.4545C14.0006 10.8196 14.8454 10.4692 15.7441 10.4692C16.6429 10.4692 17.4871 10.8191 18.122 11.4545C19.4348 12.7668 19.4348 14.9014 18.122 16.2125C17.6379 16.6977 17.0311 17.016 16.3704 17.1393C16.3251 17.1989 16.2787 17.2586 16.2316 17.3165C15.6134 18.0678 14.8236 18.6557 13.9353 19.0308C14.5094 19.2298 15.1184 19.3336 15.7436 19.3336C17.2118 19.3336 18.5917 18.7595 19.6303 17.7214C21.4931 15.858 21.8 12.979 20.4247 10.85L21.6916 9.65023V10.3952C21.6916 10.9837 22.1573 11.4614 22.7457 11.4614C23.3347 11.4614 23.801 10.9837 23.801 10.3952V7.09576C23.8016 6.81072 23.7534 6.10299 22.7067 6.03819Z" fill="white"/>
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_986_24845">
                                                    <rect width="18" height="18" fill="white" transform="translate(6 6.03809)"/>
                                                </clipPath>
                                            </defs>
                                        </svg> :
                                            <svg width="30" height="31" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M0 8.03809C0 3.61981 3.58172 0.0380859 8 0.0380859H22C26.4183 0.0380859 30 3.61981 30 8.03809V22.0381C30 26.4564 26.4183 30.0381 22 30.0381H8C3.58172 30.0381 0 26.4564 0 22.0381V8.03809Z" fill="#f7f7f7"/>
                                                <g clipPath="url(#clip0_986_24845)">
                                                    <path d="M13.8479 20.0418H12.5718V18.8363C15.1022 18.3797 17.0183 16.1665 17.0183 13.5128C17.0183 12.7953 16.8812 12.1105 16.6255 11.4837C16.3467 11.3787 16.0496 11.3225 15.7428 11.3225C15.2559 11.3225 14.7925 11.4607 14.3927 11.7177C14.7282 12.2356 14.9232 12.8515 14.9232 13.5128C14.9232 15.3389 13.4395 16.8238 11.6134 16.8238C9.78849 16.8238 8.30422 15.3389 8.30422 13.5128C8.30422 12.1232 9.16507 10.9325 10.3804 10.4422C10.6281 10.0539 10.9201 9.68914 11.2538 9.35592C11.7092 8.90112 12.2231 8.52374 12.78 8.23181C12.4049 8.14923 12.0149 8.10449 11.6157 8.10449C8.63399 8.10449 6.19824 10.5316 6.19824 13.5134C6.19824 16.108 8.0381 18.2794 10.4635 18.8013V20.0424H9.27462C8.69479 20.0424 8.2245 20.5178 8.2245 21.0965C8.2245 21.6769 8.69479 22.1518 9.27462 22.1518H10.4635V22.9903C10.4635 23.569 10.9384 24.0387 11.5177 24.0387C12.0975 24.0387 12.5718 23.569 12.5718 22.9903V22.1518H13.8479C14.4277 22.1518 14.8969 21.6769 14.8969 21.0965C14.8969 20.5172 14.4271 20.0418 13.8479 20.0418Z" fill="#252420"/>
                                                    <path d="M22.7067 6.03819C22.6585 6.03589 19.3533 6.07374 19.3533 6.07374C18.766 6.08063 18.2935 6.65644 18.3015 7.24602C18.3089 7.82987 18.785 8.39078 19.3665 8.39078C19.37 8.39078 19.3757 8.39078 19.3803 8.39078L19.9957 8.28926L18.8744 9.36576C17.9602 8.7303 16.8791 8.36038 15.7436 8.36038C14.2759 8.36038 12.896 8.92071 11.858 9.95821C10.1993 11.6163 9.82539 14.0744 10.7327 16.0961C10.7912 16.1156 10.8503 16.1339 10.9105 16.1505C11.1107 16.205 11.3171 16.2343 11.523 16.2412C11.5528 16.2423 11.5832 16.2429 11.6136 16.2429C12.1195 16.2429 12.6127 16.1024 13.0429 15.8362C12.0661 14.5206 12.1728 12.6486 13.3663 11.4545C14.0006 10.8196 14.8454 10.4692 15.7441 10.4692C16.6429 10.4692 17.4871 10.8191 18.122 11.4545C19.4348 12.7668 19.4348 14.9014 18.122 16.2125C17.6379 16.6977 17.0311 17.016 16.3704 17.1393C16.3251 17.1989 16.2787 17.2586 16.2316 17.3165C15.6134 18.0678 14.8236 18.6557 13.9353 19.0308C14.5094 19.2298 15.1184 19.3336 15.7436 19.3336C17.2118 19.3336 18.5917 18.7595 19.6303 17.7214C21.4931 15.858 21.8 12.979 20.4247 10.85L21.6916 9.65023V10.3952C21.6916 10.9837 22.1573 11.4614 22.7457 11.4614C23.3347 11.4614 23.801 10.9837 23.801 10.3952V7.09576C23.8016 6.81072 23.7534 6.10299 22.7067 6.03819Z" fill="#252420"/>
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_986_24845">
                                                        <rect width="18" height="18" fill="#252420" transform="translate(6 6.03809)"/>
                                                    </clipPath>
                                                </defs>
                                            </svg>}
                                    </div>
                                    <span>{t('noIntim')}</span>
                                </div>
                            </li>
                            <li>
                                <div className="flex vertical-center">
                                    <div style={{marginRight: 8}}>
                                        {theme === 'light' ? <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M0 8C0 3.58172 3.58172 0 8 0H22C26.4183 0 30 3.58172 30 8V22C30 26.4183 26.4183 30 22 30H8C3.58172 30 0 26.4183 0 22V8Z" fill="#252420"/>
                                            <g clipPath="url(#clip0_297_6271)">
                                                <path d="M11.9532 23.7237C12.2112 23.7237 12.4753 23.7222 12.7452 23.7222H17.854C18.1235 23.7222 18.3877 23.7237 18.6457 23.7237C21.0095 23.7237 22.8158 23.6028 22.8158 21.1316C22.8158 18.5451 20.8377 16.4217 18.3114 16.1909C18.2913 17.0958 15.3004 19.3289 15.3004 19.3289C15.3004 19.3289 12.3088 17.096 12.2885 16.1911C9.76266 16.4217 7.78418 18.5451 7.78418 21.1316C7.78418 23.6028 9.58968 23.7237 11.9532 23.7237ZM17.5319 20.3491C17.5319 20.2755 17.5983 20.2161 17.6809 20.2161H18.4889V19.4085C18.4889 19.3267 18.5478 19.2595 18.6215 19.2595H19.4189C19.4921 19.2595 19.5515 19.3261 19.5515 19.4085V20.2163H20.3591C20.4409 20.2163 20.5079 20.2757 20.5079 20.3493V21.1463C20.5079 21.22 20.4415 21.2793 20.3591 21.2793H19.5513V22.0869C19.5513 22.1691 19.4918 22.2357 19.4183 22.2357H18.6213C18.5476 22.2357 18.4883 22.1693 18.4883 22.0869V21.2791H17.6807C17.5985 21.2791 17.5317 21.2198 17.5317 21.1461L17.5319 20.3491Z" fill="white"/>
                                                <path d="M15.3012 16.8404C17.5861 16.8404 19.4381 13.4048 19.4381 11.1202C19.4381 8.83589 17.5861 6.98389 15.3012 6.98389C13.0168 6.98389 11.1648 8.83589 11.1648 11.1202C11.1648 13.4048 13.0168 16.8404 15.3012 16.8404Z" fill="white"/>
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_297_6271">
                                                    <rect width="18.6" height="18.6" fill="white" transform="translate(6 6.05371)"/>
                                                </clipPath>
                                            </defs>
                                        </svg> :
                                            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M0 8C0 3.58172 3.58172 0 8 0H22C26.4183 0 30 3.58172 30 8V22C30 26.4183 26.4183 30 22 30H8C3.58172 30 0 26.4183 0 22V8Z" fill="#f7f7f7"/>
                                                <g clipPath="url(#clip0_297_6271)">
                                                    <path d="M11.9532 23.7237C12.2112 23.7237 12.4753 23.7222 12.7452 23.7222H17.854C18.1235 23.7222 18.3877 23.7237 18.6457 23.7237C21.0095 23.7237 22.8158 23.6028 22.8158 21.1316C22.8158 18.5451 20.8377 16.4217 18.3114 16.1909C18.2913 17.0958 15.3004 19.3289 15.3004 19.3289C15.3004 19.3289 12.3088 17.096 12.2885 16.1911C9.76266 16.4217 7.78418 18.5451 7.78418 21.1316C7.78418 23.6028 9.58968 23.7237 11.9532 23.7237ZM17.5319 20.3491C17.5319 20.2755 17.5983 20.2161 17.6809 20.2161H18.4889V19.4085C18.4889 19.3267 18.5478 19.2595 18.6215 19.2595H19.4189C19.4921 19.2595 19.5515 19.3261 19.5515 19.4085V20.2163H20.3591C20.4409 20.2163 20.5079 20.2757 20.5079 20.3493V21.1463C20.5079 21.22 20.4415 21.2793 20.3591 21.2793H19.5513V22.0869C19.5513 22.1691 19.4918 22.2357 19.4183 22.2357H18.6213C18.5476 22.2357 18.4883 22.1693 18.4883 22.0869V21.2791H17.6807C17.5985 21.2791 17.5317 21.2198 17.5317 21.1461L17.5319 20.3491Z" fill="#252420"/>
                                                    <path d="M15.3012 16.8404C17.5861 16.8404 19.4381 13.4048 19.4381 11.1202C19.4381 8.83589 17.5861 6.98389 15.3012 6.98389C13.0168 6.98389 11.1648 8.83589 11.1648 11.1202C11.1648 13.4048 13.0168 16.8404 15.3012 16.8404Z" fill="#252420"/>
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_297_6271">
                                                        <rect width="18.6" height="18.6" fill="#252420" transform="translate(6 6.05371)"/>
                                                    </clipPath>
                                                </defs>
                                            </svg>}
                                    </div>
                                    <span>{t('contraindications')}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={css.splitter}/>
                <div style={{marginTop: 12}} bp={'grid'}>
                    <div bp={'hide@md 12'}>
                        <span className={css.caption}>{t('whatsapp')}</span>
                        <Link href={'tel:+77629878791'}><h1 className={'number-font cursor-pointer'}>+7 (762) 987-87-91</h1></Link>
                    </div>
                    <div bp={'4@md 12'}>
                        <span className={css.caption}>{t('mail')}</span>
                        <Link href={'mailto:mail@gmail.com'}><h1 className={'cursor-pointer'} style={{marginBottom: 12}}>mail@gmail.com</h1></Link>
                        <span className={css.caption}>{t('allRightsReserved')}</span>
                    </div>
                    <div bp={'8@md hide show@md'} style={{marginTop: 12}}>
                        <Link href={'/'}><span className={cnb(css.caption, 'cursor-pointer')}>{t('privacyPolicy')}</span></Link>
                    </div>
                </div>
            </footer>
        </div>
    }
}
